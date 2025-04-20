const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const uploadsFilesController = require('../controllers/uploadsFilesController');
const roleController = require('../controllers/RoleController');
const PermissionController = require('../controllers/PermissionController');
const authMiddleware = require('../app/ middleware/authMiddleware');
const { registrationValidationRules, validate } = require('../validation/validation');
const sendEmailController = require('../controllers/sendEmailController');

const { validateRoleCreation,validateRoleUpdate, handleValidationErrors } = require('../validators/Role/roleValidation');

const router = express.Router();

// Create an instance of the ImageUpload class

router.post('/login', authController.login);
router.post('/register', registrationValidationRules(), validate, userController.registerUser);
router.use(authMiddleware);
router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getUser);
router.post('/users', userController.addUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/send-email', sendEmailController);

/* Roles Routes */
router.get('/roles', roleController.getAllRoles);
router.post(
    '/roles',
    validateRoleCreation,
    handleValidationErrors,
    roleController.create
)
router.put(
    '/roles/:id',
    validateRoleUpdate,
    handleValidationErrors,
    roleController.updateRole
);
router.get('/role/:id', roleController.getRole);
router.delete('/roles/:id', roleController.deleteRole);
router.post('/assing-role-permission', roleController.assignRolePermission);
router.get('/role-permissions', roleController.getAllRolePermissions);
router.get('/role-permissions/:role_id', roleController.getRolePermissions);
/* Permissions Routes */
router.get('/permissions',PermissionController.index);
// Route for uploading a single image
router.post('/upload-image', uploadsFilesController.uploadSingleImage);
router.get('/user-files/:user_id', uploadsFilesController.getFilesByUserId);
module.exports = router;