import React from "react";
import { useFetchSingle } from "../../Hooks/useFetchSingle";
import { API_HOLIDAZE_PROFILES } from "../../Shared/apis";
import { useParams } from "react-router-dom";
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

  return (
    <div className="pt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-2">
      {data.map((venue) => (
        <div
          key={venue.id}
          className="venue-container p-4 overflow-hidden rounded shadow-md shadow-slate-200 flex flex-col bg-white text-slate-500">
          <div className="venue-image-container">
            <img
              src={
                venue.media && venue.media.length > 0 ? venue.media[0].url : ""
              }
              alt={
                venue.media && venue.media.length > 0 ? venue.media[0].alt : ""
              }
              className="object-cover h-48 w-full mb-4"></img>
          </div>
          <div className="venue-info-container flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-lg font-semibold">{venue.name}</h3>
              <p className="text-gray-500">{venue.location.city}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm">Price: {venue.price} SEK</p>
              <p className="text-sm">Max Guests: {venue.maxGuests}</p>
              <p className="text-sm">Rating: {venue.rating}</p>
              <p className="text-sm">Booking: {venue._count.bookings}</p>
            </div>
            <div className="m-auto">
              <NavLink to={`/editVenue/${venue.id}`}>
                <button className="w-full mt-2 inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-800 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none mb-2 lg:mb-0">
                  View details
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManagerVenues;
