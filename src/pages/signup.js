import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "@/context/User";
import { signupUserSchema } from "@/Validations/SignupUserValidation";

const signup = () => {
  const router = useRouter();
  const isThereToken = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      return router.push("/dashboard");
    }
  };
  const { newUser, setNewUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const conditionForSignup =
    password === rePassword &&
    name !== "" &&
    email !== "" &&
    password !== "" &&
    rePassword !== "";
  useEffect(() => {
    isThereToken();
  }, []);
  const creatingUser = async () => {
    if (conditionForSignup) {
      if (email.includes("@gmail.com")) {
        try {
          const user = {
            name: name,
            email: email,
            password: password,
          };
          const isValid = signupUserSchema.isValid(user);
          if (isValid === false) {
            return alert("NOT VALID");
          }
          setNewUser(user);
          router.push("/options");
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("Wrong Email");
      }
    } else {
      alert("Fill the all input or Password invalid");
    }
  };
  return (
    <div className={`flex min-h-screen`}>
      <div className="w-1/2 flex flex-col my-auto gap-8">
        <div className="flex flex-col w-full h-full m-auto py-auto gap-8">
          <div className="flex justify-center items-center gap-6">
            <img src="./mylogo.png" className="w-16 h-16 rounded-[50%]" />
            <p className="font-bold text-2xl">AceArea</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">Create Geld account</p>
            <p className="text-gray-600">
              Sign up below to create your Wallet account
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <input
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-100 border-solid border-2 border-gray-300 w-72 h-12 rounded-xl pl-4"
              placeholder="Name"
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 border-solid border-2 border-gray-300 w-72 h-12 rounded-xl pl-4"
              placeholder="Email"
              type="text"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 border-solid border-2 border-gray-300 w-72 h-12 rounded-xl pl-4"
              placeholder="Password"
              type="text"
            />
            <input
              onChange={(e) => setRePassword(e.target.value)}
              className="bg-gray-100 border-solid border-2 border-gray-300 w-72 h-12 rounded-xl pl-4"
              placeholder="Re-Password"
              type="text"
            />
          </div>
          <button
            onClick={creatingUser}
            className="bg-[#114B5F] text-white w-72 h-12 rounded-2xl text-xl mx-auto flex justify-center items-center"
          >
            Sign Up
          </button>
          <div className="flex gap-4 justify-center">
            <p className="text-gray-600">Already have an account?</p>
            <Link href={"/"} className="text-[#114B5F]">
              Log In
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[#114B5F] w-1/2"></div>
    </div>
  );
};

export default signup;
