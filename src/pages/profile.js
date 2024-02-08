import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { instance } from "@/components/Instance";
const profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const getUserInfo = async (token) => {
    try {
      if (!token) {
        return router.push("/signin");
      }
      const loggedUser = jwtDecode(token);
      const res = await instance.get("/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usersData = await res.data;
      const verifiedUser = usersData.filter(
        (user) => user.id === loggedUser.id
      );
      setUser(verifiedUser[0]);
    } catch (error) {
      console.error("error to get userinfo");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    getUserInfo(token);
  }, []);
  const signOut = () => {
    try {
      localStorage.removeItem("authToken");
      router.push("/signin");
    } catch (error) {
      console.error(error);
    }
  };
  const goDashboard = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return router.push("/signin");
      }
      const res = await axios.get("http://localhost:8080/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        router.push(`/dashboard`);
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-gray-300 min-h-screen flex w-full flex-col">
      <header className="flex justify-between px-48 bg-white h-16 items-center">
        <button onClick={goDashboard} className="text-xl text-black">
          Dashboard
        </button>
        <button onClick={signOut} className="text-xl text-black">
          Sign Out
        </button>
      </header>
      <main className="min-h-screen w-full flex justify-center">
        <div className="px-48 flex justify-center mt-24 gap-32 h-1/2 items-center">
          <img className="w-64 h-64 rounded-[50%]" src="./mylogo.png" />
          <div className="flex flex-col gap-8  justify-center">
            <p className="text-black font-semibold text-3xl">{user.name}</p>
            <p className="text-black font-semibold text-lg">{user.email}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default profile;
