const bcrypt = require('bcryptjs');
const { tables } = require('../../constants/table.constants');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tables.USERS).del();
  await knex.raw(`ALTER TABLE ${tables.USERS} AUTO_INCREMENT = 1`);
  await knex(tables.USERS).insert([
    {
      first_name: 'Super',
      last_name: 'Admin',
      email: 'admin@admin.com',
      phone: '1234567890',
      address: '123 Main St',
      gender: 'male',
      education: 'Master',
      password: bcrypt.hashSync('Admin@123', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      first_name: 'Rinku',
      last_name: 'Patel',
      email: 'rinku.patel@yopmail.com',
      phone: '8320361452',
      address: '123 Main St',
      gender: 'female',
      education: 'BA',
      password: bcrypt.hashSync('Admin@123', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      first_name: 'Gautam',
      last_name: 'Patel',
      email: 'gautam.patel@yopmail.com',
      phone: '9898918760',
      address: '123 Main St',
      gender: 'male',
      education: 'MCA',
      password: bcrypt.hashSync('Admin@123', 8),
      created_at: new Date(),
      updated_at: new Date(),
    }
  ]);
};
