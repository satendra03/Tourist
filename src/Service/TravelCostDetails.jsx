import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40, // new Value ( fixed the error )
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// export const getTravelCostDetails = model.startChat({
//   generationConfig,
//   history: [
//     {
//       role: "user",
//       parts: [
//         {
//           text: `Generate transportation details for average cost of traveling in {Lucknow,Uttar Pradesh, India} . Include the mode of transport, average duration, avg cost per person for all mode of transport from (auto,cab,bus,metro) if any of the mode of transport not available mention "Not Available"\nOutput format  : JSON `,
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [{ text:
//         'json\n{\n  "city": "Lucknow, Uttar Pradesh, India",\n  "transportation_details": [\n    {\n      "mode": "Auto Rickshaw",\n      "average_duration": "Varies depending on distance; typically 15-45 minutes within the city.",\n      "average_cost_per_person": "₹50 - ₹200 (depending on distance and negotiation)",\n       "notes": "Bargaining is often necessary."\n    },\n    {\n      "mode": "Cab (Ola/Uber/Local Taxis)",\n      "average_duration": "Varies depending on distance and traffic; generally 15-60 minutes within the city.",\n      "average_cost_per_person": "₹150 - ₹400 (depending on distance, time of day, and cab type)",\n      "notes": "Prices fluctuate based on demand."\n    },\n    {\n      "mode": "Bus (Local City Buses)",\n      "average_duration": "Varies greatly depending on route and traffic; typically 30-90 minutes.",\n      "average_cost_per_person": "₹10 - ₹30",\n      "notes": "Can be crowded, but a budget-friendly option."\n    },\n    {\n      "mode": "Metro",\n      "average_duration": "Varies depending on the route. Usually, it\'s faster than road transport due to dedicated lanes.",\n      "average_cost_per_person": "₹10 - ₹60 (depending on the distance)",\n      "notes": "Lucknow Metro has limited coverage, so check if it serves your desired locations."\n    }\n  ]\n}\n',
//     }],
//     },
//   ],
// });

export const getTravelCostDetails = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [{text:
        "generate a json output of transport cost of traveling in city {Jabalpur, Madhya Pradesh, India} average cost (per km) , avg duration  , notes for  modes = auto 🛺, cab 🚕, bus 🚌 and metro 🚇 only  (if any of the mode is not available mention \"Not Available\")\nexample :\n\n\"transportCost\": {\n    \"city\": \"Lucknow, Uttar Pradesh, India\",\n    \"transportation_details\": [\n      {\n        \"mode\": \"Auto 🛺\",\n        \"average_duration\": \"15-45 minutes within the city.\",\n        \"average_cost_per_person\": \"100 to 200 Rs.\",\n        \"notes\": \"Bargaining is common.\"\n      },\n      {\n        \"mode\": \"Cab 🚕\",\n        \"average_duration\": \"Varies depending on distance and traffic; expect delays during peak hours.\",\n        \"average_cost_per_person\": \"300 to 500 Rs .\",\n        \"notes\": \"Negotiation is possible with non-app taxis.\"\n      },\n      {\n        \"mode\": \"Bus 🚌\",\n        \"average_duration\": \"Varies greatly depending on route and traffic; can be slow due to congestion.\",\n        \"average_cost_per_person\": \" 20-80 Rs , Relatively inexpensive\",\n        \"notes\": \"Buses are a cheaper option, but can be crowded during peak hours.\"\n      },\n      {\n        \"mode\": \"Metro 🚇\",\n        \"average_duration\": \" 20-40 mins Efficient within the metro system's coverage area; travel time depends on distance.\",\n        \"average_cost_per_person\": \"Around 20 to  120 RS, depending on the distance.\",\n        \"notes\": \"Metro is a relatively modern and efficient system.\"\n      }\n    ]\n  }\nIMPORTAN : output should only contain JSON format with only mentioned structure ",
    }],
    },
    {
      role: "model",
      parts: [{text:
        "json\n{\n  \"transportCost\": {\n    \"city\": \"Jabalpur, Madhya Pradesh, India\",\n    \"transportation_details\": [\n      {\n        \"mode\": \"Auto 🛺\",\n        \"average_duration\": \"10-30 minutes within the city.\",\n        \"average_cost_per_km\": \"₹10-₹15\",\n        \"notes\": \"Bargaining is very common. Fares are generally negotiable.\"\n      },\n      {\n        \"mode\": \"Cab 🚕\",\n        \"average_duration\": \"Varies depending on distance and traffic.\",\n        \"average_cost_per_km\": \"₹15-₹25\",\n        \"notes\": \"App-based cabs are readily available. Prices can surge during peak hours.\"\n      },\n      {\n        \"mode\": \"Bus 🚌\",\n        \"average_duration\": \"Varies greatly depending on route and traffic; can be slow.\",\n        \"average_cost_per_km\": \"₹2-₹5\",\n        \"notes\": \"Local buses are a very affordable option but can be crowded.\"\n      },\n      {\n        \"mode\": \"Metro 🚇\",\n        \"average_duration\": \"Not Available\",\n        \"average_cost_per_km\": \"Not Available\",\n        \"notes\": \"Not Available\"\n      }\n    ]\n  }\n}\n",
    }],
    },
  ]
})