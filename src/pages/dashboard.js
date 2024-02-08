import { UpArrow } from "@/svgs/UpArrow";
import { DownArrow } from "@/svgs/DownArrow";
import { Header } from "@/components/Header";
import { useMemo, useState } from "react";
import { Recordform } from "@/components/Recordform";
import { useContext, useEffect } from "react";
import { isRecordBarVisibleContext } from "@/context/Visible";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import { BarChart } from "@/charts/BarChart";
import { PieChart } from "@/charts/PieChart";
import { instance } from "@/components/Instance";

export default function Dashboard() {
  const router = useRouter();
  const { isRecordBarVisible, setIsRecordBarVisible } = useContext(
    isRecordBarVisibleContext
  );
  let [transactionData, setTransactionData] = useState([]);
  const [total, setTotal] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [user, setUser] = useState({});
  let [chartData, setChartData] = useState([]);
  const isTokenNull = (token) => {
    if (!token) {
      return router.push("/signin");
    }
  };

  // gettin bank balance

  const gettingBankBalance = async (token) => {
    try {
      isTokenNull(token);
      const decoded = jwtDecode(token);
      const res = await instance.get("/getBankBalance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotal(res.data.find((user) => user.id === decoded.id).bankbalance);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    gettingBankBalance(token);
  }, []);

  // getting transactions

  const fetchingTransactions = async (token) => {
    try {
      isTokenNull(token);
      const decoded = jwtDecode(token);
      setUser(decoded);
      const res = await instance.get("/gettingTransaction", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 202) {
        setTransactionData(res.data.filter((el) => el.userid === decoded.id));
        setChartData(res.data.filter((el) => el.userid === decoded.id));
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetchingTransactions(token);
  }, []);

  // counting

  const counter = useMemo(() => {
    const income = transactionData.filter(
      (data) => data.transactiontype === "INC"
    );
    const expense = transactionData.filter(
      (data) => data.transactiontype === "EXP"
    );
    const totalAmount =
      total +
      income.reduce((acc, cur) => acc + cur.amount, 0) -
      expense.reduce((acc, cur) => acc + cur.amount, 0);
    setTotal(totalAmount);
    setIncome(income.reduce((acc, cur) => acc + cur.amount, 0));
    setExpense(expense.reduce((acc, cur) => acc + cur.amount, 0));
  }, [transactionData]);

  const transactionChartDataFunc = useMemo(() => {
    return {
      labels: chartData ? chartData.map((data) => data.transactiontype) : [],
      datasets: [
        {
          label: "Amount",
          data: chartData ? chartData.map((data) => data.amount) : [],
          backgroundColor: ["#114B5F", "red", "yellow", "brown"],
        },
      ],
    };
  }, [chartData]);
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
            <p className="text-3xl font-bold text-green-500">
              {income && income}
            </p>
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
            <p className="text-3xl font-bold text-red-500">
              - {expense && expense}
            </p>
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
          <div className="w-96 h-full">
            <BarChart chartData={transactionChartDataFunc} />
          </div>
        </div>
        <div className="w-5/12 bg-white h-64 rounded-2xl">
          <div className="flex justify-between items-center mt-4 ml-8 gap-4 mb-4 mr-4">
            <p className="text-lg font-semibold">Income - Expense</p>
            <p className="text-gray-300">Jun 1 - Nov 30</p>
          </div>
          <hr></hr>
          <div className="w-48 h-48 flex">
            <PieChart chartData={transactionChartDataFunc} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4 w-11/12 bg-white pl-8 rounded-2xl">
        <p className="text-2xl font-semibold mt-4">Last Records</p>
        <hr></hr>
        <div className="flex flex-col w-full h-fit mt-0 rounded-lg gap-4">
          {transactionData.length == 0 ? (
            <p className="bg-red-400 h-8 w-64 flex justify-center items-center m-auto text-white rounded-xl">
              There is no any TRANSACTION !!!
            </p>
          ) : (
            transactionData.map((transaction) => {
              return (
                <div className="flex w-full justify-between py-4 px-4 rounded-lg bg-white items-center m-ato">
                  <div className="flex gap-8 justify-center items-center">
                    <div className="flex justify-center items-center">
                      <div className="bg-blue-400 w-8 h-8 rounded-[50%] flex justify-center items-center">
                        {transaction.categoryimg}
                      </div>
                    </div>
                    <div className="text-xl font-bold flex flex-col justify-center items-center">
                      <p>{transaction.categoryname}</p>
                      <div>{transaction.createdAt}</div>
                    </div>
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
            })
          )}
        </div>
      </div>
    </main>
  );
}
