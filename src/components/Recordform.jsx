import React from "react";

export const Recordform = () => {
  return (
    <div className="w-2/5 bg-white rounded-xl">
      <div className="flex justify-between items-center mt-4 ml-8 gap-4 mb-4">
        <p className="text-lg font-semibold">Add Record</p>
        <button>x</button>
      </div>
      <hr></hr>
      <div className="flex w-full">
        <div className="flex flex-col gap-8 w-1/2">
          <div className="flex gap-4 w-full justify-between">
            <button className="">Expense</button>
            <button className="">Income</button>
          </div>
          <input
            type="number"
            placeholder="00,00"
            className="bg-gray-300 h-16 rounded-xl"
          />
          <div>
            <label>Category</label>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label>Date</label>
              <select name="" id=""></select>
            </div>
            <div className="flex flex-col">
              <label>Date</label>
              <select name="" id=""></select>
            </div>
          </div>
          <button className="w-64 h-8 text-white rounded-xl">Add Record</button>
        </div>
        <div className="flex flex-col gap-8 w-1/2">
          <div className="flex flex-col">
            <label>Payee</label>
            <select></select>
          </div>
          <div className="flex flex-col">
            <label>Note</label>
            <input
              placeholder="Write Here"
              className="h-64 bg-gray-200 rounded-lg"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};
