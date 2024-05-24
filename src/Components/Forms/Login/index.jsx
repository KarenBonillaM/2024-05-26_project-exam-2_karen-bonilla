import React, { useState } from "react";
import loginSchema from "../../../Validation/login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as storage from "../../../Shared/storage.js";
import { API_AUTH_LOGIN } from "../../../Shared/apis.js";

function LoginForm() {
  const [alertMessage, setAlertMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(API_AUTH_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { accessToken, ...user } = await response.json();

        storage.save("token", user.data.accessToken);
        storage.save("profile", user.data);

        console.log(user.data.accessToken);

        const encodeName = encodeURIComponent(user.data.name);

        setAlertMessage({ type: "success", text: "User registered" });
        console.log("User registered successfully");

        const redirectURL = `user/${encodeName}`;
        console.log(redirectURL);
        window.location.href = redirectURL;
      } else {
        const errorData = await response.json();
        if (errorData.message === "Invalid email or password") {
          setAlertMessage({
            type: "error",
            text: "Email or password not registered",
          });
        } else {
          setAlertMessage({ type: "error", text: "Failed to login" });
        }
      }
    } catch (error) {
      console.error("Error logging in user", error.message);
      setAlertMessage({ type: "error", text: error.message });
    }
    console.log(formData);
  };

  return (
    <div className="p-4">
      <form
        className="w-1/2 p-4 m-auto rounded bg-white shadow-md shadow-slate-200"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="relative my-6">
          <input
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            {...register("email")}
            type="email"></input>
          <label
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            htmlFor="email">
            <span className="text-red-400">*</span> Email
          </label>
          <p className="px-4 pt-1 text-red-400 text-sm">
            {errors.email?.message}
          </p>
        </div>
        <div className="relative my-6">
          <input
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            {...register("password")}
            type="password"></input>
          <label
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            htmlFor="password">
            <span className="text-red-400">*</span> Password
          </label>
          <p className="px-4 pt-1 text-red-400 text-sm">
            {errors.password?.message}
          </p>
        </div>
        <button
          className="flex uppercase h-12 w-4/5 m-auto items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-700 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-600 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
          type="submit">
          Login
        </button>
        {alertMessage && (
          <div
            className={`alert mt-3 w-full px-4 py-3 text-sm border rounded border-emerald-100 bg-emerald-50 text-emerald-500 ${
              alertMessage.type === "success"
                ? "bg-emerald-100 text-emerald-500"
                : "bg-red-50 text-red-500"
            }
        `}>
            {alertMessage.text}
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
