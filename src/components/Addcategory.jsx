import React, { useState } from "react";
import { Home } from "@/svgs/Home";

export const Addcategory = ({ close }) => {
  const [categoryimg, setCategoryimg] = useState("");
  const [name, setName] = useState("");
  const addingCategory = async () => {
    try {
      const newCategory = {
        categoryimg: categoryimg,
        name: name,
      };
      const res = await fetch("http://localhost:8080/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col w-full rounded-lg p-8">
      <div className="flex justify-between items-center mt-4 ml-8 gap-4 mb-4">
        <p className="text-lg font-semibold">Add Record</p>
        <button onClick={() => close(false)}>x</button>
      </div>
      <hr></hr>
      <div className="flex justify-between my-4">
        <select
          onChange={(e) => {
            setCategoryimg(e.target.value);
          }}
          className=" flex justify-center items-center rounded-lg w-1/6 border-2 border-solid border-gray-600 h-12"
        >
          <option>&#127851;</option>
          <option>&#127968;</option>
          <option>&#127918;</option>
          <option>&#127873;</option>
          <option>&#128120;</option>
          <option>&#127952;</option>
        </select>
        <input
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg w-4/5 border-2 border-solid border-gray-600 h-12 text-gray-600"
          placeholder="Name"
        />
      </div>
      <button
        onClick={() => {
          addingCategory();
          close(false);
        }}
        className="w-full bg-green-600 rounded-lg text-white h-12"
      >
        Submit
      </button>
    </div>
  );
};
