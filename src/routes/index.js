import { Router } from "express";
import apiRouter from "./apis/index.js"

const router = Router()

router.use("/api", apiRouter)

export default router