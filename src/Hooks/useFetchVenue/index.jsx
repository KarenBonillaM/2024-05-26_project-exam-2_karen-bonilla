import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_HOLIDAZE_VENUES } from "../../Shared/apis";

export function useFetchVenue() {
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    async function getData(url) {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(url);
        const json = await response.json();

        setVenue(json.data);
      } catch (error) {
        setIsError(true);

        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getData(`${API_HOLIDAZE_VENUES}/${id}`);
  }, [id]);

  return { venue, isLoading, isError };
}
