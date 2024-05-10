import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "../Components/AdminNav";

function EditUser() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const location = useLocation();
  const { userName, email, _id } = location.state || {};
  const navigate = useNavigate();
  useEffect(() => {
    setValue("userName", userName);
    setValue("email", email);
  }, [userName, email, setValue]);

  const onSubmit = async (data) => {
      console.log(data);
    try {
      const response = await fetch(`/BackEnd/admin/edit/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.success) {
        navigate(`/adminDashboard`);
      } else {
        console.error(responseData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>

      <AdminNavbar />
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-xl w-full">
          <form
          className="bg-gray-200 p-6 rounded-lg shadow-lg shadow-black flex flex-col justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-bold text-3xl">Edit User</h1>
            <label htmlFor="username" className="flex flex-col my-1  w-full">
              Username:
              <input
                className="border-2 p-2 my-2"
                {...register("userName", {
                  required: "Username is required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message:
                      "Please valid characters only. [Alphabets A to Z, a to z ]",
                  },
                })}
              />
              <p className="text-red-600">{errors.userName?.message}</p>
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
                })}
              />
              <p className="text-red-600">{errors.email?.message}</p>
            </label>
            
            <button className="border-2 p-2 m-2 bg-slate-500 text-white font-bold rounded-md hover:bg-slate-400" type="submit">
              Edit User
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditUser;