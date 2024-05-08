import React from "react";
import Profile from "../../Components/Profile";
import { NavLink } from "react-router-dom";
import ManagerVenues from "../../Components/ManagerVenues";
import EditUserForm from "../../Components/Forms/EditProfile";

function UserProfilePage() {
  function onButtonClick() {
    const form = document.querySelector(".update-user-card");
    form.classList.toggle("hidden");
  }

  return (
    <main className="body-page">
      <h1>User Profile</h1>
      <Profile />
      <button onClick={onButtonClick}>Edit Profile</button>
      <div className="update-user-card hidden">
        <EditUserForm />
      </div>

      <NavLink to="/newVenue">Create a new Venue</NavLink>
      <ManagerVenues />
    </main>
  );
}

export default UserProfilePage;
