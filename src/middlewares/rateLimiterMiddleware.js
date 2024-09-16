const { RateLimiterRedis } = require('rate-limiter-flexible');
const redis = require('redis');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 3, // 3 requests
  duration: 1, // per second
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip) // Use IP address as key
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Muitas requisições. Tente novamente mais tarde.');
    });
};

module.exports = rateLimiterMiddleware;
