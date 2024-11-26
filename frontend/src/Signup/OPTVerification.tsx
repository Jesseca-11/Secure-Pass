import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string>("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const { state } = useLocation();

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    console.log("data", {
      email: String(state.email),
      otp: otp,
    });
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
        console.log("response1", response);
        setIsVerified(true);
        navigate("/create-password", { state: {email: state.email, verificationToken: response.data.data} } );
      } else {
        console.log("response2", response);
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("There was an error verifying the OTP. Please try again later.");
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
    </div>
  );
};

export default OTPVerification;
