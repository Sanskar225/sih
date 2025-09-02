import { fetchWeather } from '../service/weatherService.js';
import prisma from '../../prisma/client.js';
import { success, error as errorResponse } from '../utils/responseHelper.js';
import logger from '../utils/logger.js';

export const getCurrentWeather = async (req, res) => {
    try {
        const { location } = req.query;
        if (!location) {
            return errorResponse(res, "Location query param is required", 400);
        }

        const weatherData = await fetchWeather(location);
        if (!weatherData) {
            return errorResponse(res, "Failed to fetch weather data", 500);
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

        return success(res, savedWeather, "Current weather fetched successfully");
    } catch (err) {
        logger.error("Error fetching current weather:", err);
        return errorResponse(res, "Internal Server Error", 500);
    }
};
