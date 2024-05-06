import React from "react";
import loginSchema from "../../../Validation/login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as storage from "../../../Shared/storage.js";
import { API_AUTH_LOGIN } from "../../../Shared/apis.js";

function LoginForm() {
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

        console.log(user.data);

        const encodeName = encodeURIComponent(user.data.name);
        console.log(`Welcome ${encodeName}`);

        const redirectURL = `userprofile/${encodeName}`;

        window.location.href = redirectURL;
      }
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error logging in user", error.message);
    }
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email")} type="email"></input>
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input {...register("password")} type="password"></input>
          <p>{errors.password?.message}</p>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
