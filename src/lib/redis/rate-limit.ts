import { redis } from "./redis";
import { Ratelimit } from "@upstash/ratelimit";

export const emailChangeLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1h"),
  analytics: true,
});

export const usernameUpdateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "5m"),
  analytics: true,
});
