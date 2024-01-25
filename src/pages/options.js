import React, { useState } from "react";
import Link from "next/link";
import { Firststep } from "@/components/Firststep";
import { Secondstep } from "@/components/Secondstep";
import { Thirdstep } from "@/components/Thirdstep";
const Option = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="w-full flex flex-col my-auto gap-8 min-h-screen">
      <div className="flex flex-col items-center gap-16 mt-24">
        <div className="flex justify-center items-center gap-6">
          <img src="./mylogo.png" className="w-16 h-16" />
          <p className="font-bold text-2xl">AceArea</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setStep(1)}
            className={`text-white rounded-[50%] w-8 h-8 bg-blue-600 flex justify-center items-center`}
          >
            1
          </button>
          <div
            className={`w-24 h-1 ${
              step === 2 || step === 3 ? "bg-blue-600" : "bg-gray-200"
            } my-auto`}
          ></div>
          <button
            onClick={() => setStep(2)}
            className={`text-white rounded-[50%] w-8 h-8 ${
              step === 2 || step === 3 ? "bg-blue-600" : "bg-gray-200"
            } flex justify-center items-center`}
          >
            2
          </button>
          <div
            className={`w-24 h-1 ${
              step === 3 ? "bg-blue-600" : "bg-gray-200"
            } my-auto`}
          ></div>
          <button
            onClick={() => setStep(3)}
            className={`text-white rounded-[50%] w-8 h-8 ${
              step === 3 ? "bg-blue-600" : "bg-gray-200"
            } flex justify-center items-center`}
          >
            3
          </button>
        </div>
      </div>
      {step === 1 && <Firststep />}
      {step === 2 && <Secondstep />}
      {step === 3 && <Thirdstep />}
    </div>
  );
};

export default Option;
