import { AppError } from "./errors/AppError";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { router } from "./routes";

import "reflect-metadata";
import createConnection from "./database";

class App {
  public express: express.Application

  public constructor () {
    this.express = express();

    this.middlawares();
    this.database();
    this.routes();

    this.middlawaresErrors();

  }

  private middlawares() {
    this.express.use(express.json());
  }

  private routes() {
    this.express.use(router);
  }

  private database() {
    createConnection();
  }

  private middlawaresErrors() {
    this.express.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
      if(err instanceof AppError) {
          return response.status(err.statusCode).json({
              message: err.message
          });
      }

      return response.status(500).json({
          status: "Error",
          message: `Internal server error ${err.message}`
      })
    });
  }
}

export default new App().express;
