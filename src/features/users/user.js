import { passwordUtils } from "../../lib/password.js";
import { UserModel } from "../../models/user.js";

export async function createUser(username, password) {
  const hashedPassword = await passwordUtils.hash(password);
  await UserModel.insert({
    username,
    password: hashedPassword,
  });
}

export async function doesUserExist(username) {
  const exists = await UserModel.findOne((b) =>
    b.where({
      username,
    })
  );
  return exists;
}
