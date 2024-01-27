/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("watchlist", function (table) {
    table.increments("id").unique().primary();
    table.text("is_active").notNullable().defaultTo(true);
    table.timestamps(true, true);
    table.string("mal_id").notNullable();
    table.string("name").notNullable();
    table.integer("aired").notNullable();
    table.integer("episodes").notNullable();
    table.string("status").notNullable();
    table.datetime("last_scraped_at").notNullable();
    table.boolean("is_completed").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists("watchlist");
};
