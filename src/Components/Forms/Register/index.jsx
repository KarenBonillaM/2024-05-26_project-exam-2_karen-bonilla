import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../../../Validation/register";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (formData) => {
    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
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
          <label htmlFor="bannerUrl">Banner URL</label>
          <input {...register("bannerUrl")}></input>
          <p>{errors.bannerUrl?.message}</p>
        </div>
        <div>
          <label htmlFor="bannerAlt">Banner Alt</label>
          <input {...register("bannerAlt")}></input>
          <p>{errors.bannerAlt?.message}</p>
        </div>
        <div>
          <label htmlFor="avatarUrl">Avatar Url</label>
          <input {...register("avatarUrl")}></input>
          <p>{errors.avatarUrl?.message}</p>
        </div>
        <div>
          <label htmlFor="avatarAlt">Avatar Alt</label>
          <input {...register("avatarAlt")}></input>
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
