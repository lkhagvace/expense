import { Header } from "@/components/Header";
import { Recordform } from "@/components/Recordform";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Addcategory } from "@/components/Addcategory";
import { useContext } from "react";
import { isRecordBarVisibleContext } from "@/context/Visible";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { VisibleCategoryContext } from "@/context/VisibleCategory";
import { Eye } from "@/svgs/Eye";
import { Right } from "@/svgs/Right";
import { Plus } from "@/svgs/Plus";
import { Eyeslash } from "@/svgs/Eyeslash";
import { instance } from "@/components/Instance";
export default function Records() {
  const router = useRouter();
  const [transactionData, setTransactionData] = useState([]);
  const { isRecordBarVisible, setIsRecordBarVisible } = useContext(
    isRecordBarVisibleContext
  );
  const { isCategorybarVisible, setIsCategorybarVisible } = useContext(
    VisibleCategoryContext
  );
  const [visibleTransactionType, setVisibleTransactionType] = useState("ALL");
  const [user, setUser] = useState({});
  const [range, setRange] = useState(0);
  const [visibleByCategory, setVisibleByCategory] = useState(true);
  const [hideId, setHideId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const isTokenNull = (token) => {
    if (!token) {
      return router.push("/signin");
    }
  };
  const fetchingTransactions = async () => {
    try {
      const token = localStorage.getItem("authToken");
      isTokenNull(token);
      const decoded = jwtDecode(token);
      setUser(decoded);

      const res = await instance.get("/gettingTransaction", {
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
      const decoded = jwtDecode(token);
      const res = await instance.get("/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 202) {
        const allCategoryData = await res.data;
        setCategoryData(
          allCategoryData.filter((category) => category.userid === decoded.id)
        );
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };
  let data = transactionData.filter((el) => el.userid === user.id);
  const filteringByRange = useMemo(() => {
    data = data.filter((transaction) => transaction.amount <= range);
  }, [range]);
  const sortByType = useMemo(() => {
    if (visibleTransactionType === "INC") {
      data = data.filter(
        (transaction) => transaction.transactiontype === visibleTransactionType
      );
    }
    if (visibleTransactionType === "EXP") {
      data = data.filter(
        (transaction) => transaction.transactiontype === visibleTransactionType
      );
    }
  }, [visibleTransactionType]);
  let visibleCategoryData = categoryData;
  const hideTransaction = useMemo(() => {
    if (visibleByCategory === false) {
      data = data.filter((data) => data.categoryid !== hideId);
    }
  }, [visibleByCategory]);
  const filteringByCategoryName = useMemo(() => {
    data = data.filter((el) =>
      el.categoryname.toLowerCase().includes(searchValue)
    );
  }, [searchValue]);
  useEffect(() => {
    fetchingCategories();
    fetchingTransactions();
  }, []);
  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-200">
      <Header />
      {isRecordBarVisible === true && (
        <div className="absolute flex m-64 justify-center items-center w-full h-1/2">
          <Recordform />
        </div>
      )}
      {isCategorybarVisible === true && (
        <div className="w-1/3 rounded-lg mt-80 absolute m-auto bg-white">
          <Addcategory />
        </div>
      )}
      <div className="flex h-5/6 w-10/12 rounded-lg mt-4 justify-between">
        <div className="flex flex-col gap-6 w-1/4 bg-white rounded-xl justify-center px-8 my-8 py-8">
          <p className="font-bold text-3xl">Records</p>
          <button
            onClick={() => setIsRecordBarVisible(true)}
            className="w-full bg-[#114B5F] h-10 items-center flex justify-center text-white text-2xl font-semibold rounded-lg"
          >
            + Add
          </button>
          <input
            className="bg-gray-200 border-[1px] border-solid border-gray-500 w-full h-8 rounded-lg pl-4"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <form className="flex flex-col gap-4">
            <label className="text-2xl font-semibold">Types</label>
            <div className="flex gap-2">
              <input
                type="radio"
                name="options"
                id="ALL"
                className="w-6 h-6"
                onChange={(e) => setVisibleTransactionType(e.target.id)}
              />
              <label>All</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="options"
                id="INC"
                className="w-6 h-6"
                onChange={(e) => setVisibleTransactionType(e.target.id)}
              />
              <label>Income</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="options"
                id="EXP"
                className="w-6 h-6"
                onChange={(e) => setVisibleTransactionType(e.target.id)}
              />
              <label>Expense</label>
            </div>
          </form>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <label className="text-2xl font-semibold">Category</label>
              <button className="border-0 bg-white text-gray-400">Clear</button>
            </div>
            <div className="flex flex-col gap-4">
              {visibleCategoryData.map((category) => {
                return (
                  <div className="flex gap-4 items-center justify-between">
                    <button
                      onClick={() => {
                        setVisibleByCategory(!visibleByCategory);
                        setHideId(category.id);
                      }}
                    >
                      {visibleByCategory === true ? <Eye /> : <Eyeslash />}
                    </button>
                    <p className="text-gray-600 font-semibold">
                      {category.name}
                    </p>
                    <div>{<Right />}</div>
                  </div>
                );
              })}
            </div>
            <button
              className="flex items-center gap-4"
              onClick={() => {
                setIsCategorybarVisible(true);
                fetchingCategories();
              }}
            >
              <div className="w-6 h-6">
                <Plus />
              </div>
              <p className="pt-1 text-black font-semibold text-lg">
                Add Category
              </p>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-2xl font-semibold">Amount Range</label>
            <div className="flex justify-between w-full mx-auto">
              <button
                onClick={() => setRange(0)}
                className="w-2/5 h-16 border-[1px] border-solid border-gray-600 rounded-lg"
              >
                0
              </button>
              <button
                onClick={(e) => setRange(Number(e.target.value))}
                className="w-1/2 h-16 border-[1px] border-solid border-gray-600 rounded-lg"
              >
                1000000000
              </button>
            </div>
            <div className="flex gap-2">
              0
              <input
                type="range"
                min={0}
                max="1000000000"
                className="range range-info"
                onChange={(e) => {
                  setRange(Number(e.target.value));
                }}
              />
              1000000000
            </div>
          </div>
        </div>
        <div className="flex flex-col w-3/5 mt-8">
          <div className="flex flex-col w-full h-fit mt-0 rounded-lg gap-4">
            {data.length == 0 ? (
              <p className="bg-red-400 h-8 w-64 flex justify-center items-center m-auto text-white rounded-xl">
                There is no any TRANSACTION !!!
              </p>
            ) : (
              data.map((transaction) => {
                return (
                  <div className="flex w-full justify-between border-solid py-4 px-4 border-2 rounded-lg bg-white items-center m-ato">
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
      </div>
    </main>
  );
}
