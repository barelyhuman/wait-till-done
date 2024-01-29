/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: "./data/dev.sqlite3",
    },
  },

  staging: {
    client: "better-sqlite3",
    connection: {
      filename: "/data/staging.sqlite3",
    },
  },

  production: {
    client: "better-sqlite3",
    connection: {
      filename: process.env.DATABASE_URL
    },
  },
};
