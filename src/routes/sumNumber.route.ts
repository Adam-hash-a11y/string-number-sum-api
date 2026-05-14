    import express from "express";
    import { sumNumber } from "../controller/sumNumber.controller";
    import { sumNumberMiddleware } from "../middleware/sumNumber.middleware";
    import { authMiddleware } from "../middleware/auth.middleware";

    export const sumNumberRouter = express.Router();

    sumNumberRouter.post(
    "/",
    authMiddleware,
    sumNumberMiddleware,
    sumNumber,
    );
