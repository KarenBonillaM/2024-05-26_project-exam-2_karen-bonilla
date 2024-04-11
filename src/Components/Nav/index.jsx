import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className="nav-link">
            Holidaze
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" className="nav-link">
            Sign up
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </li>
      </ul>
      <FontAwesomeIcon icon={faUser} />
    </nav>
  );
}

export default Nav;
