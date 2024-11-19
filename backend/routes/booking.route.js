import express from "express";
import { newBooking } from "../controllers/booking.contorller.js";

const router =express.Router();

router.post('/duties',newBooking);

export default router;