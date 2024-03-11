
import * as redis from "redis";
import { createApp } from './app';
import dotenv from "dotenv";
dotenv.config();

const { PORT, REDIS_URL } = process.env

// const PORT: number = 9090;

const startServer = async () => {

    console.log("Starting the server port 9090 ");
    console.log("auto deploy test 1");


    const client = redis.createClient({ url: REDIS_URL });
    await client.connect();

    const app = createApp(client);

    app.listen(PORT, () => {
        console.log(`App listening at port ${PORT}`);
    })

}

startServer();
