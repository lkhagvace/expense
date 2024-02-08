import React, { useState } from "react";
import { useRouter } from "next/router";
import { Home } from "@/svgs/Home";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { VisibleCategoryContext } from "@/context/VisibleCategory";
import { categorySchema } from "@/Validations/categorySchema";
import { useFormik } from "formik";

export const Addcategory = () => {
  const router = useRouter();
  const { isCategorybarVisible, setIsCategorybarVisible } = useContext(
    VisibleCategoryContext
  );
  const [categoryimg, setCategoryimg] = useState("");
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: categorySchema,
  });
  const addingCategory = async () => {
    if (errors.name === undefined) {
      try {
        setIsCategorybarVisible(false);
        const token = localStorage.getItem("authToken");
        const decoded = jwtDecode(token);
        if (!token) {
          router.push("/signin");
        }
        const newCategory = {
          categoryimg: categoryimg,
          name: values.name,
          userId: decoded.id,
        };
        const res = await fetch("http://localhost:8080/category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newCategory),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="flex flex-col w-full rounded-lg p-8">
      <div className="flex justify-between items-center mt-4 ml-8 gap-4 mb-4">
        <p className="text-lg font-semibold">Add Category</p>
        <button
          onClick={() => {
            setIsCategorybarVisible(false);
          }}
        >
          x
        </button>
      </div>
      <hr></hr>
      <div className="flex justify-between my-4">
        <select
          onChange={(e) => {
            setCategoryimg(e.target.value);
          }}
          className=" flex justify-center items-center rounded-lg w-1/6 border-2 border-solid bg-white border-gray-600 h-12"
        >
          <option>&#127851;</option>
          <option>&#127968;</option>
          <option>&#127918;</option>
          <option>&#127873;</option>
          <option>&#128120;</option>
          <option>&#127952;</option>
        </select>
        <input
          id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`rounded-lg w-4/5 border-2 border-solid border-gray-600 h-12 bg-white text-black ${
            errors.name ? "border-2 border-red-500 border-solid" : null
          }`}
          placeholder="Name"
        />
      </div>
      <button
        onClick={() => {
          addingCategory();
          handleSubmit();
        }}
        className="w-full bg-green-600 rounded-lg text-white h-12"
      >
        Submit
      </button>
    </div>
  );
};
