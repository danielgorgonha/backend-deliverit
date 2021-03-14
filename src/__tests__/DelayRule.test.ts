import request from "supertest";
import { getConnection } from "typeorm";
import app from "../app";

import createConnection from "../database";

describe("DelayRules", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be ble to create a new delay rule", async () => {
    const response = await request(app).post("/delayrule").send({
      title: "ate 2 dias",
      equality: "Equal",
      day: 2,
      penalty_value: 2,
      interest_per_day: 0.2
    });

    expect(response.status).toBe(201);
  });
});
