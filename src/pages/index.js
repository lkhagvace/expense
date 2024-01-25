import { UpArrow } from "@/svgs/UpArrow";
import { DownArrow } from "@/svgs/DownArrow";
import { Header } from "@/components/Header";
import Link from "next/link";
import { useState } from "react";
import { stringify } from "postcss";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [readyToGoHomePage, setReadyToGoHomePage] = useState(false);
  const signin = async () => {
    if (email && password) {
      try {
        const user = {
          email: email,
          password: password,
        };
        const res = await fetch("http://localhost:8080/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        if (res.status === 201) {
          setReadyToGoHomePage(!readyToGoHomePage);
        }
      } catch (error) {
        console.error(error);
      }
    }
    console.log(readyToGoHomePage);
  };
  return (
    <div className="flex min-h-screen">
      {readyToGoHomePage === true && (
        <main className="flex flex-col items-center min-h-screen bg-gray-200">
          <Header />
          <div className="flex justify-around w-full mt-4">
            <div className="rounded-2xl h-64 bg-blue-600 w-1/4">
              <div className="flex justify-content items-center mt-8 ml-8 gap-4">
                <img src="./mylogo.png" className="w-12 h-12 rounded-[50%]" />
                <p className="text-white text-xl font-semibold">AceArea</p>
              </div>
              <div className="flex flex-col ml-8 mt-24 gap-2">
                <p className="text-gray-50">Cash</p>
                <p className="text-xl text-white font-semibold">10,000,000</p>
              </div>
            </div>
            <div className="rounded-2xl h-64 bg-white w-1/4">
              <div className="flex justify-content items-center mt-4 ml-8 gap-4 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-[50%]"></div>
                <p className="text-lg font-semibold">Your Income</p>
              </div>
              <hr></hr>
              <div className="ml-8 flex flex-col justify-center, mt-8 my-8">
                <p className="text-3xl font-bold">1,200,000</p>
                <p className="text-gray-500 text-lg">Your Income Amount</p>
              </div>
              <div className="flex ml-8">
                <UpArrow />
                <p>32% from last month</p>
              </div>
            </div>
            <div className="rounded-2xl h-64 bg-white w-1/4">
              <div className="flex justify-content items-center mt-4 ml-8 gap-4 mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-[50%]"></div>
                <p className="text-lg font-semibold">Total Expenses</p>
              </div>
              <hr></hr>
              <div className="ml-8 flex flex-col justify-center, mt-8 my-8">
                <p className="text-3xl font-bold">- 1,200,000</p>
                <p className="text-gray-500 text-lg">Your Income Amount</p>
              </div>
              <div className="flex ml-8">
                <DownArrow />
                <p>32% from last month</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-16 w-11/12 justify-center">
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
          <div className="flex mt-4 w-11/12 bg-white pl-8 rounded-2xl">
            <p className="text-lg font-semibold">Last Records</p>
            <hr></hr>
          </div>
        </main>
      )}
      {readyToGoHomePage === false && (
        <div>
          <div className="w-1/2 flex flex-col my-auto gap-8">
            <div className="flex flex-col w-full h-full m-auto py-auto gap-8">
              <div className="flex justify-center items-center gap-6">
                <img src="./mylogo.png" className="w-16 h-16 rounded-[50%]" />
                <p className="font-bold text-2xl">AceArea</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl font-bold">Welcome Back</p>
                <p className="text-gray-600">
                  Welcome back, Please enter your details
                </p>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <input
                  className="bg-gray-100 border-solid border-2 border-gray-300 w-72 h-12 rounded-xl pl-4"
                  placeholder="Email"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="bg-gray-100 border-solid border-2 border-gray-300 w-72 h-12 rounded-xl pl-4"
                  placeholder="Password"
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                onClick={signin}
                className="bg-blue-600 text-white w-72 h-12 rounded-2xl text-xl mx-auto"
              >
                Log In
              </button>
              <div className="flex gap-4 justify-center">
                <p className="text-gray-600">Don't have an account?</p>
                <Link href={"/signup"} className="text-blue-500">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-blue-600 w-1/2"></div>
        </div>
      )}
    </div>
  );
}
