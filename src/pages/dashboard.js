import { UpArrow } from "@/svgs/UpArrow";
import { DownArrow } from "@/svgs/DownArrow";
import { Header } from "@/components/Header";
import { useMemo, useState } from "react";
import { Recordform } from "@/components/Recordform";
import { useContext, useEffect } from "react";
import { isRecordBarVisibleContext } from "@/context/Visible";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { CategoryContext } from "@/context/Category";

export default function Dashboard() {
  const router = useRouter();
  const { isRecordBarVisible, setIsRecordBarVisible } = useContext(
    isRecordBarVisibleContext
  );
  const { categoryData, setCategoryData } = useContext(CategoryContext);
  const [transactionData, setTransactionData] = useState([]);
  const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [total, setTotal] = useState(0);
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

  const visibleCategoryData = categoryData;
  const visibleTransactionData = transactionData.filter(
    (el) => el.userid === user.id
  );

  const counter = useMemo(() => {
    setExpense(
      visibleTransactionData.filter((el) => el.transactiontype === "EXP")
    );
    setIncome(
      visibleTransactionData.filter((el) => el.transactiontype === "INC")
    );
    const expenseCashBalance = expense.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );
    const incomeCashBalace = income.reduce((acc, cur) => acc + cur.amount, 0);
    const Total = incomeCashBalace - expenseCashBalance;
    setTotalIncome(incomeCashBalace);
    setTotalExpense(expenseCashBalance);
    setTotal(Total);
  }, [transactionData]);
  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-200">
      <Header />
      <div className="flex justify-center m-auto absolute w-full mt-64">
        {isRecordBarVisible === true && <Recordform />}
      </div>
      <div className="flex justify-around w-full mt-4">
        <div className="rounded-2xl h-64 bg-[#114B5F] w-1/4">
          <div className="flex justify-content items-center mt-8 ml-8 gap-4">
            <img src="./mylogo.png" className="w-12 h-12 rounded-[50%]" />
            <p className="text-white text-xl font-semibold">AceArea</p>
          </div>
          <div className="flex flex-col ml-8 mt-24 gap-2">
            <p className="text-gray-50">Cash</p>
            <p
              className={`text-xl ${
                total < 0 ? "text-red-500" : "text-white"
              } font-semibold`}
            >
              {total}
            </p>
          </div>
        </div>
        <div className="rounded-2xl h-64 bg-white w-1/4">
          <div className="flex justify-content items-center mt-4 ml-8 gap-4 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-[50%]"></div>
            <p className="text-lg font-semibold">Your Income</p>
          </div>
          <hr></hr>
          <div className="ml-8 flex flex-col justify-center, mt-8 my-8">
            <p className="text-3xl font-bold text-green-500">{totalIncome}</p>
            <p className="text-gray-500 text-lg">Your Income Amount</p>
          </div>
          <div className="flex ml-8">
            <UpArrow />
            <p>32% from last month</p>
          </div>
        </div>
        <div className="rounded-2xl h-64 bg-white w-1/4">
          <div className="flex justify-content items-center mt-4 ml-8 gap-4 mb-4">
            <div className="w-2 h-2 bg-[#114B5F] rounded-[50%]"></div>
            <p className="text-lg font-semibold">Total Expenses</p>
          </div>
          <hr></hr>
          <div className="ml-8 flex flex-col justify-center, mt-8 my-8">
            <p className="text-3xl font-bold text-red-500">- {totalExpense}</p>
            <p className="text-gray-500 text-lg">Your Income Amount</p>
          </div>
          <div className="flex ml-8">
            <DownArrow />
            <p>32% from last month</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-16 w-11/12">
        <div className="w-5/12 bg-white h-64 rounded-2xl">
          <div className="flex justify-content items-center mt-4 ml-8 gap-4 mb-4">
            <p className="text-lg font-semibold">Income - Expense</p>
          </div>
          <hr></hr>
        </div>
        <div className="w-5/12 bg-white h-64 rounded-2xl">
          <div className="flex justify-between items-center mt-4 ml-8 gap-4 mb-4 mr-4">
            <p className="text-lg font-semibold">Income - Expense</p>
            <p className="text-gray-300">Jun 1 - Nov 30</p>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4 w-11/12 bg-white pl-8 rounded-2xl">
        <p className="text-2xl font-semibold mt-4">Last Records</p>
        <hr></hr>
        <div className="flex flex-col justify-between items-center bg-white rounded-lg">
          {visibleTransactionData &&
            visibleTransactionData.map((transaction) => {
              return (
                <div className="flex w-full justify-between">
                  <div className="flex gap-8">
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
    </main>
  );
}
