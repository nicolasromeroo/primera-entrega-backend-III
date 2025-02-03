
// server.js
import express from 'express';
import envsConfig from "./src/config/envs.config.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.router.js";
import taskRoutes from './src/routes/tasks.router.js';
import { connectMongoDB } from './src/db/connect.js';
import { verifyToken } from './src/utils/jwt.js';

connectMongoDB();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser(envsConfig.SECRET_KEY));

app.use("/api", authRoutes); 
app.use("/api", verifyToken); 
app.use('/api', taskRoutes); 

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo con éxito`);
});

export default app;

// CONSIGNA MOCKS

// import mocksRouter from "./src/routes/mocks.router.js"

// app.use("/api/tasks", createTask)

// app.use('/api/mocks', mocksRouter); // consigna mocks
// app.get("/tasks/mockingtasks", async (req, res) => {
//   const { count, userId } = req.query;
//   try {
//     const tasks = await generateTasks(count, userId);
//     res.status(201).json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: "Error generando tareas" });
//   }
// });
