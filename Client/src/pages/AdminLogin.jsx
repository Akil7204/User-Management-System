import React, { useState } from "react";
import { Link, useNavigate,  } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminSignInFailure, adminSignInStart, adminSignInSuccess } from "../Redux/Admin/adminSlice.js";
import {useDispatch, useSelector} from 'react-redux';
import AdminNavbar from "../Components/AdminNav.jsx";


function AdminLogin() {
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      dispatch(adminSignInStart());
      const res = await fetch("/BackEnd/admin/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const userData = await res.json();
      if (userData.success === false) {
        dispatch(adminSignInFailure(userData.message));
        return;
      }
      console.log(userData);
      dispatch(adminSignInSuccess(userData))
      console.log("success login");
      navigate("/adminDashboard");
    } catch (error) {
      dispatch(signInFailure(error))
    }
  };

  

  return (
    <>
    <AdminNavbar />
    <div className="p-4 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-8">Admin Sign In</h1>
      <p className="text-red-700 text-center font-semibold p-5">
        {error ? error || "somthing went wrong" : ""}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
       
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Please enter a valid email id",
            },
          })}
          className="bg-slate-200 p-3 rounded-lg"
        />
        <p className="text-red-600">{errors.email?.message}</p>
        <input
          type="password"
          placeholder="password"
          {...register("password", {
            required: "Enter a password",
            minLength: {
              value: 8,
              message: "Password must contain at least 8 characters or number",
            },
          })}
          className="bg-slate-200 p-3 rounded-lg"
        />
        <p className="text-red-600">{errors.password?.message}</p>
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
     
    </div>
    </>
  );
}

export default AdminLogin;
