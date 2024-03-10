const { tables } = require('../../constants/table.constants');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tables.ROLE_PERMISSIONS).del()
  // await knex(tables.ROLE_PERMISSIONS).insert([
  
  // ]);
};
