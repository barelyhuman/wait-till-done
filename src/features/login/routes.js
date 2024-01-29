// @jsx h
import Router from "@koa/router";
import { passwordUtils } from "../../lib/password.js";
import { UserModel } from "../../models/user.js";
import { randomToken } from "../../lib/crypto.js";
import { TokenModel } from "../../models/token.js";
import ms from "ms";
const router = new Router();

router.post("/login", async (ctx) => {
  const payload = ctx.request.body;

  if (!payload.password) {
    ctx.flash.error = `Cannot login without a password.`;
    ctx.status = 303;
    ctx.redirect("/");
    return;
  }

  // The system only has one user at this point so it doesn't
  // need to go through anything else.
  const userDetails = await UserModel.findOne((b) => b.where({}));
  if (!userDetails) {
    ctx.flash.error = `Cannot find user.`;
    ctx.status = 303;
    ctx.redirect("/");
    // TODO: throw error
    return;
  }

  const isValid = await passwordUtils.validate(
    payload.password,
    userDetails.password
  );

  if (!isValid) {
    ctx.flash.error = `Invalid Credentials.`;
    // TODO: throw error
    ctx.status = 303;
    ctx.redirect("/");
    return;
  }

  const token = randomToken();
  const expiry = Date.now() + ms("1y");

  await TokenModel.insert({
    token: token,
    user_id: userDetails.id,
    expires_at: new Date(expiry),
  });

  ctx.flash.error = "";
  ctx.cookies.set("auth", token, {
    sameSite: "lax",
    domain: ctx.hostname || "localhost",
  });

  ctx.status = 303;
  ctx.redirect("/");
});

export { router };
