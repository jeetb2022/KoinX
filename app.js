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
const corsOptions = {
  origin: '*', 
  allowedHeaders: ['Content-Type', 'Authorization','User-Agent'],
};

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
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

const specs = swaggerJsdoc(options);

// Middleware to serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); 
app.use(bodyParser.json());

app.use("/api/convert", convertRouter);
app.use("/api/companies", companiesRouter);

// Start the server after setting up Swagger and other middleware
run().then(async () => {
  console.log("Database connected. Setting up routes...");
  server.listen(8000, () => {
      console.log("The server is listening at port 8000");
  });
  console.log('Updating cryptocurrency data...');
  await fetchAndStoreCryptoData();  

  // Example route to update cryptocurrency data
  cron.schedule('0 * * * *', async () => {
    console.log('Updating cryptocurrency data...');
    await fetchAndStoreCryptoData();
  });

}).catch(err => {
  console.error("Error starting the application:", err);
  process.exit(1);
});
