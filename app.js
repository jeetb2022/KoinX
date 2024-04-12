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

dotenv.config(); 
const app = express();
const server = http.createServer(app);
const corsOptions = {
  origin: '*', 
  allowedHeaders: ['Content-Type', 'Authorization','User-Agent'],
};

app.use(cors(corsOptions));


app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public")); 


app.use(bodyParser.json());


app.use("/api/convert", convertRouter);
app.use("/api/companies", companiesRouter);



run().then(async () => {
  console.log("Database connected. Setting up routes...");
  server.listen(8000, () => {
      console.log("The server is listening at port 8000");
  });
  console.log('Updating cryptocurrency data...');
  await fetchAndStoreCryptoData();  

    // Example route to create a new user
    cron.schedule('0 * * * *', async () => {
      console.log('Updating cryptocurrency data...');
      await fetchAndStoreCryptoData();
    });

}).catch(err => {
    console.error("Error starting the application:", err);
    process.exit(1);
});
