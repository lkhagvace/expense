import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  console.log("kk");
  const router = useRouter();
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
        router.push("/dashboard");
      } else {
        console.log(res);
        return router.push("/signin");
      }
    } catch (error) {
      if (error.response.status === 403) {
        return localStorage.removeItem("authToken");
      }
      console.error("error :", error);
    }
  };
  useEffect(() => {
    check();
  }, []);
  return <></>;
}
