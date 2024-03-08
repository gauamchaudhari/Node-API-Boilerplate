const config = require('../../knexfile');
const knex = require('knex')(config.development);
const { Model } = require('objection');
Model.knex(knex);
const User = require('../../models/User');
const Roles = require('../../models/Roles');
const { tables } = require('../../constants/table.constants');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex(tables.USER_ROLES).del();
  await knex.raw(`ALTER TABLE ${tables.USER_ROLES} AUTO_INCREMENT = 1`);
  const users = await User.fetchAllUsers();
  const roles = await Roles.query();

  // Mapping role names to their IDs for quick lookup
  const roleMap = {};
  roles.forEach(role => {
    roleMap[role.name] = role.id;
  });

  // Defining role assignments based on user email addresses
  const roleAssignments = {
    'admin@admin.com': 'Super Admin',
    'rinku.patel@yopmail.com': 'Retailer Admin',
    'gautam.patel@yopmail.com': 'User Executive'
  };

  const userRoles = [];

  // Assigning roles to users based on email addresses
  users.forEach(user => {
    const email = user.email;
    const roleName = roleAssignments[email];
    const roleId = roleMap[roleName];

    if (roleId) {
      userRoles.push({
        user_id: user.id,
        role_id: roleId,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
  });
  // Inserting user roles into the database
  await knex(tables.USER_ROLES).insert(userRoles);
};
