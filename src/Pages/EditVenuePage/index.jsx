import React from "react";
import EditVenueForm from "../../Components/Forms/EditVenue";
import VenueEdit from "../../Components/VenueEdit";

function EditVenuePage() {
  function onButtonClick() {
    const form = document.querySelector(".update-venue-form");
    form.classList.remove("hidden");
  }

  return (
    <main className="grow flex lg:p-8">
      <div class="container px-6 m-auto">
        <div class="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
          <section class="mb-3 col-span-4 lg:col-span-7">
            <VenueEdit />
            <button
              className="flex uppercase h-12 w-2/4 m-auto items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-700 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-600 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
              onClick={onButtonClick}>
              Edit Venue
            </button>
          </section>
          <section class="hidden update-venue-form col-span-4 lg:col-span-5">
            <EditVenueForm />
          </section>
        </div>
      </div>
    </main>
  );
}

export default EditVenuePage;
