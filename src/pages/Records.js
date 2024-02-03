import { Header } from "@/components/Header";
import { Recordform } from "@/components/Recordform";
import { useEffect, useState } from "react";
import { Addcategory } from "@/components/Addcategory";
import { useContext } from "react";
import { isRecordBarVisibleContext } from "@/context/Visible";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { CategoryContext } from "@/context/Category";
import axios from "axios";
export default function Records() {
  const router = useRouter();
  const [showAddCategoryBar, setShowAddCategoryBar] = useState(false);
  const { categoryData, setCategoryData } = useContext(CategoryContext);
  const [transactionData, setTransactionData] = useState([]);
  const { isRecordBarVisible, setIsRecordBarVisible } = useContext(
    isRecordBarVisibleContext
  );
  const [user, setUser] = useState({});
  const isTokenNull = (token) => {
    if (!token) {
      return router.push("/signin");
    }
  };
  const fetchingTransactions = async () => {
    try {
      const token = localStorage.getItem("authToken");
      isTokenNull(token);
      setUser(jwtDecode(token));
      const res = await axios.get("http://localhost:8080/gettingTransaction", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 202) {
        const transactionData = await res.data;
        setTransactionData(transactionData);
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchingCategories = async () => {
    try {
      const token = localStorage.getItem("authToken");
      isTokenNull(token);
      setUser(jwtDecode(token));
      const res = await axios.get("http://localhost:8080/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 202) {
        const categoryData = await res.data;
        setCategoryData(categoryData);
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchingCategories();
    fetchingTransactions();
  }, []);
  const clearingDB = async () => {
    const res = await fetch("http://localhost:8080/deletingCategories", {
      method: "POST",
    });
  };
  const visibleTransactionData = transactionData.filter(
    (el) => el.userid === user.id
  );
  const visibleCategoryData = categoryData;
  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-200">
      <Header />
      {isRecordBarVisible === true && (
        <div className="absolute flex mt-16 ml-16 w-full h-1/2">
          <Recordform />
        </div>
      )}
      {showAddCategoryBar === true && (
        <div className="w-1/3 rounded-lg mt-80 absolute m-auto bg-white">
          <Addcategory close={setShowAddCategoryBar} />
        </div>
      )}
      <div className="flex h-5/6 w-10/12 justify-between items-center rounded-lg mt-4">
        <div className="flex flex-col gap-6 w-1/4 bg-white rounded-xl justify-center px-8 my-8 py-8">
          <p className="font-bold text-3xl">Records</p>
          <button
            onClick={() => setIsRecordBarVisible(true)}
            className="w-56 bg-[#114B5F] h-8 items-center flex justify-center text-white rounded-2xl"
          >
            + Add
          </button>
          <input
            className="bg-gray-200 border-[1px] border-solid border-gray-500 w-56 h-8 rounded-lg pl-4"
            type="text"
            placeholder="Search"
          />
          <div className="flex flex-col gap-4">
            <label className="text-2xl font-semibold">Types</label>
            <div className="flex gap-2">
              <input type="radio" className="w-6 h-6" />
              <label>All</label>
            </div>
            <div className="flex gap-2">
              <input type="radio" className="w-6 h-6" />
              <label>Income</label>
            </div>
            <div className="flex gap-2">
              <input type="radio" className="w-6 h-6" />
              <label>Expense</label>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <label className="text-2xl font-semibold">Category</label>
              <button
                onClick={() => clearingDB()}
                className="border-0 bg-white text-gray-400"
              >
                Clear
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {visibleCategoryData.map((category) => {
                return (
                  <div className="flex justify-between">
                    <div>{category.categoryimg}</div>
                    <p className="text-gray-600 font-semibold">
                      {category.name}
                    </p>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => {
                setShowAddCategoryBar(true);
                fetchingCategories();
              }}
              className="border-0"
            >
              + Add Category
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-2xl font-semibold">Amount Range</label>
            <div className="flex justify-between w-full mx-auto">
              <button className="w-32 h-16 border-[1px] border-solid border-gray-600 rounded-lg">
                0
              </button>
              <button className="w-32 h-16 border-[1px] border-solid border-gray-600 rounded-lg">
                1000
              </button>
            </div>
            0<input type="range" />
            1000
          </div>
        </div>
        <div className="flex flex-col w-3/5">
          <div className="flex justify-between">
            {/* <div className="flex gap-4">
              <button className="w-8 h-8 flex justify-center items-center bg-gray-300 rounded-lg">
                {"<"}
              </button>
              <p className="flex justify-center items-center">Last month</p>
              <button className="w-8 h-8 flex justify-center items-center bg-gray-300 rounded-lg">
                {">"}
              </button>
            </div> */}
            {/* <select className="rounded-lg px-4 text-lg font-semibold">
              <option>Newest first</option>
            </select> */}
          </div>
          <div className="flex flex-col justify-between items-center rounded-lg gap-4">
            {visibleTransactionData &&
              visibleTransactionData.map((transaction) => {
                return (
                  <div className="flex w-full justify-between pt-4 pl-4 border-solid border-2 rounded-lg bg-white items-center m-ato">
                    <div className="flex gap-8 justify-center items-center">
                      <div className="w-16 h-16">{transaction.categoryimg}</div>
                      <p className="text-xl font-bold">
                        {transaction.categoryname}
                      </p>
                    </div>
                    <p
                      className={`pr-8 font-semibold text-lg ${
                        transaction.transactiontype === "INC"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.amount}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}
