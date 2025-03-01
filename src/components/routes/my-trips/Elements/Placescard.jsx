import React, { useContext } from "react";
import { useRefContext } from "@/Context/RefContext/RefContext";
import RestaurantsCard from "./RestaurantsCard";
import ActivityCard from "./ActivityCard";

function Placescard({ time, title }) {

  const activity = time.activity;
  const restaurant = time.restaurant;

  const { placesRef } = useRefContext();

  return (
    <>
          <div ref={placesRef} className="main-container mt-5 sm:mt-10">
            <div className="places-heading text-center my-5">
              <h3 className="opacity-90 mx-auto text-center text-md font-medium tracking-tight text-primary/80 md:text-xl">
                {title}
              </h3>
            </div>
            <div className="cards flex flex-col md:flex-row gap-5">
              <ActivityCard className="actity-card" activity={time.activity} />
              <RestaurantsCard className="place-card" restaurant={time.restaurant} />
            </div>
          </div>
    </>
  );
}

export default Placescard;
