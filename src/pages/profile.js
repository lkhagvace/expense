import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { instance } from "@/components/Instance";
import { array } from "yup";
const profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [img, setImg] = useState();
  const getUserInfo = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return router.push("/signin");
    }
    const loggedUser = jwtDecode(token);
    const res = await instance.get("/getUser", {
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
      const res = await instance.get("/check", {
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
  const imageUpload = async (src) => {
    try {
      const token = localStorage.getItem("authToken");
      const source = URL.createObjectURL(src);
      const userId = user.id;
      console.log(typeof new ArrayBuffer(source));
      const res = await axios.post(
        "http://localhost:8080/upload",
        { source: new ArrayBuffer(source), userId: userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response: ", res.data);
    } catch (error) {
      console.error("erroor in image upload: ", error);
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
      <div className="flex flex-col gap-4 w-2/5">
        <input
          type="file"
          onChange={(e) => {
            imageUpload(e.target.files[0]);
          }}
        />
        <img src={`${img}`} className="rounded-3xl" />
      </div>
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
