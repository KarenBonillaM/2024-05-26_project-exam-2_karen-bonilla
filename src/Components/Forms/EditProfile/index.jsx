import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import editUserSchema from "../../../Validation/EditProfile";
import { API_HOLIDAZE_PROFILES } from "../../../Shared/apis";
import { load } from "../../../Shared/storage";
import { useParams } from "react-router-dom";
import { useFetchSingle } from "../../../Hooks/useFetchSingle";

function EditUserForm() {
  let { name } = useParams();
  const { data, isLoading, isError } = useFetchSingle(
    `${API_HOLIDAZE_PROFILES}/${name}`
  );
  const [alertMessage, setAlertMessage] = useState(null);

  console.log(name);
  console.log("Data:", data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({ resolver: yupResolver(editUserSchema) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const onSubmit = async (formData) => {
    try {
      const token = await load("token");
      console.log("Token:", token);
      if (!token) {
        console.log("token not found");
        return;
      }

      const response = await fetch(`${API_HOLIDAZE_PROFILES}/${name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": "25333fa4-e617-4cfb-a41d-9fd9a59c9f28",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User updated successfully!");
        setAlertMessage({ type: "success", text: "User updated successfully" });
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user", error.message);
      setAlertMessage({ type: "error", text: "Failed to update user" });
    } finally {
      console.log(formData);
    }
  };

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("email", data.email);
      setValue("bio", data.bio || "");
      setValue("avatar", data.avatar || {});
      setValue("banner", data.banner || {});
      setValue("venueManager", data.venueManager);
    }
  }, [data, setValue]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="p-4">
      <form
        className="w-96 p-4 m-auto rounded bg-white shadow-md shadow-slate-200"
        onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-black text-xl pb-5">Edit your profile</h2>
        <div className="relative my-6">
          <input
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            {...register("bio")}></input>
          <label
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            htmlFor="bio">
            Bio
          </label>
        </div>
        <div className="relative my-6">
          <input
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
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
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            {...register("avatar.alt")}></input>
          <label
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            htmlFor="avatarAlt">
            Avatar Alt
          </label>
          <p className="px-4 pt-1 text-red-400 text-sm">
            {errors.avatar?.alt.message}
          </p>
        </div>
        <div className="relative my-6">
          <input
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            {...register("banner.url")}></input>
          <label
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            htmlFor="banner.url">
            Banner URL
          </label>
          <p className="px-4 pt-1 text-red-400 text-sm">
            {errors?.banner?.url?.message}
          </p>
        </div>
        <div className="relative my-6">
          <input
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            {...register("banner.alt")}></input>
          <label
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            htmlFor="banner.alt">
            Banner Alt
          </label>
          <p className="px-4 pt-1 text-red-400 text-sm">
            {errors?.banner?.alt?.message}
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
        <button
          className="flex uppercase h-12 w-4/5 m-auto items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-700 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-600 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
          type="submit">
          Submit
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

export default EditUserForm;
