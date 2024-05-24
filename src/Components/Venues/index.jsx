import React, { useState } from "react";
import Slider from "react-slick";
import useFetch from "../../Hooks/useFetchArray";
import { API_HOLIDAZE_VENUES } from "../../Shared/apis";
import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import House from "../../images/house.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi, faUtensils, faPaw } from "@fortawesome/free-solid-svg-icons";

function Venues() {
  const { venues } = useFetch(`${API_HOLIDAZE_VENUES}`);

  console.log(venues);

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    const results = venues.filter((venue) =>
      venue.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    setSearchResults(results);
  };

  const venuesToDisplay = searchResults.length > 0 ? searchResults : venues;

  const SliderArrow = ({ className, style, onClick, position }) => {
    const arrowStyle =
      position === "next"
        ? { ...style, right: "10px" }
        : { ...style, left: "10px", zIndex: "1" };

    return <div className={className} style={arrowStyle} onClick={onClick} />;
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidersToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderArrow position="next" />,
    prevArrow: <SliderArrow position="prev" />,
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <section className="home-page-bio  my-8 m-auto mx-5">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 p-4 px-5 py-8 bg-blue-500 text-white h-fit rounded-xl">
          <div className="col-span-4 lg:col-span-3 text-xl self-center">
            <h1>Welcome to Holidaze</h1>
            <p>Find your perfect holiday destination</p>
          </div>
          <div className="col-span-4 lg:col-span-3 flex items-center bg-blue-800 rounded-lg px-5 bg-opacity-70 py-8">
            <FontAwesomeIcon className="pr-5 text-4xl" icon={faUtensils} />
            <p>Find beautiful places with breakfast included</p>
          </div>
          <div className="col-span-4 lg:col-span-3 flex items-center bg-blue-800 rounded-lg px-5 bg-opacity-80 py-8">
            <FontAwesomeIcon className="pr-5 text-4xl" icon={faPaw} />
            <p>Have a blast with your best friend</p>
          </div>
          <div className="col-span-4 lg:col-span-3 flex items-center bg-blue-800 rounded-lg px-5 bg-opacity-80 py-8">
            <FontAwesomeIcon className="pr-5 text-4xl" icon={faWifi} />
            <p>Work remotely in a paradise</p>
          </div>
        </div>
      </section>
      <h2 className="p-5 font-medium text-2xl">
        Book your perfect place in your favorite destination
      </h2>
      <div className="grid grid-cols-4 gap-6 p-4 md:grid-cols-8 lg:grid-cols-12">
        {venuesToDisplay.map((venue) => (
          <div
            key={venue.id}
            className="relative card-venue overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 col-span-4 lg:col-span-3">
            {venue.media && venue.media.length > 1 ? (
              <Slider {...sliderSettings}>
                {venue.media.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.url}
                      alt={image.alt || "venue image"}
                      className="aspect-video w-full h-52"
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <img
                src={
                  venue.media && venue.media.length === 1
                    ? venue.media[0].url
                    : House
                }
                alt={
                  venue.media && venue.media.length === 1
                    ? venue.media[0].alt
                    : "house"
                }
                className="aspect-video w-full h-52"
              />
            )}
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-medium text-slate-700">
                  {venue.name}
                </h2>
                <p className="text-slate-400">
                  Price: {venue.price} kr SEK night
                </p>
                <div>{venue.location.city}</div>
                <div>{venue.location.country}</div>
              </div>
            </div>
            <div className="flex justify-end p-6 pt-0">
              <Link to={`/venue/${venue.id}`}>
                <button className="absolute bottom-4 right-4 w-30 inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-800 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                  <span>Book now!</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Venues;
