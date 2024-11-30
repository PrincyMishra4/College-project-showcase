'use client';
import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Form Values:", values);
      
    },
  });

  return (
    <>
      <div
        className="h-[100vh] flex space-evenly items-center w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(https://i.pinimg.com/474x/f8/8a/c2/f88ac2a50463c45bf24b720786713016.jpg)`,
        }}
      >
        <div className="w-80 h-[63vh] rounded-lg max-w-md mx-auto">
          <div className="rounded-lg border-2 shadow bg-green-100 p-8">
            <h3 className="uppercase font-bold my-6 text-2xl text-center text-green-600">
              Login Here
            </h3>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="email">Email Address</label>
              <input
                className="border rounded w-full px-3 py-2 mb-4 font-bold"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600 text-sm">{formik.errors.email}</div>
              ) : null}

              <label htmlFor="password">Password</label>
              <input
                className="border rounded w-full px-3 py-2 mb-4 font-bold"
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600 text-sm">{formik.errors.password}</div>
              ) : null}

              <Link href="#" className="block text-black font-bold">
                Forgot Password
              </Link>
              <button
                type="submit"
                className="border bg-green-600 text-white mt-5 px-3 py-2 rounded w-full"
              >
                Submit
              </button>
              <Link href="/signup" className="block text-base text-gray-500 text-center">
                Don't Have an Account? <span className="text-red-600">SignUp</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
