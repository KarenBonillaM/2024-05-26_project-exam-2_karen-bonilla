import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../../../Validation/register";
import { API_AUTH_REGISTER } from "../../../Shared/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function RegisterForm() {
  const [alertMessage, setAlertMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(API_AUTH_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAlertMessage({ type: "success", text: "User registered" });
      } else {
        throw new Error("Failed to register user");
      }
    } catch (error) {
      console.error("Error registering user", error.message);

      if (error.response && error.response.message) {
        alert("Error registering user: " + error.response.message);
        setAlertMessage({ type: "error", text: error.response.message });
      } else {
        alert("Error registering user");
        setAlertMessage({ type: "error", text: "Failed to register user" });
      }
    }
  };

  return (
    <div className="p-4">
      <form
        className="w-11/12 p-4 m-auto rounded bg-white shadow-md shadow-slate-200 lg:w-1/2 md:w-3/4"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="relative my-6">
          <input
            placeholder="your name"
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            {...register("name")}></input>
          <label
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            htmlFor="name">
            <span className="text-red-400">*</span> Name{" "}
            <FontAwesomeIcon icon={faUser} />
          </label>
          <p className="px-4 pt-1 text-red-400 text-sm">
            {errors.name?.message}
          </p>
        </div>
        <div className="relative my-6">
          <input
            placeholder="your email"
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            {...register("email")}></input>
          <label
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            htmlFor="email">
            <span className="text-red-400">*</span> Email{" "}
            <FontAwesomeIcon icon={faEnvelope} />
          </label>
          <p className="px-4 pt-1 text-red-400 text-sm">
            {errors.email?.message}
          </p>
        </div>
        <div className="relative my-6">
          <input
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            {...register("avatar.url")}></input>
          <label
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            htmlFor="avatar.url">
            Avatar Url
          </label>
          <p className="px-4 pt-1 text-red-400 text-sm">
            {errors?.avatar?.url?.message}
          </p>
        </div>
        <div className="relative my-6">
          <input
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            {...register("avatar.alt")}></input>
          <label
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            htmlFor="avatarAlt">
            Avatar Alt
          </label>
          <p className="px-4 pt-1 text-red-400 text-sm">
            {errors?.avatar?.alt?.message}
          </p>
        </div>
        <div className="rounded border border-slate-200relative flex flex-wrap items-center my-6">
          <label
            className="m-2 py-0.5 px-1 cursor-pointer pr-2 text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
            htmlFor="venueManager">
            Manager
          </label>
          <input
            className="peer relative h-4 w-8 cursor-pointer appearance-none rounded-lg bg-slate-300 transition-colors after:absolute after:top-0 after:left-0 after:h-4 after:w-4 after:rounded-full after:bg-slate-500 after:transition-all checked:bg-blue-200 checked:after:left-4 checked:after:bg-blue-500 hover:bg-slate-400 after:hover:bg-slate-600 checked:hover:bg-blue-300 checked:after:hover:bg-blue-600 focus:outline-none checked:focus:bg-blue-400 checked:after:focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-200 disabled:after:bg-slate-300"
            type="checkbox"
            {...register("venueManager")}></input>
          <p className="px-4 pt-1 text-red-400 text-sm">
            {errors.venueManager?.message}
          </p>
        </div>
        <div className="relative my-6">
          <input
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            type="password"
            {...register("password")}></input>
          <label
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            htmlFor="password">
            <span className="text-red-400">*</span>Password
          </label>
          <p className="px-4 pt-1 text-red-400 text-sm">
            {errors.password?.message}
          </p>
        </div>
        <div className="relative my-6">
          <input
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            type="password"
            {...register("confirmPassword")}></input>
          <label
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            htmlFor="confirmPassword">
            <span className="text-red-400">*</span>Confirm Password
          </label>
          <p className="px-4 pt-1 text-red-400 text-sm">
            {errors.confirmPassword?.message}
          </p>
        </div>
        <button
          className="flex uppercase h-12 w-4/5 m-auto items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-700 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-600 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
          type="submit">
          Submit
        </button>
        {alertMessage && (
          <div
            className={`alert mt-4 w-full px-4 py-3 text-sm border rounded border-emerald-100 bg-emerald-50 text-emerald-500 ${
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

export default RegisterForm;
