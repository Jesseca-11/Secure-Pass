import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // Used for redirection

const CreatePassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const { state } = useLocation();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/set-password", {
        email:String(state.email),
        password: password,
        confirmPassword: confirmPassword,
        verificationToken:String(state.verificationToken),
      });

      if (response.status === 201) {
        console.log("password1", response)
        alert("Password created successfully!");
        navigate("/login"); 
      } else {
        console.log("password2", response)
        setError("Failed to create password. Please try again.");
      }
    } catch (error) {
      console.error("my error", error);
      setError("There was an error setting your password. Please try again later.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white shadow-md py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="mt-1 block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Create Password
        </button>
      </form>
    </div>
  );
};

export default CreatePassword;
