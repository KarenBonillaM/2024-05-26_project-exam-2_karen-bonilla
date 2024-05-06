import React from "react";
import Profile from "../../Components/Profile";
import { NavLink } from "react-router-dom";
import ManagerVenues from "../../Components/ManagerVenues";

function UserProfilePage() {
  return (
    <main className="body-page">
      <h1>User Profile</h1>
      <Profile />
      <NavLink to="/newVenue">Create a new Venue</NavLink>
      <ManagerVenues />
    </main>
  );
}

export default UserProfilePage;
