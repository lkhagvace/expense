import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { isRecordBarVisibleContext } from "@/context/Visible";
import axios from "axios";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  const { isRecordBarVisible, setIsRecordBarVisible } = useContext(
    isRecordBarVisibleContext
  );
  const check = async (id) => {
    const root = id;
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return router.push("/signin");
      }
      const res = await axios.get("http://localhost:8080/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        router.push(`/${root}`);
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-between w-full items-center pt-4 bg-white pb-4">
      <nav className="flex gap-8 justify-center items-center ml-16">
        <img
          onClick={() => router.push("/dashboard")}
          src="./mylogo.png"
          className="w-16 h-16 rounded-[50%]"
        />
        <button
          id="dashboard"
          onClick={(e) => {
            check(e.target.id);
          }}
        >
          Dashboard
        </button>
        <button
          id="Records"
          onClick={(e) => {
            check(e.target.id);
          }}
        >
          Record
        </button>
      </nav>
      <div className="flex gap-8 mr-16">
        <button
          onClick={() => {
            setIsRecordBarVisible(true);
          }}
          className="bg-[#114B5F] text-white m-auto w-24 h-8 rounded-2xl"
        >
          + Records
        </button>
        <button onClick={(e) => check(e.target.id)}>
          <img id="profile" className="w-8 h-8 rounded-[50%]" />
        </button>
      </div>
    </div>
  );
};
