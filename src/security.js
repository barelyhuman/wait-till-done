import ratelimit from "koa-ratelimit";

const db = new Map();

export async function secure(ctx, next) {
  await ratelimit({
    driver: "memory",
    db: db,
    duration: 60000,
    errorMessage: "Sometimes You Just Have to Slow Down.",
    id: (ctx) => ctx.ip,
    headers: {
      remaining: "Rate-Limit-Remaining",
      reset: "Rate-Limit-Reset",
      total: "Rate-Limit-Total",
    },
    max: 100,
    disableHeader: false,
    whitelist: (ctx) => {},
    blacklist: (ctx) => {},
  })(ctx, next);
}
