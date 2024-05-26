import React, { useState } from "react";
import { useFetchSingle } from "../../Hooks/useFetchSingle";
import { useParams } from "react-router-dom";
import { API_HOLIDAZE_VENUES } from "../../Shared/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faCar,
  faUtensils,
  faPaw,
  faStar,
  faCheck,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import House from "../../images/house.jpg";
import { load } from "../../Shared/storage";

function VenueEdit() {
  let { id } = useParams();
  const { data, isLoading, isError } = useFetchSingle(
    `${API_HOLIDAZE_VENUES}/${id}?_bookings=true`
  );
  const [alertMessage, setAlertMessage] = useState(null);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  const bookingsExist = data._count?.bookings > 0;

  async function onButtonClick(id) {
    const token = await load("token");

    try {
      const response = await fetch(`${API_HOLIDAZE_VENUES}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": "25333fa4-e617-4cfb-a41d-9fd9a59c9f28",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setAlertMessage({ type: "success", text: "Venue was deleted" });
      } else {
        throw new Error("Failed to delete venue");
      }
    } catch (error) {
      console.error("Error deleting venue", error.message);
      setAlertMessage({ type: "error", text: "Failed to delete venue" });
    }
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div
      key={data.id}
      className="venue-container container m-auto py-6 lg:px-20">
      <section className="section-image-venue">
        <div className="venue-image-container">
          <img
            className="h-96 w-full object-fill rounded-lg"
            src={
              data.media && data.media.length > 0 ? data.media[0].url : House
            }
            alt={
              data.media && data.media.length > 0 ? data.media[0].alt : "house"
            }></img>
        </div>
      </section>
      <section className="section-venue-booking grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 pt-8">
        <div className="venue-info-container col-span-4 lg:col-span-12">
          <div>
            <h1 className="text-3xl py-4">{data.name}</h1>
            <ul className="divide-y divide-slate-100 border-b-2 border-red">
              <li className="flex items-start gap-4 px-4 py-3">
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                  <p className="text-base text-slate-700 ">
                    Price: {data.price} SEK
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4 px-4 py-3">
                <FontAwesomeIcon icon={faStar} />
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center text-base text-slate-700">
                  {data.rating}
                </div>
              </li>
              <li className="flex items-start gap-4 px-4 py-3">
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                  <div className="text-base text-slate-700">
                    Max guests: {data.maxGuests}
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4 px-4 py-3">
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                  <p className="text-base text-slate-700">{data.description}</p>
                </div>
              </li>
              <li className="flex items-start gap-4 px-4 py-3">
                <FontAwesomeIcon icon={faLocationDot} />
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center text-base text-slate-700">
                  {data.location.address}
                </div>
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center text-base text-slate-700">
                  {data.location.city}
                </div>
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center text-base text-slate-700">
                  {data.location.country}
                </div>
              </li>
              <li className="flex items-start gap-4 px-4 py-3">
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                  <div className="text-base text-slate-700">
                    Bookings: {data._count.bookings}
                  </div>
                </div>
              </li>
            </ul>
            <section>
              <h2 className="text-xl pt-8 pb-3">Bookings</h2>
              {bookingsExist &&
                data.bookings &&
                data.bookings.map((booking) => (
                  <ul
                    key={booking.id}
                    className="divide-y divide-slate-100 border-b-2 border-red">
                    <li className="flex items-start gap-4 px-4 py-3">
                      <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center text-base text-slate-700">
                        <p>Booking date from: {formatDate(booking.dateFrom)}</p>
                        <p>Booking date to: {formatDate(booking.dateTo)}</p>
                        <p>Guests: {booking.guests}</p>
                        <p>Guest name: {booking.customer.name}</p>
                        <p>Guest email: {booking.customer.email}</p>
                      </div>
                    </li>
                  </ul>
                ))}
            </section>

            <ul className="divide-y divide-slate-100 pt-8">
              <h2 className="text-xl pb-3">Amenities</h2>
              <li className="flex items-center gap-4 px-4 py-3">
                <div className="flex items-center self-center text-blue-500">
                  <FontAwesomeIcon className="h-6 w-6" icon={faWifi} />
                </div>
                <div className="flex min-h-[2rem] flex-1 flex-col items-start justify-center gap-0 overflow-hidden">
                  <label
                    className="w-full cursor-pointer truncate text-base text-slate-700"
                    htmlFor="meta.wifi">
                    Wifi
                  </label>
                </div>
                <div className="flex items-center self-center">
                  <div className="relative flex flex-wrap items-center">
                    <input
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-white transition-colors checked:border-blue-500 checked:bg-blue-500 checked:hover:border-blue-600 checked:hover:bg-blue-600 focus:outline-none checked:focus:border-blue-700 checked:focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                      type="checkbox"
                      checked={data.meta.wifi}
                      readOnly
                    />
                    <FontAwesomeIcon
                      className="text-white pointer-events-none absolute top-0 left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                      icon={faCheck}
                    />
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-4 px-4 py-3">
                <div className="flex items-center self-center text-blue-500">
                  <FontAwesomeIcon className="h-6 w-6" icon={faCar} />
                </div>
                <div className="flex min-h-[2rem] flex-1 flex-col items-start justify-center gap-0 overflow-hidden">
                  <label
                    className="w-full cursor-pointer truncate text-base text-slate-700"
                    htmlFor="meta.parking">
                    Parking
                  </label>
                </div>
                <div className="flex items-center self-center">
                  <div className="relative flex flex-wrap items-center">
                    <input
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-white transition-colors checked:border-blue-500 checked:bg-blue-500 checked:hover:border-blue-600 checked:hover:bg-blue-600 focus:outline-none checked:focus:border-blue-700 checked:focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                      type="checkbox"
                      checked={data.meta.parking}
                      readOnly
                    />
                    <FontAwesomeIcon
                      className="text-white pointer-events-none absolute top-0 left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                      icon={faCheck}
                    />
                  </div>
                </div>
              </li>

              <li className="flex items-center gap-4 px-4 py-3">
                <div className="flex items-center self-center text-blue-500">
                  <FontAwesomeIcon className="h-6 w-6" icon={faUtensils} />
                </div>
                <div className="flex min-h-[2rem] flex-1 flex-col items-start justify-center gap-0 overflow-hidden">
                  <label
                    className="w-full cursor-pointer truncate text-base text-slate-700"
                    htmlFor="meta.breakfast">
                    Breakfast
                  </label>
                </div>
                <div className="flex items-center self-center">
                  <div className="relative flex flex-wrap items-center">
                    <input
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-white transition-colors checked:border-blue-500 checked:bg-blue-500 checked:hover:border-blue-600 checked:hover:bg-blue-600 focus:outline-none checked:focus:border-blue-700 checked:focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                      type="checkbox"
                      checked={data.meta.breakfast}
                      readOnly
                    />
                    <FontAwesomeIcon
                      className="text-white pointer-events-none absolute top-0 left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                      icon={faCheck}
                    />
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-4 px-4 py-3">
                <div className="flex items-center self-center text-blue-500">
                  <FontAwesomeIcon className="h-6 w-6" icon={faPaw} />
                </div>
                <div className="flex min-h-[2rem] flex-1 flex-col items-start justify-center gap-0 overflow-hidden">
                  <label
                    className="w-full cursor-pointer truncate text-base text-slate-700"
                    htmlFor="meta.pets">
                    Pets
                  </label>
                </div>
                <div className="flex items-center self-center">
                  <div className="relative flex flex-wrap items-center">
                    <input
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-white transition-colors checked:border-blue-500 checked:bg-blue-500 checked:hover:border-blue-600 checked:hover:bg-blue-600 focus:outline-none checked:focus:border-blue-700 checked:focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                      type="checkbox"
                      checked={data.meta.pets}
                      readOnly
                    />
                    <FontAwesomeIcon
                      className="text-white pointer-events-none absolute top-0 left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                      icon={faCheck}
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={() => onButtonClick(data.id)}
          className="inline-flex h-8 w-fit items-center justify-center gap-2 whitespace-nowrap rounded bg-red-400 px-2 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-red-600 focus:bg-red-800 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none">
          Delete Venue
        </button>
      </section>
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
    </div>
  );
}

export default VenueEdit;
