/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("tokens", function (table) {
    table.increments("id").unique().primary();
    table.text("is_active").notNullable().defaultTo(true);
    table.timestamps(true, true);

    table.string("token").notNullable();
    table.datetime("expires_at").notNullable();
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists("tokens");
};
