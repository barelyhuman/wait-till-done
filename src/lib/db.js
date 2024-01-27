import knex from "knex";
import kConfig from "../../knexfile.js";

function createConnectionFactory() {
  /**@type {import("knex").Knex<any, unknown[]>}*/
  let connectInstance;
  return () => {
    if (connectInstance) {
      return connectInstance;
    }
    //@ts-ignore
    const env = import.meta.env ? import.meta.env.NODE_ENV : "development";
    const config = kConfig[env];
    connectInstance = knex(config);
    return connectInstance;
  };
}

const createConnection = createConnectionFactory();

export const db = createConnection();

/**
 *
 * @param {import("knex").Knex} [trx]
 * @returns {import("knex").Knex}
 */
export const getExecutor = (trx) => {
  return trx || db;
};
