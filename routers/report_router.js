import express from 'express';
import {
    report,
    viewReport
} from '../controllers/report_controller.js';
const router = express.Router();
import { userProtect } from '../middlewares/AuthMiddleware.js';


router.route('/report').get(userProtect, report)
router.route('/view-report').post(userProtect, viewReport)

export default router;
