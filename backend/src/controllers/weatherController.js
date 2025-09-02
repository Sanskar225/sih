import { fetchWeather } from '../services/weatherService.js';
import { prisma } from '../config/prismaClient.js';

export const getCurrentWeather = async (req, res) => {
    try {
        const { location } = req.query; 
        if (!location) {
            return res.status(400).json({ message: "Location query param is required" });
        }

        const weatherData = await fetchWeather(location);

        if (!weatherData) {
            return res.status(500).json({ message: "Failed to fetch weather data" });
        }

        const savedWeather = await prisma.weatherData.create({
            data: {
                location,
                temperature: weatherData.main.temp,
                humidity: weatherData.main.humidity,
                description: weatherData.weather[0].description,
                windSpeed: weatherData.wind.speed
            }
        });

        return res.status(200).json({
            message: "Current weather fetched successfully",
            data: savedWeather
        });

    } catch (error) {
        console.error("Error fetching current weather:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
