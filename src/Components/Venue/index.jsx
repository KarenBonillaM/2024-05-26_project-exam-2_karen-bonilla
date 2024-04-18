import { useFetchVenue } from "../../Hooks/useFetchVenue";

function Venue() {
  const { venue, isLoading, isError } = useFetchVenue();

  if (isLoading || !venue) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  console.log(venue);

  return (
    <div>
      <div key={venue.id}>
        <div>id: {venue.name}</div>
        <img
          className="w-2/4"
          src={venue.media[0].url}
          alt={venue.media[0].alt}></img>
        <div>Price ${venue.price}</div>
        <div>Rating {venue.rating}</div>
        <p>{venue.description}</p>
      </div>
    </div>
  );
}

export default Venue;
