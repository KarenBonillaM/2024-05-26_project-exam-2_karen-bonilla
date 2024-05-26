import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import editVenueSchema from "../../../Validation/EditVenue";
import { API_HOLIDAZE_VENUES } from "../../../Shared/apis";
import { load } from "../../../Shared/storage";
import { useParams } from "react-router-dom";
import { useFetchSingle } from "../../../Hooks/useFetchSingle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function EditVenueForm() {
  let { id } = useParams();
  const { data, isLoading, isError } = useFetchSingle(
    `${API_HOLIDAZE_VENUES}/${id}`
  );
  const [alertMessage, setAlertMessage] = useState(null);

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
      } else {
        setAlertMessage({
          type: "success",
          text: "Venue updated successfully",
        });
      }
    } catch (error) {
      console.error("Error updating venue", error.message);
      setAlertMessage({ type: "error", text: "Failed to update venue" });
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

  const handleEditFormClose = () => {
    const form = document.querySelector(".update-venue-form");
    form.classList.add("hidden");
  };

  return (
    <form
      className="mb-3 p-6 rounded bg-white shadow-md shadow-slate-200 lg:m-6 relative"
      onSubmit={handleSubmit(onSubmit)}>
      <button type="button" onClick={handleEditFormClose}>
        <FontAwesomeIcon
          className="pr-4 absolute right-1 text-xl top-5 font-extrabold cursor-pointer hover:text-blue-500"
          icon={faX}
        />
      </button>

      <h1 className="text-xl text-center pt-6">Edit your venue</h1>
      <div className="relative my-6">
        <input
          className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("name")}></input>
        <label
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
          peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          htmlFor="name">
          Venue Name
        </label>
      </div>
      <div className="relative my-6">
        <input
          className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("description")}></input>
        <label
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-s text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
          peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          htmlFor="description">
          Description
        </label>
      </div>
      <div>
        {fields.map((media, index) => (
          <div className="border rounded mb-5 p-1" key={media.id}>
            <div className="relative my-6">
              <input
                className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                {...register(`media.${index}.url`)}
              />
              <label
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
                peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                htmlFor="media.url">
                Photos Url
              </label>
            </div>
            <div className="relative mt-6 mb-1">
              <input
                className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                {...register(`media.${index}.alt`)}
              />
              <label
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
                peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                htmlFor="media.alt">
                Photos Alt
              </label>
            </div>
            <div className="flex justify-end">
              <button
                className="flex uppercase h-8 w-25 items-center whitespace-nowrap rounded bg-red-400 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-red-600 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
                type="button"
                onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          className="uppercase h-10 w-30 m-auto items-center whitespace-nowrap rounded bg-gray-400 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-500 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
          type="button"
          onClick={() => append({ url: "", alt: "" })}>
          Add Photo
        </button>
        {errors.media && <p>{errors.media.message}</p>}
      </div>
      <div className="relative my-6">
        <input
          className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("price")}></input>
        <label
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
          peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          htmlFor="price">
          Price
        </label>
      </div>
      <div className="relative my-6">
        <input
          className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("maxGuests")}></input>
        <label
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
          peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          htmlFor="maxGuests">
          Max Guests
        </label>
      </div>
      <div className="rounded border border-slate-200relative flex flex-wrap items-center my-6">
        <label
          className="m-2 py-0.5 px-1 cursor-pointer pr-2 text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
          htmlFor="meta.wifi">
          Wifi
        </label>
        <input
          className="peer relative h-4 w-8 cursor-pointer appearance-none rounded-lg bg-slate-300 transition-colors after:absolute after:top-0 after:left-0 after:h-4 after:w-4 after:rounded-full after:bg-slate-500 after:transition-all checked:bg-blue-200 checked:after:left-4 checked:after:bg-blue-500 hover:bg-slate-400 after:hover:bg-slate-600 checked:hover:bg-blue-300 checked:after:hover:bg-blue-600 focus:outline-none checked:focus:bg-blue-400 checked:after:focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-200 disabled:after:bg-slate-300"
          type="checkbox"
          {...register("meta.wifi")}></input>
      </div>
      <div className="rounded border border-slate-200relative flex flex-wrap items-center my-6">
        <label
          className="m-2 py-0.5 px-1 cursor-pointer pr-2 text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
          htmlFor="meta.parking">
          Parking
        </label>
        <input
          className="peer relative h-4 w-8 cursor-pointer appearance-none rounded-lg bg-slate-300 transition-colors after:absolute after:top-0 after:left-0 after:h-4 after:w-4 after:rounded-full after:bg-slate-500 after:transition-all checked:bg-blue-200 checked:after:left-4 checked:after:bg-blue-500 hover:bg-slate-400 after:hover:bg-slate-600 checked:hover:bg-blue-300 checked:after:hover:bg-blue-600 focus:outline-none checked:focus:bg-blue-400 checked:after:focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-200 disabled:after:bg-slate-300"
          type="checkbox"
          {...register("meta.parking")}></input>
      </div>
      <div className="rounded border border-slate-200relative flex flex-wrap items-center my-6">
        <label
          className="m-2 py-0.5 px-1 cursor-pointer pr-2 text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
          htmlFor="meta.breakfast">
          Breakfast
        </label>
        <input
          className="peer relative h-4 w-8 cursor-pointer appearance-none rounded-lg bg-slate-300 transition-colors after:absolute after:top-0 after:left-0 after:h-4 after:w-4 after:rounded-full after:bg-slate-500 after:transition-all checked:bg-blue-200 checked:after:left-4 checked:after:bg-blue-500 hover:bg-slate-400 after:hover:bg-slate-600 checked:hover:bg-blue-300 checked:after:hover:bg-blue-600 focus:outline-none checked:focus:bg-blue-400 checked:after:focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-200 disabled:after:bg-slate-300"
          type="checkbox"
          {...register("meta.breakfast")}></input>
      </div>
      <div className="rounded border border-slate-200relative flex flex-wrap items-center my-6">
        <label
          className="m-2 py-0.5 px-1 cursor-pointer pr-2 text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
          htmlFor="meta.pets">
          Pets
        </label>
        <input
          className="peer relative h-4 w-8 cursor-pointer appearance-none rounded-lg bg-slate-300 transition-colors after:absolute after:top-0 after:left-0 after:h-4 after:w-4 after:rounded-full after:bg-slate-500 after:transition-all checked:bg-blue-200 checked:after:left-4 checked:after:bg-blue-500 hover:bg-slate-400 after:hover:bg-slate-600 checked:hover:bg-blue-300 checked:after:hover:bg-blue-600 focus:outline-none checked:focus:bg-blue-400 checked:after:focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-200 disabled:after:bg-slate-300"
          type="checkbox"
          {...register("meta.pets")}></input>
      </div>
      <div className="relative my-6">
        <input
          className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("location.address")}></input>
        <label
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          htmlFor="location.address">
          Address
        </label>
      </div>
      <div className="relative my-6">
        <input
          className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("location.city")}></input>
        <label
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          htmlFor="location.city">
          City
        </label>
      </div>
      <div className="relative my-6">
        <input
          className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("location.zip")}></input>
        <label
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          htmlFor="location.zip">
          Zip
        </label>
      </div>
      <div className="relative my-6">
        <input
          className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("location.country")}></input>
        <label
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          htmlFor="location.country">
          Country
        </label>
      </div>
      <div className="relative my-6">
        <input
          className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("location.continent")}></input>
        <label
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
            peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          htmlFor="location.continent">
          Continent
        </label>
      </div>
      <button
        className="flex uppercase h-12 w-4/5 m-auto items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-700 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-600 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
        type="submit">
        Submit
      </button>
      {alertMessage && (
        <div
          className={`alert mt-4 w-full px-4 py-7 text-sm border rounded border-emerald-100 bg-emerald-50 text-emerald-500 ${
            alertMessage.type === "success"
              ? "bg-emerald-100 text-emerald-500"
              : "bg-red-50 text-red-500"
          }
        `}>
          {alertMessage.text}
        </div>
      )}
    </form>
  );
}

export default EditVenueForm;
