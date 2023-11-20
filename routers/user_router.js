import express from 'express';
import {
   login,
   allUser
} from '../controllers/user_controller.js';
const router = express.Router();
import { userProtect } from '../middlewares/AuthMiddleware.js';

router.route('/login').post(login)
router.route('/user').get(userProtect, allUser)


export default router;
