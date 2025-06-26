import express from "express";
import dotenv from "dotenv";
import dbConnection from "./src/app/config/dbConfig.js";
import setupRoutes from './src/app/Route/index.js'

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost"; 

dbConnection();


app.use(express.json());
setupRoutes(app);
app.get('/', (req, res) => {
  res.send("Connect to server");
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
