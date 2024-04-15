import React from "react";
import useSearch from "../../Hooks/useSearch";

function SearchBar({ onSearch }) {
  const { query, handleInputChange, handleSubmit } = useSearch({ onSearch });

  return (
    <form onKeyUp={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
