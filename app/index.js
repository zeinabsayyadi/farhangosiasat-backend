const express = require("express");
const mongoose = require("mongoose");
const winston = require("winston");
const cors = require("cors");
const morgan = require("morgan");
require("winston-mongodb");
require("express-async-errors");

const UserRoutes = require("./routes/UserRoutes");

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
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));

    if (app.get("env") === "production") app.use(morgan("tiny"));

    // third-party middleware
    app.use(cors());

    // my middleware

    //routes
    // app.use(CustomerRoutes);
    // app.use(HomeRoutes);
    app.use(UserRoutes);

    //must be at last
    //app.use(ErrorMiddleware);
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
    const port = process.env.myport || 3000;
    app.listen(port, (err) => {
      if (err) console.log(err);
      else console.log(`app listen to port ${port}`);
    });
  }
}

module.exports = Application;
