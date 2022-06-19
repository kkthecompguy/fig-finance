import express, { Application } from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import router from "./routes/events.routes";

dotenv.config();


const app: Application = express();

const config = {
  port: process.env.PORT || 5000,
  mongouri: process.env.MONGOURI || ""
}

app.use(express.json());
app.use(cors());

// add routes here
app.use("/events", router);

app.get("/", (req, res) => {
  res.status(200).json({"message": "api is running..."})
});

const server = {
  init: function() {
    app.listen(config.port, function() {
      console.log(`server listening on http://localhost:${config.port}`);
    })
  },
  connect: async function() {
    try {
      await mongoose.connect(config.mongouri);
      console.log("database connected successfully");
    } catch (error) {
      console.log("failed to connect to db");
      process.exit(1);
    }
  }
}

server.connect();
server.init();
