import app from "./app.js";
import http from "http";
import mongoose from "mongoose";
import { redisClient } from "./app/config/index.js";

const server = http.createServer(app);

await redisClient.connect();

server.listen(5000, () => {
	console.log("Server started on port 5000");
});

mongoose.connect("mongodb://localhost:27017/mern", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
