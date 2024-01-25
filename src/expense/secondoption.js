import React from "react";
import { Cash } from "@/svgs/Cash";

const secondoption = () => {
  return (
    <div className="w-full flex flex-col my-auto gap-8 min-h-screen">
      <div className="flex flex-col items-center gap-16 mt-24">
        <div className="flex justify-center items-center gap-6">
          <img src="./mylogo.png" className="w-16 h-16" />
          <p className="font-bold text-2xl">AceArea</p>
        </div>
        <div className="flex justify-center">
          <div className="text-white rounded-[50%] w-8 h-8 bg-blue-600 flex justify-center items-center">
            1
          </div>
          <div className="w-24 h-1 bg-blue-600 my-auto"></div>
          <div className="text-white rounded-[50%] w-8 h-8 bg-blue-600 flex justify-center items-center">
            2
          </div>
          <div className="w-24 h-1 bg-gray-300 my-auto"></div>
          <div className="text-white rounded-[50%] w-8 h-8 bg-gray-200 flex justify-center items-center">
            3
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-8 mx-auto my-auto">
        <div className="bg-blue-600 w-12 flex justify-center items-center h-12 rounded-[50%]">
          <Cash />
        </div>
        <p className="text-3xl font-bold">Set up your cash Balance</p>
        <input
          type="text"
          placeholder="Email"
          className="w-[500px] h-16 bg-gray-200 text-lg font-semibold rounded-xl px-4"
        />
        <p className="text-gray-500 mx-auto">
          How much cash do you have in your wallet?
        </p>
        <button className="bg-blue-600 text-white w-72 h-12 rounded-2xl text-xl mx-auto">
          Confirm
        </button>
      </div>
    </div>
  );
};
export default secondoption;
