import React from "react";
import Venue from "../../Components/Venue";
import EditVenueForm from "../../Components/Forms/EditVenue";

function EditVenuePage() {
  return (
    <main className="body-page flex">
      <Venue />
      <EditVenueForm />
    </main>
  );
}

export default EditVenuePage;
