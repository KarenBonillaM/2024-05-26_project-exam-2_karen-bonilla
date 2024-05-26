import React from "react";
import Profile from "../../Components/Profile";
import { NavLink } from "react-router-dom";
import ManagerVenues from "../../Components/ManagerVenues";
import EditUserForm from "../../Components/Forms/EditProfile";
import UserBookings from "../../Components/UserBookings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function ManagerProfile() {
  function onButtonClick() {
    const form = document.querySelector(".update-user-card");
    form.classList.toggle("hidden");
  }

  return (
    <section className="container mx-auto px-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4">
        <section className="user-profile-container col-span-1 md:col-span-3 lg:col-span-3">
          <div className="user-card h-fit overflow-hidden rounded bg-white text-center text-slate-500 shadow-md shadow-slate-200">
            <Profile />
            <div className="py-3">
              <button
                className="inline-flex h-8 m-auto w-9/12 items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-700 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                onClick={onButtonClick}>
                Edit Profile
              </button>
            </div>
            <section className="update-user-card hidden w-full h-full z-50 fixed top-0 -left-0 bg-black-background flex justify-center items-center text-white">
              <button
                onClick={onButtonClick}
                className="absolute top-12 right-16 text-3xl text-white font-bold">
                <FontAwesomeIcon icon={faX} />
              </button>
              <EditUserForm />
            </section>
          </div>
        </section>
        <section className="venues-manager-container col-span-1 md:col-span-5 lg:col-span-5 user-venues-container">
          <div className="grid justify-center">
            <h1 className="text-center pb-3 text-3xl">Your Venues</h1>
            <NavLink to="/newVenue">
              <button className="inline-flex h-8 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-800 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-700 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                Create a new Venue
              </button>
            </NavLink>
          </div>
          <ManagerVenues />
        </section>
        <section className="user-bookings-container col-span-1 md:col-span-4 lg:col-span-4">
          <UserBookings />
        </section>
      </div>
    </section>
  );
}

export default ManagerProfile;
