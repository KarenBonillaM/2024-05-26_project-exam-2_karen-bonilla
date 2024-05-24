import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../images/logo-footer.png";

function Footer() {
  return (
    <footer className="w-full text-slate-400">
      <div className="pt-16 pb-12 text-sm border-t border-slate-900 bg-slate-800">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-3 gap-6 md:grid-cols-6 lg:grid-cols-9">
            <nav className="col-span-2 md:col-span-4 lg:col-span-3">
              <h3 className="mb-6 text-base font-medium text-white">Product</h3>
              <ul>
                <li className="mb-2 leading-6">
                  <NavLink
                    to="/features"
                    className="transition-colors duration-300 hover:underline focus:text-emerald-600">
                    Features
                  </NavLink>
                </li>
              </ul>
            </nav>
            <nav className="col-span-2 md:col-span-4 lg:col-span-3">
              <h3 className="mb-6 text-base font-medium text-white">
                About Us
              </h3>
              <ul>
                <li className="mb-2 leading-6">
                  <NavLink
                    to="/about"
                    className="transition-colors duration-300 hover:underline focus:text-emerald-600">
                    About Us
                  </NavLink>
                </li>
              </ul>
            </nav>
            <nav className="col-span-2 md:col-span-4 lg:col-span-3">
              <h3 className="mb-6 text-base font-medium text-white">
                Get in touch
              </h3>
              <ul>
                <li className="mb-2 leading-6">
                  <NavLink
                    to="/contact"
                    className="transition-colors duration-300 hover:underline focus:text-emerald-600">
                    Contact
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <section className="py-4 text-sm border-t border-slate-900 bg-slate-700">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-4 gap-3 md:grid-cols-8 lg:grid-cols-12">
            <img
              className="h-6 w-6 justify-self-end"
              src={Logo}
              alt="logo"></img>
            <p className="col-span-2 md:col-span-4 lg:col-span-6">
              &copy; 2024 Holidaze. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
