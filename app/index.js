const express = require("express");
const mongoose = require("mongoose");
const winston = require("winston");
const cors = require("cors");
const morgan = require("morgan");
require("winston-mongodb");
require("express-async-errors");

const UserRoutes = require("./routes/UserRoutes");
const ArticleRouter = require("./routes/ArticleRouter");
const app = express();

class Application {
  constructor() {
    this.setUpExpressServer();
    this.setUpMongoose();
    this.setupRoutesAndMiddlewares();
    this.setupConfigs();
  }

  setupRoutesAndMiddlewares() {
    // built-in middleware
    app.use(express.json());
    app.use("/static", express.static("uploadedFiles"));

    if (app.get("env") === "production") app.use(morgan("tiny"));

    // third-party middleware
    const corsOpts = {
      origin: "*",
      methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE", "PATCH", "HEAD"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Access-Token"],
      credentials: true,
    };
    app.use(cors(corsOpts));

    app.use(express.urlencoded({ extended: true }));
    // my middleware

    //routes

    // app.use(HomeRoutes);
    app.use(UserRoutes);
    app.use(ArticleRouter);
  }

  setupConfigs() {
    winston.add(new winston.transports.File({ filename: "error-log.log" }));
    winston.add(
      new winston.transports.MongoDB({
        db: "mongodb://0.0.0.0:27017/farhangosiasat",
        level: "error",
      })
    );

    process.on("uncaughtException", (err) => {
      console.log(err);
      winston.error(err.message);
    });
    process.on("unhandledRejection", (err) => {
      console.log(err);
      winston.error(err.message);
    });
  }

  setUpMongoose() {
    mongoose
      .connect("mongodb://0.0.0.0:27017/farhangosiasat", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("db connected");
        winston.info({ message: "db connected", level: "info" });
      })
      .catch((err) => console.log("db not connected : ", err));
  }
  setUpExpressServer() {
    const port = process.env.myport || 8000;
    app.listen(port, (err) => {
      if (err) console.log(err);
      else console.log(`app listen to port ${port}`);
    });
  }
}

module.exports = Application;
