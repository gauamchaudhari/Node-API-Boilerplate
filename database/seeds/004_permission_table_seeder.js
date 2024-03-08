const { tables } = require('../../constants/table.constants');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tables.PERMISSIONS).del();
  await knex.raw(`ALTER TABLE ${tables.PERMISSIONS} AUTO_INCREMENT = 1`);
  await knex(tables.PERMISSIONS).insert([
    {
      name: 'dashboard',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'create-user',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'edit-user',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'delete-user',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'view-user',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'view-profile',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'edit-profile',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'create-role',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'edit-role',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'delete-role',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'view-role',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'create-permission',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'edit-permission',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'delete-permission',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'view-permission',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
};
