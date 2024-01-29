import { randomBytes } from "crypto";

export function randomToken(num = 32) {
  return randomBytes(num).toString("base64url");
}
