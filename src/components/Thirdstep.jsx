import React from "react";
import { Done } from "@/svgs/Done";
import Link from "next/link";

export const Thirdstep = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 mx-auto my-auto">
      <div className="bg-[#114B5F] w-12 flex justify-center items-center h-12 rounded-[50%]">
        <Done />
      </div>
      <p className="text-3xl font-bold">Good Job!</p>
      <p className="text-gray-500 mx-auto">
        Your very first account has been created. Now continue to dashboard and
        start tracking
      </p>
      <Link
        href={"/"}
        className="bg-[#114B5F] text-white w-72 h-12 rounded-2xl text-xl mx-auto flex flex-col justify-center items-center"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};
