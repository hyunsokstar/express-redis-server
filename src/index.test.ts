import request from "supertest";
// import { createApp } from "./server";
import { Application } from "express"; // Express 애플리케이션 타입
import { LIST_KEY as list_key, RedisClient, createApp } from "./app";
import * as redis from "redis";

import dotenv from "dotenv";
dotenv.config();

const REDIS_URL = "redis://default:test_env@localhost:6380"

let app: Application;
let client: RedisClient
let LIST_KEY = list_key

beforeAll(async () => {
    client = redis.createClient({ url: REDIS_URL });
    await client.connect();
    app = await createApp(client);
});

beforeEach(async () => {
    await client.flushDb();
})

afterAll(async () => {
    await client.quit();
});

describe("POST /messages", () => {
    it("responds with a success message", async () => {
        const response = await request(app)
            .post("/messages")
            .send({ message: "testing with redis" });

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Message added to list");
    });
});


describe("GET /messages", () => {
    it("responds with all messages", async () => {
        // await client.lPush(LIST_KEY, ["msg1", "msg2"]);
        const response = await request(app).get("/messages");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });
});