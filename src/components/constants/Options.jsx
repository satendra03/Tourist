export const SelectBudgetOptions = [
    {
        id:1,
        icon: "💵",
        title:"Cheap",
        desc: "Economize and Save"
    },
    {
        id: 2,
        icon: "💰",
        title:"Moderate",
        desc: "Balance Cost and Comfort"
    },
    {
        id:3,
        icon: "💎",
        title:"Luxury",
        desc: "Induldge without Limits"
    },
]

export const SelectNoOfPersons = [
    {
        id:1,
        icon: "🚶",
        title: "Solo",
        desc: "Discovering on Your Own",
        no: "1 Person"
    },
    {
        id:2,
        icon: "💑",
        title: "Partner",
        desc: "Exploring with a Loved One",
        no: "2 People"
    },
    {
        id:3,
        icon: "👨‍👩‍👧‍👦",
        title: "Family",
        desc: "Fun for All Ages",
        no: "3 to 5 People"
    },
    {
        id:4,
        icon: "🤝",
        title: "Friends",
        desc: "Adventure with Your Crew",
        no: "5 to 10 People"
    },
]

export const PROMPT = "Create an optimal trip itinerary based on the specified location, duration, budget, and number of persons. Generate Travel Plan for Location: {location} for no of days: {noOfDays} Days with no of People or group: {People} with Budget: {Budget}; give me list of hotels with hotel name, description, address, rating, price, location in map, coordinates, image url; also for the same create the itinerary for {noOfDays} days, suggest places, give name, details, pricing, timings, place images urls, location (coordinate or in map); Remember all have to cover in the {Budget} level budget. Important: give the result in JSON Format"

export const TravelPrompt = "Generate transportation details for average cost of traveling in {location} . Include the mode of transport, average duration, avg cost per person for all mode of transport from (auto,cab,bus,metro) if any of the mode of transport not available mention 'Not Available' Output format  : JSON"

export const getStationCodePrompt = "Convert the given railway station name and location into the official IRCTC station code. For example, 'jabalpur, madhya pradesh, india' → 'JBP' and 'bhopal, madhya pradesh, india' → 'BPL'. Provide the IRCTC codes for Source: {src} and Destination: {dest} in JSON format Ensure accuracy based on Indian Railways' official station codes."


export const getFoodPrompt = "Generate a list of famous local restaurants in {location} with their signature dishes within the budget {Budget}. \nEach restaurant should have:\n- Name of the restaurant\n- Most famous dish served there\n- A short description\n- Complete address\n- Average customer rating (out of 5)\n- Approximate price range per person in INR\n- Google Maps location link\n- Latitude and longitude coordinates\n- An image URL representing the restaurant or dish\nALL THE RESTAURANTS COST SHOULD BE UNDER BUDGET\n\nexample JSON format:\n\"restaurants\": [\n  {\n    \"name\": \"Bade Miyan\",\n    \"famous_dish\": \"Kebabs\",\n    \"description\": \"A legendary eatery in Mumbai famous for its mouthwatering kebabs and rolls.\",\n    \"address\": \"Tulloch Road, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001\",\n    \"rating\": 4.3,\n    \"price_range\": \"₹200-₹500 per person\",\n    \"location\": \"https://goo.gl/maps/F3Yv5pE3hXk\",\n    \"coordinates\": \"18.9220, 72.8335\",\n    \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Bade_Miyan_Kebabs.jpg/800px-Bade_Miyan_Kebabs.jpg\"\n  },\n  {\n    \"name\": \"Peter Cat\",\n    \"famous_dish\": \"Chelo Kebab\",\n    \"description\": \"One of Kolkata's most iconic restaurants, known for its delicious Chelo Kebabs.\",\n    \"address\": \"18, Park Street, Taltala, Kolkata, West Bengal 700071\",\n    \"rating\": 4.5,\n    \"price_range\": \"₹400-₹700 per person\",\n    \"location\": \"https://goo.gl/maps/Y8G5Q2CzW1D2\",\n    \"coordinates\": \"22.5531, 88.3501\",\n    \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Peter_Cat_Chelo_Kebab.jpg/800px-Peter_Cat_Chelo_Kebab.jpg\"\n  },\n  {\n    \"name\": \"Mavalli Tiffin Room (MTR)\",\n    \"famous_dish\": \"Rava Idli\",\n    \"description\": \"A historic eatery in Bangalore, famous for inventing the Rava Idli.\",\n    \"address\": \"14, Lalbagh Road, Mavalli, Bangalore, Karnataka 560004\",\n    \"rating\": 4.6,\n    \"price_range\": \"₹150-₹300 per person\",\n    \"location\": \"https://goo.gl/maps/ZP7j4rXyYwB2\",\n    \"coordinates\": \"12.9543, 77.5735\",\n    \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Rava_Idli_MTR.jpg/800px-Rava_Idli_MTR.jpg\"\n  },\n  {\n    \"name\": \"Karim's\",\n    \"famous_dish\": \"Mutton Korma\",\n    \"description\": \"A legendary Mughlai restaurant near Jama Masjid, serving rich and authentic mutton dishes.\",\n    \"address\": \"16, Gali Kababian, Jama Masjid, Old Delhi, Delhi 110006\",\n    \"rating\": 4.4,\n    \"price_range\": \"₹300-₹600 per person\",\n    \"location\": \"https://goo.gl/maps/JX6F1h9W6pM2\",\n    \"coordinates\": \"28.6505, 77.2334\",\n    \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Karims_Mutton_Korma.jpg/800px-Karims_Mutton_Korma.jpg\"\n  }\n]\n\n\nReturn the response in  mentioned JSON format.\n"

export const newTripPrompt = `
Create an optimal trip itinerary based on the specified location, duration, budget, and number of persons.

Generate a Travel Plan for Location: {location} for {noOfDays} Days with {People} people and Budget: {Budget}.

Trip Structure:
For each day, divide the plan into three sections:
- Morning: Suggest a restaurant and an activity/place to visit.
- Afternoon: Suggest a restaurant and an activity/place to visit.
- Evening: Suggest a restaurant and an activity/place to visit.

Ensure that all recommendations fit within the {Budget}.

Required Details:
- Restaurants: Name, description, type of cuisine, price range, rating, address, location (coordinates or map link), and an image URL.
- Activities/Places: Name, description, entry fee (if any), timings, location (coordinates or map link), and an image URL.

Important: Provide the result in JSON format.
`;