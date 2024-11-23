import React from "react";
import { useNavigate } from "react-router-dom";


const Signup: React.FC = () => {
    const navigate = useNavigate();
    


    return (
        <div className="min-h-screen bg-gray-300 place-content-center pb-10">
            <div className="max-w-xl max-h-xl  mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
                <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
                <p className="text-sm text-center text-gray-600 mb-4">
                        Choose your account type to get started
                </p>


                
                <div className="grid grid-col items-center space-y-5 ">
                    <button
                        onClick={() => navigate("/Customer-Signup")}
                        className=" px-32 py-12 mb - 12 border rounded-full bg-outline  text-black-200  hover:bg-blue-600 hover:text-white"
                    >
                        Signup as Customer
                    </button>
                    <button
                        onClick={() => navigate("/Business-Signup")}
                        className="w-full px-32 py-12  border rounded-full bg-outline  text-black-200 hover:bg-green-600 hover:text-white"
                    >
                        Signup as Business Owner
                    </button>
                    <p className=" text-center text-base/6 font-bold text-gray-600 ">Already have an account? <a href="/login" className="text-blue-800  hover:underline" >Login</a> </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
