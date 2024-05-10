import React, { useState } from "react";
import AdminNavbar from "../Components/AdminNav";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    
    try {
      const response = await fetch(`/BackEnd/admin/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        navigate(`/admindashboard`);
      } else {
        setError(responseData.message || "Failed to add user");
      }
    } catch (error) {
      setError("Failed to add user");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-xl w-full">
          
          <div>
            <form
              className="bg-gray-200 p-6 rounded-lg shadow-lg shadow-black flex flex-col justify-center items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="font-bold text-3xl">Add new user</h1>
              <label htmlFor="username" className="flex flex-col my-1  w-full">
                Username:
                <input
                  className="border-2 p-2 my-2"
                  {...register("userName", {
                    required: "UserName is required",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message:
                        "Please valid characters only. [Alphabets A to Z, a to z ]",
                    },
                    minLength: {
                      value: 5,
                      message: "Enter atleast 5 characters",
                    },
                  })}
                />
                <p className="text-red-600">{errors.username?.message}</p>
              </label>
              <label htmlFor="email" className="flex flex-col my-1  w-full">
                Email:
                <input
                  className="border-2 p-2 my-2"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Please enter a valid email id",
                    },
                    minLength: {
                      value: 11,
                      message: "Enter atleast 11 characters",
                    },
                  })}
                />
                <p className="text-red-600">{errors.email?.message}</p>
              </label>
              
              <label htmlFor="password" className="flex flex-col my-1  w-full">
                Password:
                <input
                  type="password"
                  className="border-2 p-2 my-2"
                  {...register("password", {
                    required: "Enter a password",
                    minLength: {
                        value: 8,
                        message: "Password must contain at least 8 characters or number",
                    },
                  })}
                />
                <p className="text-red-600">{errors.password?.message}</p>
              </label>
              
              <button
                className="border-2 p-2 m-2 bg-slate-500 text-white font-bold rounded-md hover:bg-slate-400"
                type="submit"
              >
                Add User
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );

};



export default AddUser;