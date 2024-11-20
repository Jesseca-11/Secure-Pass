import React, { useState } from "react";

const BusinessSignup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    domainName: "",
    businessName: "",
    businessAddress: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Business Signup Data:", formData);
    alert("Business Signup Successful!");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white shadow-md py-8 ">
      <h1 className="text-2xl font-bold mb-6 text-center">Business Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
            className="mt-1 block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="businessName" className="block text-sm font-medium">
            Business Name
          </label>
          <input
            type="text"
            name="businessName"
            id="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
            className="mt-1 block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="businessAddress" className="block text-sm font-medium">
            Business Address
          </label>
          <input
            type="text"
            name="businessAddress"
            id="businessAddress"
            value={formData.businessAddress}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
