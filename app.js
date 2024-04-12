import express from "express";
import cors from "cors";    
import bodyParser from "body-parser";
import run from './db/index.js';
import http from 'http' 
import dotenv from "dotenv";
import fetchAndStoreCryptoData from "./controllers/FetchAndStore.controller.js"
import cron from "node-cron";
import convertRouter from "./routes/convert.routes.js";
import companiesRouter from "./routes/companies.route.js";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
const server = http.createServer(app);

// CORS options for allowing requests from any origin
const corsOptions = {
  origin: '*', 
  allowedHeaders: ['Content-Type', 'Authorization','User-Agent'],
};

// Swagger options for defining API documentation
const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Crptocurrency API",
      version: "0.1.0",
      description:
        "This is a Crptocurrency API application made with ExpressJs and documented with Swagger",
      contact: {
        name: "Jeet",
        email: "jeet.b@ahduni.edu.in",
      },
    },
    servers: [
      {
        url: "http://ec2-34-234-82-27.compute-1.amazonaws.com:8000",
      },
    ],
  },
  apis: ["./routes/*.js"], // This should point to your route files with JSDoc comments
};

const specs = swaggerJsdoc(swaggerOptions);

// Middleware to serve Swagger UI at "/api-docs"
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Middleware to enable CORS
app.use(cors(corsOptions));

// Middleware to parse JSON data
app.use(express.json({ limit: "16kb" }));

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Middleware to serve static files from "public" directory
app.use(express.static("public")); 

// Middleware to parse incoming request bodies as JSON
app.use(bodyParser.json());

// Route for handling currency conversion
app.use("/api/convert", convertRouter);

// Route for handling companies related to a currency
app.use("/api/companies", companiesRouter);

// Start the server after setting up Swagger and other middleware
run().then(async () => {
  // Log when database connection is successful and routes are set up
  console.log("Database connected. Setting up routes...");
  server.listen(8000, () => {
      console.log("The server is listening at port 8000");
  });

  // Log when updating cryptocurrency data
  console.log('Updating cryptocurrency data...');
  await fetchAndStoreCryptoData();  

  // Schedule a cron job to update cryptocurrency data every hour
  cron.schedule('0 * * * *', async () => {
    console.log('Updating cryptocurrency data...');
    await fetchAndStoreCryptoData();
  });

}).catch(err => {
  // Catch and log any errors during server startup
  console.error("Error starting the application:", err);
  process.exit(1);
});
