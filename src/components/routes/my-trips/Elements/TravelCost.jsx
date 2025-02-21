import { LogInContext } from "@/Context/LogInContext/Login";
import React, { useContext } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function TravelCost() {
  const { trip } = useContext(LogInContext); 

  // if (trip?.transportCost?.transportation_details) {
  //   trip?.transportCost?.transportation_details.forEach(item => {
  //       if (item.mode) {
  //           item.mode = item.mode.split(" ")[0]; // Keep only the first word
  //       }
  //   });

  //   const places = ["Auto", "Cab", "Bus", "Metro"];

  //   trip.transportCost.transportation_details = trip?.transportCost?.transportation_details.filter(item => places.includes(item.mode));

    // change
// }

// console.log(trip);

  return (

    <div className=" my-[15vh]">
      <h2 className="opacity-90 mx-auto text-center text-3xl font-black text-primary/80 md:text-5xl">
        Travel Cost
      </h2>
      <p className="location-info md:mt-4 opacity-90 mx-auto text-center text-lg font-medium tracking-tight text-primary/80 md:text-xl">
        (Estimated)
      </p>

      <div className="main-info mt-2 md:mt-4">
        <div className="flex flex-col items-center justify-center mt-4">
          <Tabs
            defaultValue={"Auto 🛺"}
            className="w-[600px]"
          >
            <TabsList className="grid w-full grid-cols-4 h-10">
              {trip?.transportCost?.transportCost?.transportation_details?.map(
                (item, index) => {
                  return (
                    <TabsTrigger className="h-8" key={index} value={item.mode}>
                      {item.mode}
                    </TabsTrigger>
                  );
                }
              )}
            </TabsList>

            {trip?.transportCost?.transportCost?.transportation_details?.map((item, index) => {
              return (
                <TabsContent key={index} value={item.mode}>
                  <Card className="p-10">
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{item.mode}</CardTitle>
                    </CardHeader>
                    <CardContent className="">
                      <div className="mb-5">
                        <h2 className="font-medium text-lg md:text-xl">Average Duration</h2>
                        <p className="bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent">{item.average_duration}</p>
                      </div>
                      <div className="mb-5">
                        <h2 className="font-medium text-lg md:text-xl">Average Cost per Person</h2>
                        <p className="bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent">{item.average_cost_per_person}</p>
                      </div>
                      <div className="mb-5">
                        <h2 className="font-medium text-lg md:text-xl">Important Note</h2>
                        <p className="bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent">{item.notes}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default TravelCost;
