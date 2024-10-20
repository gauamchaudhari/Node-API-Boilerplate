const Permission = require('../models/Permissions');

class PermissionController {
    async index(req, res) {
        try {
            const permissions = await Permission.getAll();
            res.status(200).json({ status: 200, data: permissions });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching permissions', error: error.message });
        }
    }

    async getById(req, res) {
        const { id } = req.params;
        try {
            const permission = await Permission.getById(id);
            res.status(200).json({ status: 200, data: permission });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching permission', error: error.message });
        }
    }

    async create(req,res) {
        const { name } = req.body;
        try {            
            const newPermission = await Permission.create(name);
            res.status(201).json({ status: 201, data: newPermission });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async update(req,res) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const updatedPermission = await Permission.update(id, name);
            res.status(200).json({ status: 200, data: updatedPermission });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req,res) {
        const { id } = req.params;
        try {
            const deletedPermission = await Permission.delete(id);
            res.status(200).json({ status: 200, data: deletedPermission, message: 'Permission deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new PermissionController();