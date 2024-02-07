import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { signinUserSchema } from "@/Validations/SigninUserValidation";
import { createContext } from "react";
import { instance } from "@/components/Instance";
export const TokenContext = createContext();
export const Token = ({ children }) => {
  const [token, setToken] = useState("");
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
const login = () => {
  const { token, setToken } = useContext(TokenContext);
  const router = useRouter();
  const isThereToken = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      return router.push("/dashboard");
    }
  };
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    isThereToken();
  }, []);

  const signin = async () => {
    if (email && password) {
      try {
        const user = {
          email: email,
          password: password,
        };
        const isValid = await signinUserSchema.isValid(user);
        if (isValid === false) {
          return alert("Not Validable");
        }
        const res = await instance.post("/signin", user);
        const data = await res.data;
        if (res.status === 201) {
          const token = data.token;
          setToken(token);
          router.push("/dashboard");
          return localStorage.setItem("authToken", token);
        }
        if (res.status === 400) {
          alert("wrong password or email");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
    console.log("token in signin", token);
  }, [token]);
  return (
    <div className="flex justify-center min-h-screen">
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
            className="bg-[#114B5F] text-white w-72 h-12 rounded-2xl text-xl mx-auto"
          >
            Log In
          </button>
          <div className="flex gap-4 justify-center">
            <p className="text-gray-600">Don't have an account?</p>
            <Link href={"/signup"} className="text-[#114B5F]">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[#114B5F] w-1/2"></div>
    </div>
  );
};

export default login;
