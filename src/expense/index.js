import React from "react";

const login = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex flex-col my-auto gap-8">
        <div className="flex flex-col w-full h-full m-auto py-auto gap-8">
          <div className="flex justify-center items-center gap-6">
            <img src="./mylogo.png" className="w-16 h-16" />
            <p className="font-bold text-2xl">AceArea</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">Welcome Back</p>
            <p className="text-gray-600">
              Welcome back, Please enter your details
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <input
              className="bg-gray-100 border-solid border-2 border-gray-300 w-72 h-12 rounded-xl pl-4"
              placeholder="Email"
              type="text"
            />
            <input
              className="bg-gray-100 border-solid border-2 border-gray-300 w-72 h-12 rounded-xl pl-4"
              placeholder="Password"
              type="text"
            />
          </div>
          <button className="bg-blue-600 text-white w-72 h-12 rounded-2xl text-xl mx-auto">
            Log In
          </button>
          <div className="flex gap-4 justify-center">
            <p className="text-gray-600">Don't have an account?</p>
            <button className="text-blue-500">Sign Up</button>
          </div>
        </div>
      </div>
      <div className="bg-blue-600 w-1/2"></div>
    </div>
  );
};

export default login;
