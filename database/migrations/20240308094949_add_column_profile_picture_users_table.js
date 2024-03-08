const { tables } = require('../../constants/table.constants');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table(tables.USERS, function (table) {
        table.string('profile_image').after('education').nullable().comment("User Profile picture");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table(tables.USERS, function (table) {
        table.dropColumn('profile_picture');
    });
};
