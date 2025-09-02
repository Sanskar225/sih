import express from 'express';
import { getCurrentWeather } from '../controllers/weatherController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.get('/current', authenticateUser, getCurrentWeather);

export default router;