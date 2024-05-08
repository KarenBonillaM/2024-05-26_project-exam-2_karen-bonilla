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

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      console.log("User updated successfully!");
    } catch (error) {
      console.error("Error updating user", error.message);
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="bio">Bio</label>
          <input {...register("bio")}></input>
        </div>
        <div>
          <label htmlFor="avatar.url">Avatar Url</label>
          <input {...register("avatar.url")}></input>
          <p>{errors?.avatar?.url?.message}</p>
        </div>
        <div>
          <label htmlFor="avatarAlt">Avatar Alt</label>
          <input {...register("avatar.alt")}></input>
          <p>{errors.avatar?.alt.message}</p>
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
          <label htmlFor="venueManager">Manager</label>
          <input type="checkbox" {...register("venueManager")}></input>
          <p>{errors.venueManager?.message}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditUserForm;
