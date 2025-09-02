import axios from 'axios';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (location) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: location,
                units: "metric",
                appid: WEATHER_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error("Weather API Error:", error.response?.data || error.message);
        return null;
    }
};
