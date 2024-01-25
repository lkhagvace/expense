import { UpArrow } from "@/svgs/UpArrow";
import { DownArrow } from "@/svgs/DownArrow";
import { Header } from "@/components/Header";
export default function Main() {
  return (
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
  );
}
