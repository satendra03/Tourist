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

export const getTravelCostDetails = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate transportation details for average cost of traveling in {Lucknow,Uttar Pradesh, India} . Include the mode of transport, average duration, avg cost per person for all mode of transport from (auto,cab,bus,metro) if any of the mode of transport not available mention "Not Available"\nOutput format  : JSON `,
        },
      ],
    },
    {
      role: "model",
      parts: [{ text:
        'json\n{\n  "city": "Lucknow, Uttar Pradesh, India",\n  "transportation_details": [\n    {\n      "mode": "Auto Rickshaw",\n      "average_duration": "Varies depending on distance; typically 15-45 minutes within the city.",\n      "average_cost_per_person": "₹50 - ₹200 (depending on distance and negotiation)",\n       "notes": "Bargaining is often necessary."\n    },\n    {\n      "mode": "Cab (Ola/Uber/Local Taxis)",\n      "average_duration": "Varies depending on distance and traffic; generally 15-60 minutes within the city.",\n      "average_cost_per_person": "₹150 - ₹400 (depending on distance, time of day, and cab type)",\n      "notes": "Prices fluctuate based on demand."\n    },\n    {\n      "mode": "Bus (Local City Buses)",\n      "average_duration": "Varies greatly depending on route and traffic; typically 30-90 minutes.",\n      "average_cost_per_person": "₹10 - ₹30",\n      "notes": "Can be crowded, but a budget-friendly option."\n    },\n    {\n      "mode": "Metro",\n      "average_duration": "Varies depending on the route. Usually, it\'s faster than road transport due to dedicated lanes.",\n      "average_cost_per_person": "₹10 - ₹60 (depending on the distance)",\n      "notes": "Lucknow Metro has limited coverage, so check if it serves your desired locations."\n    }\n  ]\n}\n',
    }],
    },
  ],
});
