import React from "react";
import Profile from "../../Components/Profile";
import EditUserForm from "../../Components/Forms/EditProfile";
import UserBookings from "../../Components/UserBookings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function UserProfile() {
  function onButtonClick() {
    const form = document.querySelector(".update-user-card");
    form.classList.toggle("hidden");
  }

  return (
    <div class="container px-6 m-auto">
      <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-4">
          <section className="col-span-4 user-card h-fit overflow-hidden rounded bg-white text-center text-slate-500 shadow-md shadow-slate-200 lg:w-9/12">
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
          </section>
        </div>
        <section class="col-span-4  lg:col-span-8">
          <UserBookings />
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
