import { createAccount } from "../src/features/login/login.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await createAccount("admin@example.com", "Demo@123");
};
