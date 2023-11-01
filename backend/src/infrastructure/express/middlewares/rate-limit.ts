import rateLimit from 'express-rate-limit';

const WINDOWMS_IN_MINTUE = 3 * 60 * 1000;
export const rateLimiter = rateLimit({
    windowMs: WINDOWMS_IN_MINTUE, //3 mintue
    max: 100,
    headers: false,
});
