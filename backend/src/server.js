import app from "./app.js";
import http from "http";
import mongoose from "mongoose";
import { redisClient } from "./app/config/index.js";
import { dbURI } from "./app/config/index.js";

const server = http.createServer(app);

await redisClient.connect();

server.listen(5000, () => {
	console.log("Server started on port 5000");
});

mongoose.connect(dbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
