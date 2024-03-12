import { RedisClientType } from "@redis/client";
import express from "express";

export const LIST_KEY = "messages";
export type RedisClient = RedisClientType<any, any, any>;

// createApp 의 async 는 제거 이유는 client 객체 생성을 외부에서 하기 때문에 필요 x
export const createApp = (client: RedisClient) => {
    const app = express();
    app.use(express.json());


    app.post("/messages", async (request, response) => {
        console.log("request.body :", request.body);

        const { message } = request.body;
        if (!message) {
            return response.status(400).send("Message is required");
        }

        await client.lPush(LIST_KEY, message);
        response.status(200).send("Message added to list");
    });

    app.get("/messages", async (request, response) => {
        const messages = await client.lRange(LIST_KEY, 0, -1);
        response.status(200).send(messages);
    });


    app.get("/", (request, response) => {
        response.status(200).send("auto deploy ! go to ec2 9! ");
    });

    return app;
}