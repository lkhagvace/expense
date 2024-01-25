import React from "react";
import { Done } from "@/svgs/Done";

export const Thirdstep = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 mx-auto my-auto">
      <div className="bg-blue-600 w-12 flex justify-center items-center h-12 rounded-[50%]">
        <Done />
      </div>
      <p className="text-3xl font-bold">Good Job!</p>
      <p className="text-gray-500 mx-auto">
        Your very first account has been created. Now continue to dashboard and
        start tracking
      </p>
      <button className="bg-blue-600 text-white w-72 h-12 rounded-2xl text-xl mx-auto">
        Go to Dashboard
      </button>
    </div>
  );
};
