import React from "react";
import useSearch from "../../Hooks/useSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ onSearch }) {
  const { query, handleInputChange, handleSubmit } = useSearch({ onSearch });

  return (
    <form onKeyUp={handleSubmit} className="search-bar flex justify-center">
      <div className="flex justify-between h-14 w-1/2 p-2 border border-gray-300 shadow-md rounded-md shadow-slate-200">
        <input
          className="w-full p-2 rounded-l-md border-none focus:outline-none"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="p-1 bg-blue-600 w-10 rounded-full text-white hover:bg-blue-500">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
