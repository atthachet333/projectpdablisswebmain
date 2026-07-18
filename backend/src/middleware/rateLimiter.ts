import rateLimit from 'express-rate-limit';

export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'ส่งข้อความบ่อยเกินไป กรุณารอ 15 นาทีแล้วลองใหม่',
  },
  skipSuccessfulRequests: false,
});

export const generalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'คำขอมากเกินไป กรุณารอสักครู่',
  },
});
