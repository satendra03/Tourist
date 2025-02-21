import { useContext, useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from '@/components/ui/scroll-area';
import { LogInContext } from '@/Context/LogInContext/Login';
// import { Import } from 'lucide-react/dist/cjs/lucide-react';

export function TrainSchedule() {

    const { trip } = useContext(LogInContext); 

//   const [fromStation, setFromStation] = useState(trip?.stationCodeData?.Source);
//   const [toStation, setToStation] = useState(trip?.stationCodeData?.Destination);
//   const [dateOfJourney, setDateOfJourney] = useState(trip?.startDate);


//   const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);



//   const fetchTrains = async () => {

//     try {
//       const url =
//         `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${fromStation}&toStationCode=${toStation}&dateOfJourney=${dateOfJourney}`;
//       const options = {
//         method: "GET",
//         headers: {
//           "x-rapidapi-key": Import.meta.env.VITE_RAPIDAPI_KEY,
//           "x-rapidapi-host": "irctc1.p.rapidapi.com",
//         },
//       };

//       const response = await fetch(url, options);
//       const result = await response.json();
//       setTrains(result.data || []);
//     } catch (err) {
//       return toast.error("Internal error");
//     }
//   };


//   useEffect(() => {
//     fetchTrains();
//   }, [trip, trains]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="space-y-2 text-center">
      <h2 className="opacity-90 mx-auto text-center text-3xl font-black text-primary/80 md:text-5xl">
      Train Schedule
      </h2>
        {/* <h1 className="text-3xl font-bold text-primary"> Checker</h1> */}
        <p className="text-muted-foreground">Trains between stations</p>
      </div>

      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-5 m-2">
              <CardHeader className="space-y-2">
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-[300px]" />
                <Skeleton className="h-4 w-[250px]" />
              </CardContent>
            </Card>
          ))
        ) : trip?.trains?.length > 0 ? (
            <ScrollArea className="p-2 h-[70vh] rounded-md border bg-black/50">
          {trip?.trains?.map((train) => (
            <Card key={train.train_number} className="hover:shadow-lg transition-shadow p-5 m-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{train.train_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Train No: {train.train_number}
                    </p>
                  </div>
                  <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {train.duration}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <p>Departure: {train.from_std}</p>
                  <p>Arrival: {train.to_sta}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {train.class_type.map((coach) => (
                    <span
                      key={coach}
                      className="text-xs bg-muted px-2.5 py-1 rounded-full"
                    >
                      {coach}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
            ))}
          </ScrollArea>
        
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No trains found for the selected criteria
          </div>
        )}
      </div>
    </div>
  );
}