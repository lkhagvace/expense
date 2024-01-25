import { Header } from "@/components/Header";
import { Eye } from "@/svgs/Eye";
import { Right } from "@/svgs/Right";
export default function Records() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-200">
      <Header />
      <div className="flex h-5/6 w-10/12 justify-between items-center rounded-lg mt-16">
        <div className="flex flex-col gap-6 w-1/5 bg-white rounded-xl justify-center items-center py-8">
          <p className="font-bold text-3xl">Records</p>
          <button className="w-56 bg-blue-600 flex justify-center text-white rounded-2xl">
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
              <button className="border-0 bg-white text-gray-400">Clear</button>
            </div>
            <button className="flex gap-4">
              <Eye /> Food & Drinks <Right />
            </button>
            <button className="border-0">+ Add Category</button>
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
            <div className="flex gap-4">
              <button className="w-8 h-8 flex justify-center items-center bg-gray-300 rounded-lg">
                {"<"}
              </button>
              <p className="flex justify-center items-center">Last month</p>
              <button className="w-8 h-8 flex justify-center items-center bg-gray-300 rounded-lg">
                {">"}
              </button>
            </div>
            <select className="rounded-lg px-4 text-lg font-semibold">
              <option>Newest first</option>
            </select>
          </div>
          <div className="flex justify-between items-center bg-white rounded-lg px-8 pb-4">
            <div className="flex gap-4 mt-4 items-center justify-center">
              <input type="checkbox" className="w-8 h-8" />
              <label>Select All</label>
            </div>
            <p className="text-lg text-gray-500">- 35,500</p>
          </div>
        </div>
      </div>
    </main>
  );
}
