import express from "express";
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
}

export default new App().express;