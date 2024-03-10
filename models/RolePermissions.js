const { Model } = require('objection');

class RolePermissions extends Model {
    static get tableName() {
        return 'role_permissions';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['role_id', 'permission_id'],

            properties: {
                role_id: { type: 'integer' },
                permission_id: { type: 'integer' }
            }
        };
    }
}

module.exports = RolePermissions;