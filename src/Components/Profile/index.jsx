import React from "react";
import { useFetchSingle } from "../../Hooks/useFetchSingle";
import ErrorBoundary from "../ErrorBoundary";
import { useParams } from "react-router-dom";
import { API_HOLIDAZE_PROFILES } from "../../Shared/apis";

function Profile() {
  let { name } = useParams();
  console.log("Name:", name);
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
    <div className="">
      <figure className="pt-6 pb-0">
        <span className="relative inline-flex h-24 w-24 items-center justify-center rounded-full text-white">
          <img
            src={data.avatar?.url}
            alt={data.avatar?.alt}
            className="w-24 h-24 max-w-full rounded-full"></img>
        </span>
      </figure>
      <div className="p-6">
        <header className="mb-1">
          <h2 className="text-xl font-medium text-slate-700">{data.name}</h2>
          <div className=" text-slate-400">
            {data.venueManager ? <div>Manager</div> : <div>User</div>}
          </div>
        </header>
      </div>
      <div className="text-left p-3 pt-0">
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
