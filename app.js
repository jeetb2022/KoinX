import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import run from './db/index.js';
import http from 'http'
import dotenv from "dotenv";
import fetchAndStoreCryptoData from "./controllers/FetchAndStore.controller.js"
import cron from "node-cron";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Configure CORS options
const corsOptions = {
  origin: '*', // Allow requests from any origin
  allowedHeaders: ['Content-Type', 'Authorization', 'User-Agent'],
};

app.use(cors(corsOptions));

// Parse JSON and URL-encoded bodies
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from "public" directory
app.use(express.static("public"));

// Use bodyParser for parsing request bodies
app.use(bodyParser.json());


// Connect to the database and set up routes
run().then(async () => {
  console.log("Database connected. Setting up routes...");

  // Start the server
  server.listen(8000, () => {
    console.log("The server is listening at port 8000");
  });

  // Initial fetch and store cryptocurrency data
  console.log('Updating cryptocurrency data...');
  await fetchAndStoreCryptoData();

  // Schedule cron job to update cryptocurrency data every hour
  cron.schedule('0 * * * *', async () => {
    console.log('Updating cryptocurrency data...');
    await fetchAndStoreCryptoData();
  });

}).catch(err => {
  console.error("Error starting the application:", err);
  process.exit(1);
});
