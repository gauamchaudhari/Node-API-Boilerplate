const { Model } = require('objection');

class Roles extends Model {
    static get tableName() {
        return 'roles';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string' }
            }
        };
    }

    static async getAll() {
        try {
            const roles = await Roles.query();
            return roles;
        } catch (error) {
            throw new Error(`Error fetching all roles: ${error.message}`);
        }
    }

    static async fetchByRoleName(roleName) {
        try {
            const role = await Roles.query().findOne({ name: roleName });
            return role;
        } catch (error) {
            throw new Error(`Error fetching role by name: ${error.message}`);
        }
    }
}

module.exports = Roles;