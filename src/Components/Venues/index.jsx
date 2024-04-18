import React, { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import { API_HOLIDAZE_VENUES } from "../../Shared/apis";
import "./index.css";
import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";

function Venues() {
  const { venues } = useFetch(`${API_HOLIDAZE_VENUES}`);

  console.log(venues);

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    const results = venues.filter((venue) =>
      venue.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    setSearchResults(results);
  };

  const venuesToDisplay = searchResults.length > 0 ? searchResults : venues;

  return (
    <div>
      <div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="grid grid-cols-4 gap-6">
        {venuesToDisplay.map((venue) => (
          <div
            key={venue.id}
            className="card-venue overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
            <img
              src={venue.media[0].url}
              alt={venue.media[0].alt}
              className="aspect-video w-full"
            />
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-medium text-slate-700">
                  {venue.name}
                </h2>
                <p className="text-slate-400">${venue.price}</p>
              </div>
            </div>
            <div className="flex justify-end p-6 pt-0">
              <Link to={`/venue/${venue.id}`}>
                <button className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-800 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-700 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                  <span>Book now!</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Venues;
