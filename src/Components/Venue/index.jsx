import { useFetchSingle } from "../../Hooks/useFetchSingle";
import { useParams } from "react-router-dom";
import { API_HOLIDAZE_VENUES } from "../../Shared/apis";

function Venue() {
  let { id } = useParams();
  const { data, isLoading, isError } = useFetchSingle(
    `${API_HOLIDAZE_VENUES}/${id}`
  );

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  console.log(data);

  return (
    <div>
      <div key={data.id}>
        <div>id: {data.name}</div>
        <img
          className="w-2/4"
          src={data.media[0].url}
          alt={data.media[0].alt}></img>
        <div>Price ${data.price}</div>
        <div>Rating {data.rating}</div>
        <p>{data.description}</p>
      </div>
    </div>
  );
}

export default Venue;
