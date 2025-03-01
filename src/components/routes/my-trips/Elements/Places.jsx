import React, { useContext } from "react";
import Placescard from "./Placescard";
import { LogInContext } from "@/Context/LogInContext/Login";

function Places() {

  const { trip } = useContext(LogInContext);
    // const itinerary = trip?.tripData;
    const itinerary = trip?.tripData;
    console.log("Trip from Places", trip);
    // console.log(itinerary);
    // const city = trip?.tripData?.trip?.location;

  return (
    <div className="my-[15vh]">
      <h2 className="opacity-90 mx-auto text-center text-3xl font-black text-primary/80 md:text-5xl">
        Places
      </h2>
      <div className="main-info mt-2 md:mt-4">
        {itinerary?.map((day, idx) => {
            return (
              <div key={idx} className="main-container mt-5 sm:mt-10">
                <h3 className="md:text-4xl font-black bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-center text-transparent">
                  {`Day ${idx+1}`}
                </h3>
                <Placescard title={"Morning"} time={day?.morning} />
                <Placescard title={"Afternoon"} time={day?.afternoon} />
                <Placescard title={"Evening"} time={day?.evening} />
              </div>
            )
          })
        }
        {/*  */}
      </div>
    </div>
  );
}

export default Places;
