import express from "express";
import { addToCart, fetchCart, removeItem } from "../controller/cart.controller.js";
const router = express.Router();

router.post("/addToCart", addToCart);
router.get("/:userId", fetchCart);
router.delete("/:userId/:productId", removeItem);
export default router;