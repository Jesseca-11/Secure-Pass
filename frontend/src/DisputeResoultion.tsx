import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContex";

const DisputeResolution: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    transactionDetails: "",
    transactionId: "",
    additionalNotes: "",
    productImage: null as File | null,
  });

  const navigate = useNavigate();
  const { token } = useAuth()


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };
  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, productImage: e.target.files[0] });
    } 

  };

  const clearForm = () => {
    setFormData({
      title: "",
      transactionDetails: "",
      transactionId: "",
      additionalNotes: "",
      productImage: null,
    });
  };

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Dispute Data:", formData);

    try {
      const response = await axios.post(
        "http://localhost:4000/dispute",
        JSON.stringify({
          title: formData.title,
          transactionDetails: formData.transactionDetails,
          additionalNotes: formData.additionalNotes,
          productImage: formData.productImage,
        }),
        {
          headers: { "Content-Type": "application/json ",  Authorization: `Bearer ${token}`, },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      console.log("response3", response)
      navigate("/dispute-success" );
      clearForm();
    } catch (error) {
      console.error("Error during signup:", error);
    
    }

    // @ts-ignore
    
    clearForm();
  };
  

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Dispute Resolution</h1>

      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border outline-none rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter dispute title"
            required
          />
        </div>

    
        <div className="mb-4">
          <label htmlFor="transactionDetails" className="block text-sm font-medium text-gray-700">
            Transaction Details
          </label>
          <textarea
            id="transactionDetails"
            name="transactionDetails"
            value={formData.transactionDetails}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border outline-none rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Provide details about the transaction"
            rows={4}
            required
          ></textarea>
        </div>

        
        <div className="mb-4">
          <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">
            Transaction ID
          </label>
          <input
            type="text"
            id="transactionId"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border outline-none rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter transaction ID"
            required
          />
        </div>

        
        <div className="mb-4">
          <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700">
            Additional Notes
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border outline-none rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Provide any additional information"
            rows={3}
          ></textarea>
        </div>

        
        <div className="mb-6">
          <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            id="productImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full text-sm text-gray-600"
          />
        </div>

        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Submit Dispute
        </button>
      </form>
    </div>
  );
};

export default DisputeResolution;
