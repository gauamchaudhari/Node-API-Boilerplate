const Roles = require('../models/Roles');
class RoleController {
    async getAllRoles(req, res) {
        try {
            const roles = await Roles.getAll();
            res.status(200).json({ status: 200, data: roles });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching roles', error: error.message });
        }
    }

    async getRole(req,res) {
        try {
            const id = req.params.id;
            const role = await Roles.findById(id);            
            if (!role) {
                return res.status(404).json({ status: 404, message: `Role not found` });
            }
            res.status(200).json({ status: 200, data: role });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching roles', error: error.message });
        }
    }

    async create(req, res) {
        const { name } = req.body;

        try {
            // Call the model's createRole method to insert the role
            const newRole = await Roles.createRole(name);
            res.status(201).json({ status: 201, data: newRole });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateRole(req, res) {
        const { id } = req.params;
        const { name } = req.body;

        try {
            const updatedRole = await Roles.updateRole(id, name);
            res.status(200).json({ status: 200, data: updatedRole });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteRole(req, res) {
        const { id } = req.params;

        try {
            const deletedRole = await Roles.deleteRole(id);
            res.status(200).json({ status: 200, data: deletedRole, message: 'Role deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new RoleController();