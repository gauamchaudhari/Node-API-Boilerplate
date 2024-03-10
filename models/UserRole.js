const { Model } = require('objection');

class UserRole extends Model {
    static get tableName() {
        return 'user_roles';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['user_id', 'role_id'],

            properties: {
                user_id: { type: 'integer' },
                role_id: { type: 'integer' }
            }
        };
    }

}

module.exports = UserRole;