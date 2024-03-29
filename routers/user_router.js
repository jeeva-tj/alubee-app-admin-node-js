import express from 'express';
import {
   login,
   allUser,
   profile,
   newUser,
   updateUser,
   deleteUser,
   userById,
   resetPwd,
   logout,
   adminProfileUpdate,
   adminPwdReset,
   adminProfileDelete
} from '../controllers/user_controller.js';
const router = express.Router();
import { userProtect } from '../middlewares/AuthMiddleware.js';

router.route('/login').post(login)
router.route('/profile').get(userProtect, profile)
router.route('/user').get(userProtect, allUser).post(userProtect, newUser)
router.route('/user/reset-pwd').put(userProtect, resetPwd)
router.route('/user/:id').get(userProtect, userById).put(userProtect, updateUser).delete(userProtect, deleteUser)
router.route('/admin/profile').put(userProtect, adminProfileUpdate)
router.route('/admin/reset-pwd').put(userProtect, adminPwdReset)
router.route('/admin/delete/:id').delete(userProtect, adminProfileDelete)
router.route('/logout').get(logout)


export default router;
