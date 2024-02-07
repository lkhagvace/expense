import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { isRecordBarVisibleContext } from "@/context/Visible";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { Addcategory } from "./Addcategory";
import { VisibleCategoryContext } from "@/context/VisibleCategory";
import { instance } from "@/components/Instance";

export const Recordform = () => {
  const router = useRouter();
  const { isCategorybarVisible, setIsCategorybarVisible } = useContext(
    VisibleCategoryContext
  );
  const [howMuch, setHowMuch] = useState(0);
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { isRecordBarVisible, setIsRecordBarVisible } = useContext(
    isRecordBarVisibleContext
  );
  const [categoryData, setCategoryData] = useState([]);
  const fetchCategory = async () => {
    try {
      const res = await instance.get("/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategoryData(res.data);
    } catch (error) {}
  };
  let expenseOrIncome = "";
  const addRecord = async () => {
    setIsRecordBarVisible(false);
    const token = localStorage.getItem("authToken");
    if (!token) {
      return router.push("/signin");
    }
    const decoded = jwtDecode(token);
    const user = decoded;
    if (howMuch && description) {
      try {
        if (transactionType === false) {
          expenseOrIncome = "EXP";
        } else {
          expenseOrIncome = "INC";
        }
        const cat = categoryData.find(
          (category) => category.name === selectedCategory
        );
        const transaction = {
          amount: Number(howMuch),
          description: description,
          transactionType: expenseOrIncome,
          userId: user.id,
          categoryId: cat.id,
          categoryimg: cat.categoryimg,
          categoryname: cat.name,
        };
        const res = await instance.post("/creatingTransaction", transaction, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("error: ", error);
      }
    }
  };
  return (
    <div className="w-2/5 bg-gray-100 rounded-xl px-4 absolute mx-auto my-auto py-4 m-auto">
      {isCategorybarVisible === true && (
        <div className="absolute z-2 w-full h-fit bg-white m-auto flex justify-center items-center">
          <Addcategory />
        </div>
      )}
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
              className={`rounded-lg w-48 h-8 ${
                transactionType === false
                  ? "bg-[#114B5F] text-white"
                  : "text-black"
              }`}
            >
              Expense
            </button>
            <button
              onClick={() => {
                setTransactionType(true);
              }}
              className={`rounded-lg w-48 h-8 ${
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

          {categoryData.length == 0 ? (
            <button
              onClick={() => setIsCategorybarVisible(true)}
              className="flex flex-col justify-center items-center bg-[#114B5F] text-white h-8 rounded-lg"
            >
              + Add Category
            </button>
          ) : (
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
                        <p>{record.name}</p>
                      </option>
                    );
                  })}
              </select>
            </div>
          )}

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
