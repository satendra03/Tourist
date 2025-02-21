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

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Create an optimal trip itinerary based on the specified location, duration, budget, and number of persons. Generate Travel Plan for Location: {Bhopal} for no of days: {3} Days with no of People or group: {4-5} with Budget: {Luxury}; give me list of hotels with hotel name, description, address, rating, price, location in map, coordinates, image url; also for the same create the itinerary for {4-5} days, suggest places, give name, details, pricing, timings, place images urls, location (coordinate or in map); Remember all have to cover in the {Luxury} level budget. Important: give the result in JSON Format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "location": "Bhopal",\n  "duration": 3,\n  "budget": "Luxury",\n  "people": 4,\n  "hotels": [\n    {\n      "name": "Jehan Numa Palace Hotel",\n      "description": "A heritage hotel with opulent rooms, a sprawling garden, and a rooftop pool offering panoramic views of the city.",\n      "address": "1, Shamla Hills, Near Van Vihar National Park, Bhopal, Madhya Pradesh 462003",\n      "rating": 4.5,\n      "price": "₹15,000 - ₹30,000 per night",\n      "location": "https://goo.gl/maps/j12Q3Z5g5aL9R7T9",\n      "coordinates": "23.2594, 77.4096",\n      "image_url": "https://images.thrillophilia.com/image/upload/s--7i8t9L4h--/c_fill,f_auto,fl_progressive,h_600,q_auto,w_900/v1/images/photos/000/009/817/original/jehan_numa_palace_hotel_bhopal_hotel_exterior_view.jpg"\n    },\n    {\n      "name": "The Lalit, Bhopal",\n      "description": "A modern and luxurious hotel with elegant rooms, a rooftop pool, a spa, and multiple dining options.",\n      "address": "122, VIP Road, Near New Market, Bhopal, Madhya Pradesh 462003",\n      "rating": 4.2,\n      "price": "₹12,000 - ₹25,000 per night",\n      "location": "https://goo.gl/maps/bYfX1V85QmG96y3y",\n      "coordinates": "23.2582, 77.4118",\n      "image_url": "https://www.thelaLit.com/images/hotels/the-lalit-bhopal/home-slider-image-1.jpg"\n    },\n    {\n      "name": "Hotel Lake View Ashok",\n      "description": "A lakeside hotel with stunning views of the Upper Lake, comfortable rooms, and an outdoor pool.",\n      "address": "Shahpura, Near Van Vihar National Park, Bhopal, Madhya Pradesh 462016",\n      "rating": 4,\n      "price": "₹8,000 - ₹18,000 per night",\n      "location": "https://goo.gl/maps/2D19M97kC451wK7b",\n      "coordinates": "23.2438, 77.4253",\n      "image_url": "https://www.hotellakeviewashok.com/images/gallery/gallery_3.jpg"\n    }\n  ],\n  "itinerary": [\n    {\n      "day": 1,\n      "title": "Exploring the City\'s Heart",\n      "places": [\n        {\n          "name": "Bharat Bhavan",\n          "details": "A renowned cultural center showcasing Indian art, craft, and literature.",\n          "pricing": "Entry Fee: ₹50 per person",\n          "timings": "10:00 AM - 6:00 PM",\n          "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Bharat_Bhavan_Bhopal.jpg/1280px-Bharat_Bhavan_Bhopal.jpg",\n          "location": "https://goo.gl/maps/M1aJqM9J9L6YzY9b"\n        },\n        {\n          "name": "Rajwada",\n          "details": "A magnificent palace built in the 18th century, showcasing the grandeur of the Bhopal State.",\n          "pricing": "Entry Fee: ₹20 per person",\n          "timings": "9:00 AM - 6:00 PM",\n          "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Rajwada_Bhopal.jpg/1280px-Rajwada_Bhopal.jpg",\n          "location": "https://goo.gl/maps/2LhR6YfG84RjX2Q9"\n        },\n        {\n          "name": "Moti Masjid",\n          "details": "A beautiful mosque known for its intricate marble work and elegant architecture.",\n          "pricing": "Free Entry",\n          "timings": "5:00 AM - 8:00 PM",\n          "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Moti_Masjid_%28Bhopal%29.jpg/1280px-Moti_Masjid_%28Bhopal%29.jpg",\n          "location": "https://goo.gl/maps/6D14aU3p13wZ3g83"\n        }\n      ]\n    },\n    {\n      "day": 2,\n      "title": "Nature and History",\n      "places": [\n        {\n          "name": "Van Vihar National Park",\n          "details": "A lush green sanctuary home to various wildlife species, ideal for a relaxing day.",\n          "pricing": "Entry Fee: ₹50 per person",\n          "timings": "8:00 AM - 6:00 PM",\n          "image_url": "https://www.bhopal.nic.in/sites/default/files/styles/medium/public/vanvihar_national_park.jpg",\n          "location": "https://goo.gl/maps/Y1z3D7CqHq4y4wF7"\n        },\n        {\n          "name": "Upper Lake",\n          "details": "A serene lake offering scenic views, boat rides, and a chance to soak in the tranquility.",\n          "pricing": "Boat Ride: ₹100 - ₹500 per person",\n          "timings": "8:00 AM - 8:00 PM",\n          "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Upper_Lake_Bhopal_India.jpg/1280px-Upper_Lake_Bhopal_India.jpg",\n          "location": "https://goo.gl/maps/1S1N3bU47N26529v"\n        },\n        {\n          "name": "State Museum",\n          "details": "A comprehensive museum showcasing the history, art, and culture of Madhya Pradesh.",\n          "pricing": "Entry Fee: ₹20 per person",\n          "timings": "10:00 AM - 5:00 PM",\n          "image_url": "https://www.bhopal.nic.in/sites/default/files/styles/medium/public/state_museum.jpg",\n          "location": "https://goo.gl/maps/v3z4K9C931vD69s8"\n        }\n      ]\n    },\n    {\n      "day": 3,\n      "title": "Religious Sites and Culinary Delights",\n      "places": [\n        {\n          "name": "Taj-ul-Masjid",\n          "details": "One of the largest mosques in India, known for its grandeur and intricate architecture.",\n          "pricing": "Free Entry",\n          "timings": "5:00 AM - 8:00 PM",\n          "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Taj_ul_Masjid_Bhopal.jpg/1280px-Taj_ul_Masjid_Bhopal.jpg",\n          "location": "https://goo.gl/maps/C9M1nR2zW1Qm6K7g"\n        },\n        {\n          "name": "Birla Mandir",\n          "details": "A serene Hindu temple dedicated to Lord Vishnu, offering panoramic views of the city.",\n          "pricing": "Free Entry",\n          "timings": "6:00 AM - 8:00 PM",\n          "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Birla_Mandir_Bhopal_India.jpg/1280px-Birla_Mandir_Bhopal_India.jpg",\n          "location": "https://goo.gl/maps/2x6kQ76F4c4s776R"\n        },\n        {\n          "name": "Bhopal Food Tour",\n          "details": "Experience the rich culinary heritage of Bhopal with a guided food tour, sampling local delicacies.",\n          "pricing": "₹1,500 - ₹2,500 per person",\n          "timings": "11:00 AM - 3:00 PM",\n          "image_url": "https://www.holidify.com/images/cmsuploads/2019/02/08/best-food-in-bhopal_1549636789.jpg",\n          "location": "Various locations in the city"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Note:** This itinerary is based on a luxury budget, which means the suggested hotels and activities cater to higher-end preferences. The prices for attractions and food tours are approximate and may vary depending on the chosen provider. The coordinates provided are for the general area and may not be exact pinpoint locations. It\'s always recommended to confirm the latest information and availability before your trip. \n',
        },
      ],
    },
  ],
});


export const getStationCodeCall = model.startChat({
  generationConfig,
  history : [
    {
      role: "user",
      parts: [
        {
          text: "Convert the given railway station name and location into the official IRCTC station code. For example, 'jabalpur, madhya pradesh, india' → 'JBP' and 'bhopal, madhya pradesh, india' → 'BPL'. Provide the IRCTC codes for Source: {jabalpur, madhya pradesh, inda} and Destination: {bhopal, madhyapradesh, india} in JSON format Ensure accuracy based on Indian Railways' official station codes.",
        }
      ],
    },
    {
      role: "model",
      parts: [
        {text: "json\n{\n  \"source\": \"JBP\",\n  \"destination\": \"BPL\"\n}\n\n",}
      ],
    },
  ]
})



export const getFood = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [{text:
        "Generate a list of famous local restaurants in {Bhopal, Madhya Pradesh, India} with their signature dishes within the budget {2000}. \nEach restaurant should have:\n- Name of the restaurant\n- Most famous dish served there\n- A short description\n- Complete address\n- Average customer rating (out of 5)\n- Approximate price range per person in INR\n- Google Maps location link\n- Latitude and longitude coordinates\n- An image URL representing the restaurant or dish\nALL THE RESTAURANTS COST SHOULD BE UNDER BUDGET\n\nexample JSON format:\n\"restaurants\": [\n  {\n    \"name\": \"Bade Miyan\",\n    \"famous_dish\": \"Kebabs\",\n    \"description\": \"A legendary eatery in Mumbai famous for its mouthwatering kebabs and rolls.\",\n    \"address\": \"Tulloch Road, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001\",\n    \"rating\": 4.3,\n    \"price_range\": \"₹200-₹500 per person\",\n    \"location\": \"https://goo.gl/maps/F3Yv5pE3hXk\",\n    \"coordinates\": \"18.9220, 72.8335\",\n    \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Bade_Miyan_Kebabs.jpg/800px-Bade_Miyan_Kebabs.jpg\"\n  },\n  {\n    \"name\": \"Peter Cat\",\n    \"famous_dish\": \"Chelo Kebab\",\n    \"description\": \"One of Kolkata's most iconic restaurants, known for its delicious Chelo Kebabs.\",\n    \"address\": \"18, Park Street, Taltala, Kolkata, West Bengal 700071\",\n    \"rating\": 4.5,\n    \"price_range\": \"₹400-₹700 per person\",\n    \"location\": \"https://goo.gl/maps/Y8G5Q2CzW1D2\",\n    \"coordinates\": \"22.5531, 88.3501\",\n    \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Peter_Cat_Chelo_Kebab.jpg/800px-Peter_Cat_Chelo_Kebab.jpg\"\n  },\n  {\n    \"name\": \"Mavalli Tiffin Room (MTR)\",\n    \"famous_dish\": \"Rava Idli\",\n    \"description\": \"A historic eatery in Bangalore, famous for inventing the Rava Idli.\",\n    \"address\": \"14, Lalbagh Road, Mavalli, Bangalore, Karnataka 560004\",\n    \"rating\": 4.6,\n    \"price_range\": \"₹150-₹300 per person\",\n    \"location\": \"https://goo.gl/maps/ZP7j4rXyYwB2\",\n    \"coordinates\": \"12.9543, 77.5735\",\n    \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Rava_Idli_MTR.jpg/800px-Rava_Idli_MTR.jpg\"\n  },\n  {\n    \"name\": \"Karim's\",\n    \"famous_dish\": \"Mutton Korma\",\n    \"description\": \"A legendary Mughlai restaurant near Jama Masjid, serving rich and authentic mutton dishes.\",\n    \"address\": \"16, Gali Kababian, Jama Masjid, Old Delhi, Delhi 110006\",\n    \"rating\": 4.4,\n    \"price_range\": \"₹300-₹600 per person\",\n    \"location\": \"https://goo.gl/maps/JX6F1h9W6pM2\",\n    \"coordinates\": \"28.6505, 77.2334\",\n    \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Karims_Mutton_Korma.jpg/800px-Karims_Mutton_Korma.jpg\"\n  }\n]\n\n\nReturn the response in  mentioned JSON format.\n",
    }],
    },
    {
      role: "model",
      parts: [{text:
        "json\n{\n  \"restaurants\": [\n    {\n      \"name\": \"Hakeem's Restaurant\",\n      \"famous_dish\": \"Mutton Biryani\",\n      \"description\": \"A popular restaurant in Bhopal, especially known for its flavorful and aromatic Mutton Biryani. They offer a traditional taste.\",\n      \"address\": \"Shop No. 15, Peer Gate, Ibrahimpura, Bhopal, Madhya Pradesh 462001\",\n      \"rating\": 4.2,\n      \"price_range\": \"₹200-₹400 per person\",\n      \"location\": \"https://maps.app.goo.gl/97TzV1Xv6H1V2j7A7\",\n      \"coordinates\": \"23.2571, 77.4138\",\n      \"image_url\": \"https://b.zmtcdn.com/data/pictures/chains/7/18450777/895878e296c376c620dfb7a0b49323a0_o2_featured_v2.jpg\"\n    },\n    {\n      \"name\": \"Zam Zam Fast Food\",\n      \"famous_dish\": \"Chicken Tikka Roll\",\n      \"description\": \"Zam Zam is famous for its quick service and delicious chicken tikka rolls. A must-try spot for a fast and filling meal.\",\n      \"address\": \"Shop No. 1, Behind Taj-ul-Masajid, Itwara Rd, Peer Gate Area, Bhopal, Madhya Pradesh 462001\",\n      \"rating\": 4.0,\n      \"price_range\": \"₹100-₹200 per person\",\n      \"location\": \"https://maps.app.goo.gl/N8c4gJzXhV3qgE2b9\",\n      \"coordinates\": \"23.2579, 77.4132\",\n      \"image_url\": \"https://lh3.googleusercontent.com/p/AF1QipNl5h6t7yW45U533qg4zQxG1l_H-B4Q44q-xM7E=s1600\"\n    },\n    {\n      \"name\": \"Manohar Dairy & Restaurant\",\n      \"famous_dish\": \"Poha\",\n      \"description\": \"Manohar Dairy is a well-known chain restaurant and is loved for its freshly made poha and sweets. Great for breakfast or a snack.\",\n      \"address\": \"MP Nagar, Zone-I, Bhopal, Madhya Pradesh 462011\",\n      \"rating\": 4.1,\n      \"price_range\": \"₹150-₹300 per person\",\n      \"location\": \"https://maps.app.goo.gl/hP5zFqgNfXUaH47g8\",\n      \"coordinates\": \"23.2379, 77.4567\",\n      \"image_url\": \"https://content3.jdmagicbox.com/comp/bhopal/d9/0755px755.x755.180117182401.l4d9/catalogue/manohar-dairy-and-restaurant-m-p-nagar-bhopal-sweet-shops-n4q0z.jpg\"\n    },\n    {\n      \"name\": \"Chatori Gali\",\n      \"famous_dish\": \"Variety of Street Food\",\n      \"description\": \"Chatori Gali is a bustling street food hub where you can savor a wide variety of local snacks and dishes. Perfect for experiencing Bhopal's street food culture.\",\n      \"address\": \"Hamidia Road, Near Jama Masjid, Bhopal, Madhya Pradesh\",\n      \"rating\": 3.9,\n      \"price_range\": \"₹50-₹150 per person\",\n      \"location\": \"https://www.google.com/maps/place/Chatori+Gali/@23.2590768,77.415515,17z/data=!3m1!4b1!4m6!3m5!1s0x398ee9c003c9e99f:0xe0b54cf30469e6d2!8m2!3d23.2590768!4d77.415515!16s%2Fg%2F11c7s5q2_r\",\n      \"coordinates\": \"23.2591, 77.4155\",\n      \"image_url\": \"https://i.ytimg.com/vi/cT47yq-9tB0/maxresdefault.jpg\"\n    },\n    {\n      \"name\": \"Bhopal Darbar\",\n      \"famous_dish\": \"Chicken Biryani\",\n      \"description\": \"A popular spot in Bhopal known for its delicious Chicken Biryani and other Mughlai dishes. It is a great place for both locals and tourists to get a taste of the region's cuisine.\",\n      \"address\": \"Ibrahimpura, Peer Gate Area, Bhopal, Madhya Pradesh 462001\",\n      \"rating\": 4.0,\n      \"price_range\": \"₹250-₹500 per person\",\n      \"location\": \"https://www.google.com/maps/place/Bhopal+Darbar/@23.2584836,77.4102895,17z/data=!3m1!4b1!4m6!3m5!1s0x398ee9c05b50c23d:0xcffb09d3069f8841!8m2!3d23.2584836!4d77.4102895!16s%2Fg%2F11clm6d9f4\",\n      \"coordinates\": \"23.2585, 77.4103\",\n      \"image_url\": \"https://content3.jdmagicbox.com/comp/bhopal/j5/0755px755.x755.180423132836.q2j5/catalogue/bhopal-darbar-peer-gate-area-bhopal-non-vegetarian-restaurants-23zgy7h.jpg\"\n    }\n  ]\n}\n",
    }],
    },
  ]
})