import React, { useState } from "react";
import { Link, useNavigate,  } from "react-router-dom";
import { useForm } from "react-hook-form";

function Signin() {
  const [loading, setLoding] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoding(true);
      setError(false);
      const res = await fetch("/BackEnd/auth/signin", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const userData = await res.json();
      console.log(userData);
      setLoding(false);
      if (userData.success === false) {
        return setError(true);
      }
      navigate("/")
    } catch (error) {
      setLoding(false);
      setError(true);
    }
  };

  

  return (
    <div className="p-4 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-8">Sign In</h1>
      <p className="text-red-700 text-center font-semibold p-5">
        {error && "somthing went wrong"}
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
      <div className="flex gap-2 mt-5">
        <p>Don't Have an account?</p>
        <Link to="/signup">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}

export default Signin;
