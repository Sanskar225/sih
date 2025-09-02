import express from 'express';
import dotenv from 'dotenv';
import authRoutes from '../src/routes/authRoute.js';
import alertsRouter from "./routes/alertsRoutes.js";
import deviceRoutes from './routes/deviceRoutes.js';


dotenv.config();
const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use("/alerts", alertsRouter);
app.use('/devices', deviceRoutes);

app.get('/', (req, res) => {
    res.send('SIH Backend API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
