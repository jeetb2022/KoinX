import express from "express";
import cors from "cors";    
import bodyParser from "body-parser";
import run from './db/index.js';
import http from 'http' 
import dotenv from "dotenv";


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



run().then(async () => {
  console.log("Database connected. Setting up routes...");
  server.listen(8000, () => {
      console.log("The server is listening at port 8000");
  });


}).catch(err => {
    console.error("Error starting the application:", err);
    process.exit(1);
});
