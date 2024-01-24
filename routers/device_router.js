import express from 'express';
const router = express.Router();
import {
    deviceStatus
} from '../controllers/device_controller.js'
import { userProtect } from '../middlewares/AuthMiddleware.js';


router.route('/device/stauts').get(userProtect, deviceStatus)

export default router;