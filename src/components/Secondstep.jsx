import React from "react";
import { Cash } from "@/svgs/Cash";
import { useContext } from "react";
import { UserContext } from "@/context/User";

export const Secondstep = ({ setStep }) => {
  const { newUser, setNewUser } = useContext(UserContext);
  return (
    <div className="flex flex-col justify-center items-center gap-8 mx-auto my-auto">
      <div className="bg-[#114B5F] w-12 flex justify-center items-center h-12 rounded-[50%]">
        <Cash />
      </div>
      <p className="text-3xl font-bold">Set up your cash Balance</p>
      <input
        type="number"
        placeholder="100,000"
        className="w-[500px] h-16 bg-gray-200 text-lg font-semibold rounded-xl px-4"
        onChange={(e) => {
          setNewUser({ ...newUser, bankBalance: Number(e.target.value) });
        }}
      />
      <p className="text-gray-500 mx-auto">
        How much cash do you have in your wallet?
      </p>
      <button
        onClick={() => setStep(3)}
        className="bg-[#114B5F] text-white w-72 h-12 rounded-2xl text-xl mx-auto"
      >
        Confirm
      </button>
    </div>
  );
};
