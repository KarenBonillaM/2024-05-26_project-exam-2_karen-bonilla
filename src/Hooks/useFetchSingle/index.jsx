import { useEffect, useState } from "react";
import { load } from "../../Shared/storage.js";

export function useFetchSingle(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // let { name } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);

        const token = await load("token");
        if (!token) {
          setIsError("token not found");
          return;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": "25333fa4-e617-4cfb-a41d-9fd9a59c9f28",
          },
        });
        const json = await response.json();

        setData(json.data);
      } catch (error) {
        setIsError(true);

        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [url]);

  return { data, isLoading, isError };
}
