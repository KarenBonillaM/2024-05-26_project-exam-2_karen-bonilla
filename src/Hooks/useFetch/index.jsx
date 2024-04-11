import { useState, useEffect } from "react";

function useFetch(url) {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsError(false);
        setIsLoading(true);

        const response = await fetch(url);
        const json = await response.json();
        setVenues(json.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { venues, isLoading, isError };
}

export default useFetch;
