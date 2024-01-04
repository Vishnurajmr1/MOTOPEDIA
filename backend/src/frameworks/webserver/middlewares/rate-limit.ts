import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, //15 minutes
  max: 1000,
  message: 'Too many request from this ip,please try again later.',
  headers: false,
});
