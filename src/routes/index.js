import { Router } from "express";
import apiRouter from "./apis/index.js"
import viewsRouter from './views/index.js'

const router = Router()

router.use("/api", apiRouter)
router.use("/", viewsRouter)

export default router