const { tables } = require('../../constants/table.constants');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable(tables.ROLES, function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true, true);
        table.timestamp('deleted_at').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable(tables.ROLES);
};
