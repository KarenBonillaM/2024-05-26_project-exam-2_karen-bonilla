import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../../../Validation/register";
import { API_AUTH_REGISTER } from "../../../Shared/apis";

function RegisterForm() {
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

      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error registering user", error.message);
    }
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input {...register("name")}></input>
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email")}></input>
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="banner.url">Banner URL</label>
          <input {...register("banner.url")}></input>
          <p>{errors?.banner?.url?.message}</p>
        </div>
        <div>
          <label htmlFor="banner.alt">Banner Alt</label>
          <input {...register("banner.alt")}></input>
          <p>{errors?.banner?.alt?.message}</p>
        </div>
        <div>
          <label htmlFor="avatar.url">Avatar Url</label>
          <input {...register("avatar.url")}></input>
          <p>{errors?.avatar?.url?.message}</p>
        </div>
        <div>
          <label htmlFor="avatarAlt">Avatar Alt</label>
          <input {...register("avatar.alt")}></input>
          <p>{errors.avatarAlt?.message}</p>
        </div>
        <div>
          <label htmlFor="venueManager">Manager</label>
          <input type="checkbox" {...register("venueManager")}></input>
          <p>{errors.venueManager?.message}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" {...register("password")}></input>
          <p>{errors.password?.message}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegisterForm;
