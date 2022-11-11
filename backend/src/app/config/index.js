import { config } from "dotenv";
import redis from "redis";

config();

export const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
export const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
export const port = process.env.PORT;
export const dbURI = process.env.DB_URI;
export const passwordKey = process.env.PASSWORD_KEY;
export const redisClient = redis.createClient();
export const keyName = "ciOiJIUzI1NiIsInR5c";
