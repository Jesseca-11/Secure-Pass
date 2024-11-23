import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const BusinessSignup: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    domainName: "",
    businessHandle: "",
  });
  // const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearForm = () => {
    setFormData({
    businessName: "",
    email: "",
    phone: "",
    domainName: "",
    businessHandle: "",
    });
  };

  


  const handleSubmit = async (e: React.FormEvent) => {
    // const apiUrl: string = process.env.REACT_APP_API_URL/auth
    e.preventDefault();
    
    console.log("Business Signup Data:", formData);
    try {
          const response = await axios.post("http://localhost:4000/register-business", JSON.stringify({
            
              businessName: formData.businessName,
              email: formData.email,
              phone: formData.phone,
              domainName: formData.domainName,
              businessHandle: formData.businessHandle,
              }),
              {
                headers: {"Content-Type": "application/json "},
                withCredentials: true
              }
            );
            console.log(JSON.stringify(response?.data))
            alert("Signup successful! You are now logged in.");
            navigate("/optverification");
            clearForm();
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }

    
  };

          
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white shadow-md py-8 ">
      <h1 className="text-2xl font-bold mb-6 text-center">Business Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Business Name
          </label>
          <input
            type="text"
            name="businessName"
            id="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-4 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-4 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone Number
          </label>
          <input
            type="phone"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-4 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="businessName" className="block text-sm font-medium">
            Domain Name (Optional)
          </label>
          <input
            type="text"
            name="domainName"
            id="domainName"
            value={formData.domainName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-4 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="businessHandle" className="block text-sm font-medium">
            Business Handle
          </label>
          <input
            type="text"
            name="businessHandle"
            id="businessHandle"
            value={formData.businessHandle}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-4 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <button
          type="submit"
          
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default BusinessSignup;
