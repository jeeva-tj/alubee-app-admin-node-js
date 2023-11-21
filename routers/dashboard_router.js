import express from 'express';
import {
    getMachineNumbers
} from '../controllers/dashboard_controller.js';
const router = express.Router();
import { userProtect } from '../middlewares/AuthMiddleware.js';


router.route('/dashboard/machine-no').get(userProtect, getMachineNumbers)

export default router;