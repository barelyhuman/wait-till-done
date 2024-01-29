import bcrypt from "bcryptjs";

export const passwordUtils = {
  hash(toHash) {
    return bcrypt.hash(toHash, 8);
  },
  validate(toValidate, hashed) {
    return bcrypt.compare(toValidate, hashed);
  },
};
