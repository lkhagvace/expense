import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { isRecordBarVisibleContext } from "@/context/Visible";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/router";
import { CategoryContext } from "@/context/Category";

export const Recordform = () => {
  const router = useRouter();
  const { categoryData, setCategoryData } = useContext(CategoryContext);
  const [howMuch, setHowMuch] = useState(0);
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { isRecordBarVisible, setIsRecordBarVisible } = useContext(
    isRecordBarVisibleContext
  );
  let expenseOrIncome = "";
  const addRecord = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return router.push("/signin");
    }
    const decoded = jwtDecode(token);
    const user = decoded;
    setIsRecordBarVisible(false);
    if (howMuch && description) {
      try {
        if (transactionType === false) {
          expenseOrIncome = "EXP";
        } else {
          expenseOrIncome = "INC";
        }
        const cat = categoryData.filter(
          (category) => category.name === selectedCategory
        );
        const transaction = {
          amount: Number(howMuch),
          description: description,
          transactionType: expenseOrIncome,
          userId: user.id,
          categoryId: cat[0].id,
          categoryimg: cat[0].categoryimg,
          categoryname: cat[0].name,
        };
        const res = await fetch("http://localhost:8080/creatingTransaction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transaction),
        });
      } catch (error) {
        console.error("error: ", error);
      }
    }
  };
  return (
    <div className="w-2/5 bg-gray-100 rounded-xl px-4 absolute mx-auto my-auto py-4 m-auto">
      <div className="flex justify-between items-center mt-4 ml-8 gap-4 mb-4">
        <p className="text-lg font-semibold">Add Record</p>
        <button
          onClick={() => {
            setIsRecordBarVisible(false);
          }}
        >
          &#128473;
        </button>
      </div>
      <hr></hr>
      <div className="flex w-full justify-between pt-4">
        <div className="flex flex-col justify-between w-2/5">
          <div className="flex gap-4 justify-between">
            <button
              onClick={() => {
                setTransactionType(false);
              }}
              className={`text-white rounded-lg w-48 h-8 ${
                transactionType === false ? "bg-[#114B5F]" : "text-black"
              }`}
            >
              Expense
            </button>
            <button
              onClick={() => {
                setTransactionType(true);
              }}
              className={`text-white rounded-lg w-48 h-8 ${
                transactionType === true
                  ? "bg-green-600 text-white"
                  : "text-black"
              }`}
            >
              Income
            </button>
          </div>
          <input
            type="number"
            placeholder="000,00"
            className="bg-gray-200 h-16 rounded-xl pl-4"
            onChange={(e) => setHowMuch(e.target.value)}
          />
          <div className="flex flex-col">
            <label>Category</label>
            <select
              onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
              className="w-full h-12 rounded-xl bg-gray-200"
            >
              {categoryData &&
                categoryData.map((record) => {
                  return (
                    <option>
                      {/* <p>{record.categoryImg}</p> */}
                      <p>{record.name}</p>
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label>Date</label>
              <select
                className="w-28 h-8 bg-gray-200 pl-4 rounded-xl"
                name=""
                id=""
              >
                <option>{new Date().getDate()}</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label>Date</label>
              <select
                className="w-28 h-8 bg-gray-200 pl-4 rounded-xl"
                name=""
                id=""
              >
                <option>{new Date().getHours()}</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => addRecord()}
            className={`w-64 h-8 text-white rounded-xl ${
              transactionType === false ? "bg-[#114B5F]" : "bg-green-600"
            }`}
          >
            Add Record
          </button>
        </div>
        <div className="flex flex-col gap-8 w-1/2">
          <div className="flex flex-col">
            <label>Payee</label>
            <input
              className="bg-gray-200 w-full h-12 rounded-xl pl-4"
              type="text"
              placeholder="chef"
            />
          </div>
          <div className="flex flex-col">
            <label>Note</label>
            <input
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write Here"
              className="h-64 bg-gray-200 rounded-lg"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};
