import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContex";



const Login: React.FC = () => {
  const [formData, setFormData] = useState({ emailPhone: "", password: "" });
  const [error, setError] = useState("");
  const { setAuthData } = useAuth();
  const navigate = useNavigate();
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const clearForm = () => {
    setFormData({
      emailPhone: "",
      password: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.emailPhone || !formData.password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        JSON.stringify({
          password: formData.password,
          emailPhone: formData.emailPhone,
        }),
        {
          headers: { "Content-Type": "application/json " },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { token, email } = response.data;

        // Store token and email in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        
        setAuthData(token, email);
        navigate("/dashboard");
        clearForm();
      } else {
        setError("Invalid login credentials.");
      }
    } catch (error) {
      console.error("Error during logi:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <label
              htmlFor="emailPhone"
              className="block text-sm font-medium text-gray-700"
            >
              Email/Phone
            </label>
            <input
              type="email"
              id="emailPhone"
              name="emailPhone"
              value={formData.emailPhone}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-center text-base/6 font-bold text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
