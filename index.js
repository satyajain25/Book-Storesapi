import express from "express";
import dotenv from "dotenv";
import dbConnection from "./app/config/dbConfig.js";
import setupRoutes from './app/Route/index.js'
import cors from "cors";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";



app.use(cors({
  origin: ["http://localhost:8081", "http://192.168.0.139:8082", "http://localhost:8082"],
  credentials: true
}));

dbConnection()
app.use(express.json());
setupRoutes(app);
app.get('/', (req, res) => {
  res.send("Connected to server");
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
