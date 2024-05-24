import React from "react";
import ManagerProfile from "../../Components/Manager";
import UserProfile from "../../Components/User";
import { useFetchSingle } from "../../Hooks/useFetchSingle";
import { API_HOLIDAZE_PROFILES } from "../../Shared/apis";
import { useParams } from "react-router-dom";

function UserPage() {
  let { name } = useParams();
  console.log("Name:", name);

  const { data, isLoading, isError } = useFetchSingle(
    `${API_HOLIDAZE_PROFILES}/${name}`
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  console.log("Profile:", data);

  if (!data) {
    return <div>No profile data available</div>;
  }

  const isManager = data && data.venueManager;

  return (
    <main className="body-page p-8">
      {isManager ? <ManagerProfile /> : <UserProfile />}
    </main>
  );
}

export default UserPage;
