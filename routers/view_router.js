import express from 'express';
import { 
    dashboardPage, 
    loginPage, 
    reportPage, 
    workOrderPage,
    deviceMangerPage,
    userManagementPage,
    workOrderAddPage,
    workOrderUpdatePage
} from '../controllers/view_controller.js';
const router = express.Router();
import { authRoleProtect } from '../middlewares/AuthRole.js';

router.route('/').get(loginPage);
router.route('/dashboard').get(authRoleProtect, dashboardPage);
router.route('/reports').get(authRoleProtect, reportPage);
router.route('/work-order').get(authRoleProtect, workOrderPage);
router.route('/device-manager').get(authRoleProtect, deviceMangerPage);
router.route('/user-management').get(authRoleProtect, userManagementPage);
router.route('/work-order-add').get(authRoleProtect, workOrderAddPage);
router.route('/work-order-update/:id').get(authRoleProtect, workOrderUpdatePage);


export default router;