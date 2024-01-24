import express from 'express';
import {
    getMachineByUnit,
    getMachineNumbers, getMachineResults, getUnit,
} from '../controllers/dashboard_controller.js';
const router = express.Router();
import { userProtect } from '../middlewares/AuthMiddleware.js';


router.route('/dashboard/units').get(userProtect, getUnit)
router.route('/dashboard/machines').post(userProtect, getMachineByUnit)
router.route('/dashboard/machine-no').get(userProtect, getMachineNumbers)
router.route('/dashboard/machine-results').post(userProtect, getMachineResults)

export default router;