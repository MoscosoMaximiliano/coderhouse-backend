import { Router } from "express";
import OrderManager from '../../data/fs/orderManager.js'

const ordersRouter = Router()

ordersRouter.post("/", async (req, res, next) => {
    try {
        const response = await OrderManager.Create(req.body)
        
        return res.json({
            statusCode: 201,
            response
        })
    } catch (error) {
        return next(error)
    }
})
ordersRouter.get("/:uid", async (req, res, next) => {
    try {
        const response = await OrderManager.ReadByUser(req.params.uid)
        return res.json({
            statusCode: 200,
            response
        })
    } catch (error) {
        return next(error)
    }
})
ordersRouter.delete("/:oid", async (req, res, next) => {
    try {
        const response = await OrderManager.Destroy(req.params.oid)
        return res.json({
            statusCode: 200,
            response
        })
    } catch (error) {
        return next(error)
    }
})

export default ordersRouter