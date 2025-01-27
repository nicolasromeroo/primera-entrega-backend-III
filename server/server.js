
import express from 'express';
import dotenv from 'dotenv';
import envsConfig from "./src/config/envs.config.js"
import cors from 'cors';
import cookieParser from "cookie-parser";
import { connectMongoDB } from "./src/db/connect.js";
import routes from "./src/routes/index.router.js"


dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser(envsConfig.SECRET_KEY));

// Rutas
app.use("/api", routes)

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        await connectMongoDB();
        app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
    } catch (error) {
        console.error('Error iniciando el servidor:', error);
    }
};

startServer();
