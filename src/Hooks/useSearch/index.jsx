import { useState } from "react";

function useSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query.trim());
  };

  return {
    query,
    handleInputChange,
    handleSubmit,
  };
}

export default useSearch;
