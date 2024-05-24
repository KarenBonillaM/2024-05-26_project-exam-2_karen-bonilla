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
    <main className="body-page pt-8">
      <div className="container mx-auto px-auto">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 lg:col-span-3">
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
          </div>
          <div className="col-span-4 lg:col-span-6 user-venues-container">
            <div className="grid justify-center">
              <NavLink to="/newVenue">
                <button className="inline-flex h-8 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-800 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-700 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                  Create a new Venue
                </button>
              </NavLink>
            </div>
            <ManagerVenues />
          </div>
          <div className="col-span-4 lg:col-span-3">
            <UserBookings />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ManagerProfile;
