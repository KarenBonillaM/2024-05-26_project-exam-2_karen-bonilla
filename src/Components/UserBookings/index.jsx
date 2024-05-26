import React, { useState } from "react";
import { useFetchSingle } from "../../Hooks/useFetchSingle";
import {
  API_HOLIDAZE_PROFILES,
  API_HOLIDAZE_BOOKINGS,
} from "../../Shared/apis";
import { useParams } from "react-router-dom";
import { load } from "../../Shared/storage";

function UserBookings() {
  let { name } = useParams();
  const { data, isLoading, isError } = useFetchSingle(
    `${API_HOLIDAZE_PROFILES}/${name}?_bookings=true`
  );

  const bookings = data ? data.bookings : [];

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  async function onButtonClick(id) {
    const token = await load("token");

    try {
      const response = await fetch(`${API_HOLIDAZE_BOOKINGS}/${id}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": "25333fa4-e617-4cfb-a41d-9fd9a59c9f28",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Booking deleted");
      } else {
        throw new Error("Failed to delete booking");
      }
    } catch {
      alert("Error deleting booking");
    }
  }

  // Function to format ISO date to "DD-Month-YYYY" format
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="overflow-hidden p-4 rounded bg-white shadow-md">
      <h2 className="text-center text-xl font-semibold mb-4">
        Upcoming bookings
      </h2>
      <ul className="divide-y divide-slate-100">
        {bookings.map((booking) => (
          <li
            key={booking.id}
            className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-3">
            <div className="flex shrink-0 w-full md:w-24">
              <img
                className="w-full h-24 object-cover rounded"
                src={booking.venue.media[0].url}
                alt={booking.venue.media[0].alt}></img>
            </div>
            <div className="flex-1 min-w-0 text-sm">
              <h3 className="font-bold text-lg">{booking.venue.name}</h3>
              <div className="mt-1">From: {formatDate(booking.dateFrom)}</div>
              <div>To: {formatDate(booking.dateTo)}</div>
              <div>Guests: {booking.guests}</div>
            </div>
            <button
              className="inline-flex h-8 w-full md:w-auto items-center justify-center gap-2 whitespace-nowrap rounded bg-red-400 px-4 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-red-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-emerald-300 disabled:shadow-none"
              onClick={() => onButtonClick(booking.id)}>
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserBookings;
