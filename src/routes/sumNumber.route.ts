import express from "express";
import { sumNumber } from "../controller/sumNumber.controller";

export const sumNumberRouter = express.Router();

sumNumberRouter.post("/", sumNumber); //  controller // wel controller fih e service
