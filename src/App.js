import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import HomePage from "./Pages/HomePage";
import VenuePage from "./Pages/VenuePage";
import SignUpPage from "./Pages/SignUpPage";
import LogInPage from "./Pages/LogInPage";
import UserProfilePage from "./Pages/UserProfilePage";
import NewVenuePage from "./Pages/NewVenuePage";
import EditVenuePage from "./Pages/EditVenuePage";

function App() {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route path="/" element={<HomePage />} />
          <Route path="venue/:id" element={<VenuePage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LogInPage />} />
          <Route path="userprofile/:name" element={<UserProfilePage />} />
          <Route path="newVenue" element={< NewVenuePage />} />
          <Route path="editVenue/:id" element={< EditVenuePage />} />
       </Route>
      </Routes>
    </div>
    
  );
}

export default App;
