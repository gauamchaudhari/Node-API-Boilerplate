const { tables } = require('../../constants/table.constants');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    const tableExists = await knex.schema.hasTable(tables.USERS);
    if (!tableExists) {
        return knex.schema.createTable(tables.USERS, function (table) {
            table.increments('id').primary().comment('User Id');
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.string('email').unique().notNullable();
            table.string('password').notNullable();
            table.string('phone').notNullable();
            table.string('address').nullable();
            table.enum('gender', ['male', 'female']);
            table.string('education').nullable();
            table.timestamps(true, true);
            table.timestamp('deleted_at').nullable();
        });
    }

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable(tables.USERS);
};
