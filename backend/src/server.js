import app from "./app.js";
import http from "http";
import mongoose from "mongoose";
import { redisClient } from "./app/config/index.js";
import { dbURI } from "./app/config/index.js";

// create server
const server = http.createServer(app);

// connect to redis
await redisClient.connect();

// start server
server.listen(5000, () => {
	console.log("Server started on port 5000");
});

// connect to mongodb
mongoose.connect(dbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
