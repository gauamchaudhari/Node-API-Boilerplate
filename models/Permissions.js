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

    static async fetchByPermissionName(permissionName) {
        try {
            const permission = await Permissions.query().findOne({ name: permissionName });
            return permission;
        } catch (error) {
            throw new Error(`Error fetching permission by name: ${error.permissionName}`);
        }
    }

    static async getAll() {
        try {
            const permissions = await Permissions.query();
            return permissions;
        } catch (error) {
            throw new Error(`Error fetching all permissions: ${error.message}`);
        }
    }

    static async create(name) {
        const existingPermission = await this.fetchByPermissionName(name);
        if (existingPermission) {
            throw new Error('Permission already exists');
        }
        const newPermission = await Permissions.query().insert({ name });
        return newPermission;
    }

    static async getById(id) {
        try {
            const permission = await Permissions.query().findById(id);
            return permission;
        } catch (error) {
            throw new Error(`Error fetching permission:${error.message}`);
        }
    }

    static async update(id, name) {
        try {
            const permission = Permissions.query().findById(id);
            if (!permission) {
                throw new Error('Permission Not Found');
            }
            const updatePermission = await Permissions.query().patchAndFetchById(id, { name });
            return updatePermission;
        } catch (error) {
            throw new Error(`Error updating permission:${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const permission = await Permissions.query.findById(id);
            if (!permission) {
                throw new Error('Permission not found');
            }
            await Permissions.query().deleteById(id);
            return permission;
        } catch (error) {
            throw new Error(`Error deleting permission: ${error.permission}`);
        }
    }

}

module.exports = Permissions;