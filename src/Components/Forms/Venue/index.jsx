import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import venueSchema from "../../../Validation/Venue";
import { API_HOLIDAZE_VENUES } from "../../../Shared/apis";
import { load } from "../../../Shared/storage";

function VenueForm() {
  const [newVenue, setNewVenue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(venueSchema) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const token = await load("token");
      console.log("Token:", token);
      if (!token) {
        console.log("token not found");
        return;
      }

      const response = await fetch(API_HOLIDAZE_VENUES, {
        method: "POST",
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

      const data = await response.json();
      setNewVenue(data);
      console.log("Venue registered successfully!");
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.error("Error registering venue", error.message);
    }
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Venue Name</label>
          <input {...register("name")}></input>
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input {...register("description")}></input>
          <p>{errors.description?.message}</p>
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
          <p>{errors.price?.message}</p>
        </div>
        <div>
          <label htmlFor="maxGuests">Max Guests</label>
          <input {...register("maxGuests")}></input>
          <p>{errors.maxGuests?.message}</p>
        </div>
        <div>
          <label htmlFor="meta.wifi">Wifi</label>
          <input type="checkbox" {...register("meta.wifi")}></input>
          <p>{errors.meta?.wifi?.message}</p>
        </div>
        <div>
          <label htmlFor="meta.parking">Parking</label>
          <input type="checkbox" {...register("meta.parking")}></input>
          <p>{errors.meta?.parking?.message}</p>
        </div>
        <div>
          <label htmlFor="meta.breakfast">Breakfast</label>
          <input type="checkbox" {...register("meta.breakfast")}></input>
          <p>{errors.meta?.breakfast?.message}</p>
        </div>
        <div>
          <label htmlFor="meta.pets">Pets</label>
          <input type="checkbox" {...register("meta.pets")}></input>
          <p>{errors.meta?.pets?.message}</p>
        </div>
        <div>
          <label htmlFor="location.address">Address</label>
          <input {...register("location.address")}></input>
          <p>{errors.location?.address?.message}</p>
        </div>
        <div>
          <label htmlFor="location.city">City</label>
          <input {...register("location.city")}></input>
          <p>{errors.location?.city?.message}</p>
        </div>
        <div>
          <label htmlFor="location.zip">Zip</label>
          <input {...register("location.zip")}></input>
          <p>{errors.location?.zip?.message}</p>
        </div>
        <div>
          <label htmlFor="location.country">Country</label>
          <input {...register("location.country")}></input>
          <p>{errors.location?.country?.message}</p>
        </div>
        <div>
          <label htmlFor="location.continent">Continent</label>
          <input {...register("location.continent")}></input>
          <p>{errors.location?.continent?.message}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <img
          src={
            newVenue.media && newVenue.media.length > 0
              ? newVenue.media[0].url
              : ""
          }
          alt={
            newVenue.media && newVenue.media.length > 0
              ? newVenue.media[0].alt
              : ""
          }></img>
        <h2>{newVenue.name}</h2>
        <p>{newVenue.description}</p>
        <p>{newVenue.price}</p>
      </div>
    </div>
  );
}

export default VenueForm;
