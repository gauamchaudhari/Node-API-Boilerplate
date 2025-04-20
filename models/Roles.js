const { Model } = require('objection');
const permissions = require('./Permissions');
class Roles extends Model {
    static get tableName() {
        return 'roles';
    }
    static get relationMappings() {
        const Permissions = require('./Permissions');
        return {
            permissions: {
                relation: Model.ManyToManyRelation,
                modelClass: Permissions,
                join: {
                    from: 'roles.id',
                    through: {
                        from: 'role_permissions.role_id',
                        to: 'role_permissions.permission_id',
                        extra: ['created_at', 'updated_at']
                    },
                    to: 'permissions.id'
                }
            }
        };
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

    static async assignRolePermission(roleId, permissionIds) {
        try {
            const role = await Roles.query().findById(roleId);
            if (!role) {
                throw new Error('Role not found');
            }

            // Step 1: Unrelate all current permissions
            await Roles.relatedQuery('permissions').for(roleId).unrelate();

            // Step 2: Relate new permissions (loop for MySQL compatibility)
            for (const id of permissionIds) {
                await Roles.relatedQuery('permissions').for(roleId).relate(id);
            }

            // Step 3: Return updated permissions
            const updatedPermissions = await Roles.relatedQuery('permissions')
                .for(roleId)
                .select('permissions.id', 'permissions.name');

            return {
                message: 'Permissions updated successfully',
                role_id: roleId,
                assigned_permissions: updatedPermissions,
            };

        } catch (error) {
            throw new Error(`Error assigning permission to role: ${error.message}`);
        }
    }

    static async getAllRolePermissions() {
        try {
            const roles = await Roles.query().withGraphFetched('permissions');
            return roles.map(role => ({
                role_id: role.id,
                role_name: role.name,
                permissions: role.permissions.map(permission => ({
                    permission_id: permission.id,
                    permission_name: permission.name
                }))
            }));
        } catch (error) {
            throw new Error(`Error fetching role permissions: ${error.message}`);
        }
    }

    static async getRolePermissions(roleId) {
        try {
            const role = await Roles.query().findById(roleId).withGraphFetched('permissions');
            if (!role) {
                throw new Error('Role not found');
            }
            return {
                role_id: role.id,
                role_name: role.name,
                permissions: role.permissions.map(permission => ({
                    permission_id: permission.id,
                    permission_name: permission.name
                }))
            };
        } catch (error) {
            throw new Error(`Error fetching role permissions: ${error.message}`);
        }
    }

}

module.exports = Roles;