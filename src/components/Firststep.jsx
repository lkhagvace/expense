import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "@/context/User";

export const Firststep = ({ setStep, step }) => {
  const { newUser, setNewUser } = useContext(UserContext);
  return (
    <div className="flex flex-col justify-center items-center gap-8 mx-auto my-auto">
      <div className="bg-[#114B5F] w-12 flex justify-center items-center h-12 rounded-[50%]">
        <img src="./Money.png" />
      </div>
      <p className="text-3xl font-bold">Select base currency</p>
      <select
        onChange={(e) => {
          setNewUser({ ...newUser, currencyType: `${e.target.value}` });
        }}
        className="w-[500px] h-16 bg-gray-200 text-lg font-semibold rounded-xl px-4"
      >
        <option>MNT</option>
        <option>USD</option>
      </select>
      <p className="w-[500px] text-gray-500">
        Your base currency should be the one you use most often. All transaction
        in other currencies will be calculated based on this one
      </p>
      <button
        onClick={() => {
          setStep(2);
        }}
        className="bg-[#114B5F] text-white w-72 h-12 rounded-2xl text-xl mx-auto"
      >
        Confirm
      </button>
    </div>
  );
};
