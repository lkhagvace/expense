import axios from "axios";
import { RouteMatcher } from "next/dist/server/future/route-matchers/route-matcher";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
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
        router.push("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    check();
  }, []);
  return <></>;
}
