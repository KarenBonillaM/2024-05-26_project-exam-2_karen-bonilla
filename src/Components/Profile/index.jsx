import React from "react";
import { useFetchSingle } from "../../Hooks/useFetchSingle";
import ErrorBoundary from "../ErrorBoundary";
import { useParams } from "react-router-dom";
import { API_HOLIDAZE_PROFILES } from "../../Shared/apis";

function Profile() {
  let { name } = useParams();
  const { data, isLoading, isError } = useFetchSingle(
    `${API_HOLIDAZE_PROFILES}/${name}`
  );
  console.log("Profile:", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  if (!data) {
    return <div>No profile data available</div>;
  }
  return (
    <div>
      <img src={data.avatar?.url} alt={data.avatar?.alt}></img>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
      <div>{data.venueManager ? <p>Manager</p> : <p>User</p>}</div>
      <div>
        <p>Bookings: {data._count.bookings}</p>
        <p>Venues: {data._count.venues}</p>
      </div>
    </div>
  );
}

const ProfileWithBoundary = () => {
  return (
    <ErrorBoundary>
      <Profile />
    </ErrorBoundary>
  );
};

export default ProfileWithBoundary;
