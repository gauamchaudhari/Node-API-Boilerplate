const { tables } = require('../../constants/table.constants');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tables.ROLES).del()
  await knex.raw(`ALTER TABLE ${tables.ROLES} AUTO_INCREMENT = 1`);
  await knex(tables.ROLES).insert([
    {
      name: 'Super Admin',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Retailer Admin',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'User Executive',
      created_at: new Date(),
      updated_at: new Date()
    },
  ]);
};
