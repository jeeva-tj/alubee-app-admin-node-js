import express from 'express';
import { 
    dashboardPage, 
    loginPage, 
    reportPage, 
    workOrderPage,
    deviceMangerPage,
    userManagementPage
} from '../controllers/view_controller.js';
const router = express.Router();

router.route('/').get(loginPage);
router.route('/dashboard').get(dashboardPage);
router.route('/reports').get(reportPage);
router.route('/work-order').get(workOrderPage);
router.route('/device-manager').get(deviceMangerPage);
router.route('/user-management').get(userManagementPage);


export default router;