import request from "supertest";
import { getConnection } from "typeorm";
import app from "../app";

import createConnection from "../database";

var datetime = new Date();

datetime.setDate(datetime.getDate() + 1)

describe("Billstopays", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });
  it("Must be able to create a new accounts payable with an effective date", async () => {
    const response = await request(app).post("/billtopay").send({
      name: "Bill To Pay Example 1",
      original_value: 500,
      expiration_date: datetime.toISOString().slice(0,10),
      payment_date: datetime.toISOString().slice(0,10)
    });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create bill to pay with exists name", async () => {
    const response = await request(app).post("/billtopay").send({
      name: "Bill To Pay Example 1",
      original_value: 500,
      expiration_date: datetime.toISOString().slice(0,10),
      payment_date: datetime.toISOString().slice(0,10)
    });

    expect(response.status).toBe(400);
  });

  it("You must be able to create a new accounts payable with a delayed date and because of this, the delay rules must be created", async () => {
    await request(app).post("/delayrule").send({
      title: "ate 3 dias",
      equality: "Equal",
      day: 3,
      penalty_value: 2,
      interest_per_day: 0.1
    });

    await request(app).post("/delayrule").send({
      title: "superior a 3 dias",
      equality: "MoreThan",
      day: 3,
      penalty_value: 3,
      interest_per_day: 0.2
    });

    await request(app).post("/delayrule").send({
      title: "superior a 5 dias",
      equality: "MoreThan",
      day: 5,
      penalty_value: 5,
      interest_per_day: 0.3
    });

    const response = await request(app).post("/billtopay").send({
      name: "Bill To Pay Example 2",
      original_value: 500,
      expiration_date: "2021-03-01",
      payment_date: datetime.toISOString().slice(0,10)
    });

    expect(response.status).toBe(201);
  });

  it("Should be able to get all bills to pays", async () => {
    await request(app).post("/billtopay").send({
      name: "Bill To Pay Example 3",
      original_value: 500,
      expiration_date: datetime.toISOString().slice(0,10),
      payment_date: datetime.toISOString().slice(0,10)
    });

    const response = await request(app).get("/billtopay");

    expect(response.body.length).toBe(3);
  });
});
