import express from 'express';
import { orderDeliver, orderDetail } from '../controller/deliveryData.controller.js';


const router = express.Router();
router.post("/getOrder", orderDeliver);
router.get("/orderDetails", orderDetail)
export default router