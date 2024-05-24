import React from "react";
import { useFetchSingle } from "../../Hooks/useFetchSingle";
import { API_HOLIDAZE_PROFILES } from "../../Shared/apis";
import { useParams } from "react-router-dom";
import { API_HOLIDAZE_VENUES } from "../../Shared/apis";
import { load } from "../../Shared/storage";
import { NavLink } from "react-router-dom";

function ManagerVenues() {
  let { name } = useParams();
  const { data, isLoading, isError } = useFetchSingle(
    `${API_HOLIDAZE_PROFILES}/${name}/venues`
  );

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  console.log(data);

  async function onButtonClick(id) {
    console.log("Button clicked for venue with id:", id);
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

      if (!response.ok) {
        throw new Error("Failed to delete venue");
      }
    } catch (error) {
      console.error("Error deleting venue", error.message);
    }
  }

  return (
    <div className="body-page py-8">
      {data.map((venue) => (
        <div
          key={venue.id}
          className="venue-container overflow-hidden rounded shadow-md shadow-slate-200 flex">
          <div className="venue-image-container w-6/12">
            <img
              src={
                venue.media && venue.media.length > 0 ? venue.media[0].url : ""
              }
              alt={
                venue.media && venue.media.length > 0 ? venue.media[0].alt : ""
              }
              className="w-52"></img>
          </div>
          <div className="venue-info-container grid">
            <div>
              <h3 className="text-center">{venue.name}</h3>
              <p>{venue.location.city}</p>
            </div>
            <div>
              <p>Price: {venue.price} SEK</p>
              <p>Max Guests: {venue.maxGuests}</p>
              <p>Rating: {venue.rating}</p>
              <p>Booking: {venue._count.bookings}</p>
            </div>
            <div className="venue-buttons-container flex self-end pb-3">
              <NavLink to={`/editVenue/${venue.id}`}>
                <button className="inline-flex h-8 w-3/4 items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-800 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                  View details
                </button>
              </NavLink>
              <button
                onClick={() => onButtonClick(venue.id)}
                className="inline-flex h-8 w-3/4 items-center justify-center gap-2 whitespace-nowrap rounded bg-red-400 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-red-600 focus:bg-red-800 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none">
                Delete Venue
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManagerVenues;
