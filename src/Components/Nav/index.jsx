import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { load } from "../../Shared/storage";
import Logo from "../../images/logo.png";

function Nav() {
  const user = load("profile");
  const [isNavListOpen, setIsNavListOpen] = useState(false);

  const handleLogOut = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    window.location.href = "/login";
  };

  useEffect(() => {
    const closeNavList = () => {
      setIsNavListOpen(false);
    };

    document.addEventListener("click", closeNavList);

    return () => {
      document.removeEventListener("click", closeNavList);
    };
  }, []);

  function onButtonClick(event) {
    event.stopPropagation();
    setIsNavListOpen((prev) => !prev);
  }

  return (
    // <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
    <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
      <nav className="text-black text-xl flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700">
        <NavLink
          to="/"
          className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1">
          <img className="h-12 w-25 bg-blue-500" src={Logo} alt="Logo"></img>
        </NavLink>
        <section className=" nav-menu flex">
          <p className="hidden self-center pr-3 text-blue-600 text-base sm:block">
            Holidaze, your new home
          </p>
          <button
            className="self-center h-14 border rounded-full px-7 py-3 relative hover:shadow-md hover:shadow-slate-500 focus:outline-none focus-visible:outline-none sm:h-16"
            onClick={onButtonClick}>
            <FontAwesomeIcon className="pr-4" icon={faBars} />
            <FontAwesomeIcon className="hover:text-blue" icon={faUser} />
            <ul
              className={`w-52 text-base font-semibold h-fit shadow-md shadow-slate-500 border border-gray nav-list nav-links absolute top-16 right-0 bg-white rounded ${
                isNavListOpen ? "" : "hidden"
              }`}>
              {user ? (
                <>
                  <li className="flex items-stretch border-b hover:bg-gray-200">
                    <NavLink
                      to="/"
                      className="py-4 transition-colors duration-300 hover:text-blue-800 focus:text-blue-800 focus:outline-none focus-visible:outline-none lg:px-8 nav-link">
                      Venues
                    </NavLink>
                  </li>
                  <li className="flex items-stretch border-b hover:bg-gray-200">
                    <NavLink
                      to={`/user/${user.name}`}
                      className="py-4 transition-colors duration-300 hover:text-blue-800 focus:text-blue-800 focus:outline-none focus-visible:outline-none lg:px-8 nav-link">
                      Profile
                    </NavLink>
                  </li>
                  <li className="flex items-stretch border-b hover:bg-gray-200">
                    <div
                      className="py-4 transition-colors duration-300 hover:text-blue-500 focus:text-blue-800 focus:outline-none focus-visible:outline-none lg:px-8 nav-link"
                      onClick={handleLogOut}>
                      Logout
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-stretch border-b hover:bg-gray-200">
                    <NavLink
                      to="/signup"
                      className="py-4 transition-colors duration-300 hover:text-blue-500 focus:text-blue-800 focus:outline-none focus-visible:outline-none lg:px-8 nav-link">
                      Sign up
                    </NavLink>
                  </li>
                  <li className="flex items-stretch hover:bg-gray-200">
                    <NavLink
                      className="py-4 nav-link transition-colors duration-300 hover:text-blue-800 focus:text-blue-600 focus:outline-none focus-visible:outline-none lg:px-8"
                      to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </button>
        </section>
      </nav>
    </div>
  );
}

export default Nav;
