const Roles = require('../models/Roles');

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Roles.getAll();
        res.status(200).json({ status: 200, data: roles });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching roles', error: error.message });
    }
};