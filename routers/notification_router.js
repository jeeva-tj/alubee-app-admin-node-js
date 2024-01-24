import express from 'express';
import {
    notification,
    allNotification,
    deleteAllNotifications
} from '../controllers/notification_controller.js';
const router = express.Router();
import { userProtect } from '../middlewares/AuthMiddleware.js';


router.route('/notification').get(userProtect, notification)
router.route('/all-notification').get(userProtect, allNotification)
router.route('/delete-notification').delete(userProtect, deleteAllNotifications)

export default router;