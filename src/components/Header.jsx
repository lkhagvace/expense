import React from "react";

export const Header = () => {
  return (
    <div className="flex justify-between w-full items-center pt-4 bg-white pb-4">
      <nav className="flex gap-8 justify-center items-center ml-16">
        <img src="./mylogo.png" className="w-16 h-16 rounded-[50%]" />
        <p>Dashboard</p>
        <p>Records</p>
      </nav>
      <div className="flex gap-8 mr-16">
        <button className="bg-blue-500 text-white m-auto w-24 h-8 rounded-2xl">
          + Records
        </button>
        <img className="w-8 h-8 rounded-[50%]" />
      </div>
    </div>
  );
};
