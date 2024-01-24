import express from 'express';
import {
    createWorkOrder,
    deleteWorkOrder,
    getWOMachineByUnit,
    getWorkOrders,
    updateWorkOrder, 
    workOrderById, 
    workOrder_requirements
} from '../controllers/workOrder_controller.js';
const router = express.Router();
import { userProtect } from '../middlewares/AuthMiddleware.js';


router.route('/work-orders').get(userProtect, getWorkOrders)
router.route('/work-order-req').get(userProtect, workOrder_requirements)
router.route('/work-order/machines').post(userProtect, getWOMachineByUnit)
router.route('/work-order-create').post(userProtect, createWorkOrder)
router.route('/work-order/:id').get(userProtect, workOrderById).delete(userProtect, deleteWorkOrder).put(userProtect, updateWorkOrder)

export default router;