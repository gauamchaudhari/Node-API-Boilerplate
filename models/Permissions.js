const { Model } = require('objection');

class Permissions extends Model {
    static get tableName() {
        return 'permissions';
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
}

module.exports = Permissions;