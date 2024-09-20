if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const Redis = require("ioredis");

const redis = new Redis({
  port: 14795,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

console.log(process.env.REDIS_HOST)

module.exports = redis;