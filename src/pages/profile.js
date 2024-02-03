import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const getUserInfo = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return router.push("/signin");
    }
    const loggedUser = jwtDecode(token);
    const res = await axios.get("http://localhost:8080/getUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const usersData = res.data;
    const verifiedUser = usersData.filter((user) => user.id === loggedUser.id);
    setUser(verifiedUser[0]);
  };
  const check = async () => {
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
  const signOut = () => {
    try {
      localStorage.removeItem("authToken");
      router.push("/signin");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  const visibleUser = user;
  return (
    <div className="flex justify-between items-center w-3/4 mx-auto mt-32">
      <button
        onClick={check}
        className="absolute h-8 w-32 bg-[#114B5F] text-white rounded-xl top-16"
      >
        Dashboard
      </button>
      <button
        className="absolute h-8 w-32 bg-[#114B5F] text-white rounded-xl top-16 right-64"
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
      <img src="./mylogo.png" className="rounded-[50%] w-2/5" />
      <div className="w-2/5 bg-gray-300">
        <p className="font-semibold text-2xl">
          Name:
          <span className="font-bold pl-4">{visibleUser.name}</span>
        </p>
        <p className="font-semibold text-2xl">
          Email:
          <span className="font-bold pl-4">{visibleUser.email}</span>
        </p>
      </div>
    </div>
  );
};

export default profile;
