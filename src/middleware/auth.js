import { TokenModel } from "../models/token.js";
import { UserModel } from "../models/user.js";

export const loginStatus = async (ctx, next) => {
  ctx.isLoggedIn = false;

  const authToken = ctx.cookies.get("auth");

  if (!authToken) {
    ctx.isLoggedIn = false;
    return await next();
  }

  const userDetails = await UserModel.findOne((b) =>
    b.where({
      username: "root",
    })
  );

  if (!userDetails) {
    return await next();
  }

  const tokenDetails = await TokenModel.findOne((b) =>
    b.where({
      user_id: userDetails.id,
      token: authToken,
    })
  );

  if (!tokenDetails) {
    return await next();
  }

  ctx.isLoggedIn = true;
  return await next();
};
