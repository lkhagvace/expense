import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "@/context/User";
import { signupUserSchema } from "@/Validations/SignupUserValidation";
import { useFormik } from "formik";

const signup = () => {
  const router = useRouter();
  const isThereToken = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      return router.push("/dashboard");
    }
  };
  const { newUser, setNewUser } = useContext(UserContext);
  useEffect(() => {
    isThereToken();
  }, []);

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupUserSchema,
  });
  const creatingUser = async () => {
    if (
      errors.name === undefined &&
      errors.email === undefined &&
      errors.password === undefined &&
      errors.confirmPassword === undefined
    ) {
      try {
        const user = {
          name: values.name,
          email: values.email,
          password: values.password,
        };
        setNewUser(user);
        router.push("/options");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Not Valid!");
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
          <form className="flex flex-col gap-4 items-center">
            <div className="flex w-full flex-col items-center h-20">
              <input
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`bg-gray-100 border-solid border-2 border-gray-300 w-72 h-12 rounded-xl pl-4 ${
                  errors.name ? "border-red-500" : "border-blue-500"
                }`}
                placeholder="Name"
                type="text"
              />
              {errors.name ? (
                <p className="w-72 text-red-500 text-lg">{errors.name}</p>
              ) : null}
            </div>
            <div className="flex w-full flex-col items-center h-20">
              <input
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`bg-gray-100 border-solid border-2 border-gray-300 w-72 h-12 rounded-xl pl-4 ${
                  errors.email ? "border-red-500" : "border-blue-500"
                }`}
                placeholder="Email"
                type="text"
              />
              {errors.email ? (
                <p className="w-72 text-red-500 text-lg">{errors.email}</p>
              ) : null}
            </div>
            <div className="flex w-full flex-col items-center h-20">
              <input
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`bg-gray-100 border-solid border-2 border-gray-300 w-72 h-12 rounded-xl pl-4 ${
                  errors.password ? "border-red-500" : "border-blue-500"
                }`}
                placeholder="Password"
                type="text"
              />
              {errors.password ? (
                <p className="w-72 text-red-500 text-lg">{errors.password}</p>
              ) : null}
            </div>
            <div className="flex w-full flex-col items-center h-20">
              <input
                id="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`bg-gray-100 border-solid border-2 border-gray-300 w-72 h-12 rounded-xl pl-4 ${
                  errors.confirmPassword ? "border-red-500" : "border-blue-500"
                }`}
                placeholder="Re-Password"
                type="text"
              />
              {errors.confirmPassword ? (
                <p className="w-72 text-red-500 text-lg">
                  {errors.confirmPassword}
                </p>
              ) : null}
            </div>
          </form>
          <button
            onClick={() => {
              handleSubmit();
              creatingUser();
            }}
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
