import express from "express";
import { sumNumberRouter } from "./sumNumber.route";

export const router = express.Router();

router.use("/sumNumber", sumNumberRouter); // grooup routes
