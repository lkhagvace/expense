import React from "react";
import { Cash } from "@/svgs/Cash";

export const Secondstep = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 mx-auto my-auto">
      <div className="bg-blue-600 w-12 flex justify-center items-center h-12 rounded-[50%]">
        <Cash />
      </div>
      <p className="text-3xl font-bold">Set up your cash Balance</p>
      <input
        type="number"
        placeholder="100,000"
        className="w-[500px] h-16 bg-gray-200 text-lg font-semibold rounded-xl px-4"
      />
      <p className="text-gray-500 mx-auto">
        How much cash do you have in your wallet?
      </p>
      <button className="bg-blue-600 text-white w-72 h-12 rounded-2xl text-xl mx-auto">
        Confirm
      </button>
    </div>
  );
};
