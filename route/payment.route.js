import express from "express";
import { checkout, paymentVerification } from "../controller/payment.controller.js";
import { API } from "../config/config.js";

const router = express.Router();
router.post("/checkout", checkout)
router.post("/paymentverification", paymentVerification)
router.get("/getkey", (req, res) => {
  res.status(200).json({ key: API.RAZORPAY_API_KEY })
})
export default router;