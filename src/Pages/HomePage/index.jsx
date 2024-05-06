import React from "react";
import Venues from "../../Components/Venues";

function HomePage() {
  return (
    <main className="body-page m-6 p-8">
      <h1>Welcome to Holidaze</h1>
      <p>Find your perfect holiday destination</p>
      <Venues />
    </main>
  );
}

export default HomePage;
