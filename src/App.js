import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import HomePage from "./Pages/HomePage";
import VenuePage from "./Pages/VenuePage";
import SignUpPage from "./Pages/SignUpPage";
import LogInPage from "./Pages/LogInPage";
import UserPage from "./Pages/UserPage";
import NewVenuePage from "./Pages/NewVenuePage";
import EditVenuePage from "./Pages/EditVenuePage";
import FeaturesPage from "./Pages/FeaturesPage";
import ContactPage from "./Pages/ContactPage";
import AboutUsPage from "./Pages/AboutUsPage";

function App() {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route path="/" element={<HomePage />} />
          <Route path="venue/:id" element={<VenuePage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LogInPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="user/:name" element={<UserPage />} />
          <Route path="newVenue" element={< NewVenuePage />} />
          <Route path="editVenue/:id" element={< EditVenuePage />} />
       </Route>
      </Routes>
    </div>
    
  );
}

export default App;
