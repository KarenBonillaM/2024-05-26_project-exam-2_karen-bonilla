import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import editVenueSchema from "../../../Validation/EditVenue";
import { API_HOLIDAZE_VENUES } from "../../../Shared/apis";
import { load } from "../../../Shared/storage";
import { useParams } from "react-router-dom";
import { useFetchSingle } from "../../../Hooks/useFetchSingle";

function EditVenueForm() {
  let { id } = useParams();
  const { data, isLoading, isError } = useFetchSingle(
    `${API_HOLIDAZE_VENUES}/${id}`
  );

  console.log(id);
  console.log("Data:", data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({ resolver: yupResolver(editVenueSchema) });

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

      const response = await fetch(`${API_HOLIDAZE_VENUES}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": "25333fa4-e617-4cfb-a41d-9fd9a59c9f28",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register new venue");
      }

      console.log("Venue updated successfully!");
    } catch (error) {
      console.error("Error updating venue", error.message);
    } finally {
      console.log(formData);
    }
  };

  useEffect(() => {
    if (data) {
      setValue("name", data.name || "");
      setValue("description", data.description || "");
      setValue("price", data.price || "");
      setValue("maxGuests", data.maxGuests || "");
      setValue("meta.wifi", data.meta.wifi || false);
      setValue("meta.parking", data.meta.parking || false);
      setValue("meta.breakfast", data.meta.breakfast || false);
      setValue("meta.pets", data.meta.pets || false);
      setValue("location.address", data.location.address || "");
      setValue("location.city", data.location.city || "");
      setValue("location.zip", data.location.zip || "");
      setValue("location.country", data.location.country);
      setValue("location.continent", data.location.continent || "");
      setValue("media", data.media || []);
    }
  }, [data, setValue]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="w-2/4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Venue Name</label>
          <input {...register("name")}></input>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input {...register("description")}></input>
        </div>
        <div>
          <label htmlFor="media">Photos Url</label>
          {fields.map((media, index) => (
            <div key={media.id}>
              <input {...register(`media.${index}.url`)} />
              <input {...register(`media.${index}.alt`)} />
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => append({ url: "", alt: "" })}>
            Add Photo
          </button>
          {errors.media && <p>{errors.media.message}</p>}
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input {...register("price")}></input>
        </div>
        <div>
          <label htmlFor="maxGuests">Max Guests</label>
          <input {...register("maxGuests")}></input>
        </div>
        <div>
          <label htmlFor="meta.wifi">Wifi</label>
          <input type="checkbox" {...register("meta.wifi")}></input>
        </div>
        <div>
          <label htmlFor="meta.parking">Parking</label>
          <input type="checkbox" {...register("meta.parking")}></input>
        </div>
        <div>
          <label htmlFor="meta.breakfast">Breakfast</label>
          <input type="checkbox" {...register("meta.breakfast")}></input>
        </div>
        <div>
          <label htmlFor="meta.pets">Pets</label>
          <input type="checkbox" {...register("meta.pets")}></input>
        </div>
        <div>
          <label htmlFor="location.address">Address</label>
          <input {...register("location.address")}></input>
        </div>
        <div>
          <label htmlFor="location.city">City</label>
          <input {...register("location.city")}></input>
        </div>
        <div>
          <label htmlFor="location.zip">Zip</label>
          <input {...register("location.zip")}></input>
        </div>
        <div>
          <label htmlFor="location.country">Country</label>
          <input {...register("location.country")}></input>
        </div>
        <div>
          <label htmlFor="location.continent">Continent</label>
          <input {...register("location.continent")}></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditVenueForm;
