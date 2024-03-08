const { tables } = require('../../constants/table.constants');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable(tables.ROLE_PERMISSIONS, function (table) {
        table.increments('id').primary();
        table.integer('role_id').unsigned().notNullable();
        table.integer('permission_id').unsigned().notNullable();
        table.timestamps(true, true);

        table.foreign('role_id').references('id').inTable('roles').onDelete('CASCADE');
        table.foreign('permission_id').references('id').inTable('permissions').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable(tables.ROLE_PERMISSIONS);
};
