import { getExecutor } from "./db.js";

export function createModel(tableName) {
  let defaultExecutor = getExecutor();
  const tableQB = defaultExecutor(tableName);
  return {
    __tableName: tableName,

    /**
     * @param {(b: typeof tableQB)=>typeof tableQB} builder
     * @param {import("knex").Knex} [trx]
     * @returns
     */
    find(builder, trx) {
      let executor = getExecutor(trx);
      return builder(executor(tableName));
    },

    /**
     * @param {(b: typeof tableQB)=>typeof tableQB} builder
     * @param {import("knex").Knex} [trx]
     * @returns
     */
    async findOne(builder, trx) {
      let executor = getExecutor(trx);
      const chain = builder(executor(tableName));
      return await chain.first();
    },

    /**
     * @param {unknown} payload
     * @param {import("knex").Knex} [trx]
     * @returns
     */
    insert(payload, trx) {
      let executor = getExecutor(trx);
      return executor(tableName).insert(payload).returning(["id"]);
    },

    /**
     * @param {number} id
     * @param {unknown} payload
     * @param {import("knex").Knex} [trx]
     */
    updateById(id, payload, trx) {
      let executor = getExecutor(trx);
      return executor(tableName)
        .where({ id: id })
        .update(payload)
        .returning(["id"]);
    },
  };
}
