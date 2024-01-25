import React from "react";

const waiting = () => {
  return (
    <div className="w-full flex flex-col my-auto gap-8 min-h-screen">
      <div className="flex flex-col w-full h-full m-auto py-auto gap-8">
        <div className="flex justify-center items-center gap-6">
          <img src="./mylogo.png" className="w-16 h-16" />
          <p className="font-bold text-2xl">AceArea</p>
        </div>
        <p className="m-auto font-bold text-lg">Wait a second...</p>
      </div>
    </div>
  );
};

export default waiting;
