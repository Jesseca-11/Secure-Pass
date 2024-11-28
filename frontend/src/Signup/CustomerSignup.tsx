import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerSignup: React.FC = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();
  

  const userInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const clearForm = () => {
    setUserData({
    name: "",
    email: "",
    phone: "",
    });
  };


  const userSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("customer Signup Data:", userData);

    try {
      
        const response = await axios.post("http://localhost:4000/register-single", JSON.stringify({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            }),
            {
              headers: {"Content-Type": "application/json "},
              withCredentials: true
            }
          );
          console.log(JSON.stringify(response?.data))
          navigate("/optverification", { state: {email: userData.email} } );
          localStorage.setItem("email",  userData.email)
          clearForm();
  } catch (error) {
    console.error("Error during signup:", error);
    alert("Signup failed. Please try again.");
  }

}; 


  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Customer Signup</h1>
      <form onSubmit={userSubmit}>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={userData.name}
            onChange={userInputChange}
            className="w-full px-4 py-4 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={userInputChange}
            className="w-full px-4 py-4 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={userData.phone}
            onChange={userInputChange}
            className="w-full px-4 py-4 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-5 rounded-md hover:bg-blue-600"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default CustomerSignup;
