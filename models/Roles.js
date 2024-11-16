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
    // get all
    static async getAll() {
        try {
            const roles = await Roles.query();
            return roles;
        } catch (error) {
            throw new Error(`Error fetching all roles: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            return await Roles.query().findById(id);
        } catch (error) {
            throw new Error(`Error fetching role by id: ${error.message}`);
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

    static async createRole(name) {
        try {
            // Check if the role already exists
            const existingRole = await this.fetchByRoleName(name);
            if (existingRole) {
                throw new Error('Role already exists');
            }

            // Insert a new role if it doesn't exist
            const newRole = await Roles.query().insert({ name });
            return newRole;
        } catch (error) {
            throw new Error(`Error creating role: ${error.message}`);
        }
    }

    static async updateRole(id, name) {
        try {
            const role = await Roles.query().findById(id);
            if (!role) {
                throw new Error('Role not found');
            }
            const updatedRole = await Roles.query().patchAndFetchById(id, { name });
            return updatedRole;
        } catch (error) {
            throw new Error(`Error updating role: ${error.message}`);
        }
    }

    static async deleteRole(id) {
        try {
            const role = await Roles.query().findById(id);
            if (!role) {
                throw new Error('Role not found');
            }
            await Roles.query().deleteById(id);
            return role;
        } catch (error) {
            throw new Error(`Error deleting role: ${error.message}`);
        }
    }
}

module.exports = Roles;