import express from "express";
import { sumNumberRouter } from "./sumNumber.route";
import { trackingRouter } from "./tracking.route";

export const router = express.Router();

router.use("/sumNumber", sumNumberRouter); // grooup routes
router.use("/calls-history", trackingRouter);
