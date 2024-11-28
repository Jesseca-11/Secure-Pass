import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string>("");
  const [isVerified, setIsVerified] = useState(false);
  const [resendStatus, setResendStatus] = useState<string>("");
  const [cooldown, setCooldown] = useState<number>(0);
  const navigate = useNavigate();

  const { state } = useLocation();
  const email = state?.email || localStorage.getItem("email");
  
  useEffect(() => {
    if (!email) {
      setError("Email is missing. Please start the signup process again.");
      navigate("/signup"); 
    }
  }, [email, navigate]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/verify-otp",
        JSON.stringify({
          email: String(state.email),
          otp: otp,
        }),
        {
          headers: { "Content-Type": "application/json " },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsVerified(true);
        navigate("/create-password", {
          state: { email: state.email, verificationToken: response.data.data },
        });
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("There was an error verifying the OTP. Please try again later.");
      console.error(error);
    }
  };

  const handleResendOtp = async () => {
    if (cooldown > 0) return;

    if (!email) {
      setError("Email is missing. Please start the signup process again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/resend-otp",
        JSON.stringify({
          email: String({email}),
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setResendStatus("OTP has been resent successfully.");
      setCooldown(30);
    } catch (error) {
      console.log("email", state.email);
      setResendStatus(
        "There was an error resending the OTP. Please try again later."
      );
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white shadow-md py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Verify OTP</h1>
      <form onSubmit={handleOtpSubmit}>
        <div className="mb-4">
          <label htmlFor="otp" className="block text-sm font-medium">
            Enter OTP
          </label>
          <input
            type="text"
            name="otp"
            id="otp"
            value={otp}
            onChange={handleOtpChange}
            className="mt-1 block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Verify OTP
        </button>
      </form>
      <div className="mt-6 text-center">
        
          <button
            onClick={handleResendOtp}
            className={`w-full py-2 rounded-md ${
              cooldown > 0 ? "bg-gray-300 cursor-not-allowed" : " text-gray-500  hover:text-blue-400"
            }`}
            disabled={cooldown > 0}
          >
            {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
          </button>
      
        {resendStatus && (
          <p className="mt-2 text-sm text-gray-600">{resendStatus}</p>
        )}
      </div>
    </div>
  );
};

export default OTPVerification;
