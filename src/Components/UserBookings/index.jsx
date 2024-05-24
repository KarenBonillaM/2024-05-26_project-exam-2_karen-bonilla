import React from "react";
import { useFetchSingle } from "../../Hooks/useFetchSingle";
import { API_HOLIDAZE_PROFILES } from "../../Shared/apis";
import { API_HOLIDAZE_BOOKINGS } from "../../Shared/apis";
import { useParams } from "react-router-dom";
import { load } from "../../Shared/storage";

function UserBookings() {
  let { name } = useParams();
  const { data, isLoading, isError } = useFetchSingle(
    `${API_HOLIDAZE_PROFILES}/${name}?_bookings=true`
  );

  const bookings = data ? data.bookings : [];

  console.log("Bookings:", bookings);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  async function onButtonClick(id) {
    console.log("Button clicked for booking with id:", id);
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

      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }
      alert("Booking deleted");
    } catch (error) {
      console.error("Error deleting booking", error.message);
    }
  }

  // Function to format ISO date to "DD-Month-YYYY" format
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <h2 className="text-center">Upcoming bookings</h2>
      <ul className="divide-y divide-slate-100">
        {bookings.map((booking) => (
          <li key={booking.id} className="flex items-center gap-4 px-4 py-3">
            <div className="flex shrink-0 items-center self-center">
              <img
                className="w-14 rounded"
                src={booking.venue.media[0].url}
                alt={booking.venue.media[0].alt}></img>
            </div>
            <div className="flex min-h-[2rem] min-w-0 flex-1 flex-col items-start justify-center gap-0 text-sm">
              <h3 className="font-bold">{booking.venue.name}</h3>
              <div>From: {formatDate(booking.dateFrom)}</div>
              <div>To: {formatDate(booking.dateTo)}</div>
              <div>Guests: {booking.guests}</div>
            </div>
            <button
              className="inline-flex h-6 w-14 items-center justify-center gap-2 whitespace-nowrap rounded bg-red-400 px-5 text-xs font-medium tracking-wide text-white transition duration-300 hover:bg-red-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed
              disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
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
