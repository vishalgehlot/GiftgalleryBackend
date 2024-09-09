import { buyNow, placedOrder, updateStatus, viewAllOrderList, viewParticularUserOrder } from "../controller/order.controller.js";
import express from 'express';
let route = express.Router();

route.post("/placeOrder", placedOrder);
route.get("/:userId", viewParticularUserOrder)
route.get("/viewAllOrders", viewAllOrderList);
route.post("/buyNow", buyNow);
route.put("/updateOrderStatus", updateStatus)

export default route;