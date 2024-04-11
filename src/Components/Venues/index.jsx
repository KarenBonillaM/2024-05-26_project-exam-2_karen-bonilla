import React from "react";
import useFetch from "../../Hooks/useFetch";
import { API_HOLIDAZE } from "../../Shared/apis";
import "./index.css";

function Venues() {
  const { venues, isError, isLoading } = useFetch(`${API_HOLIDAZE}`);

  console.log(venues);

  return (
    <div>
      {venues.map((venue) => (
        <div key={venue.id} className="card-venue">
          <img src={venue.media[0].url} alt={venue.media[0].alt} />
          <h2>{venue.name}</h2>
          <p>${venue.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Venues;
