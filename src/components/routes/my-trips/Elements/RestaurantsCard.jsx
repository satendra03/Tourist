import React, { useContext } from "react";
import { LogInContext } from "@/Context/LogInContext/Login";
import { useRefContext } from "@/Context/RefContext/RefContext";
import FoodCard from "./FoodCard";

function RestaurantsCard() {

  const { trip } = useContext(LogInContext);
  const foods = trip?.food?.restaurants;

  console.log("Food", foods);

  const { RestaurantsRef } = useRefContext();

  return (
    <div ref={RestaurantsRef} className="flex flex-col md:flex-row flex-wrap gap-5">
      {foods?.map((item, idx) => {
        // console.log("Item", item);
        return (
          <div key={idx} className="md:w-[48%]">
            <FoodCard className="food-card" restaurant={item} />
          </div>
        );
      })}
    </div>
  );
}

export default RestaurantsCard;