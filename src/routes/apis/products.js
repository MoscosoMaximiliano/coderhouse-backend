import { Router } from "express";
import ProductManager from "../../data/fs/productManager.js";
import ProductHandler from "../../middleware/productHandler.js"

import {ProductDB} from '../../data/mongo/MongoManager.js'

const productsRouter = Router()

productsRouter.post("/", ProductHandler, async(req, res, next) => {
    try {
        const response = await ProductDB.Create(req.body)

        return res.json({
            statusCode: 201,
            response
        })
    } catch (error) {
        return next(error)
    }
})
productsRouter.get("/", async (req, res, next) => {
    try {
        const response = await ProductDB.Read({})
        return res.json({
            statusCode: 200,
            response
        })
    } catch (error) {
        return next(error)
    }
})
productsRouter.get("/:pid", async (req, res, next) => {
    try {
        const response = await ProductDB.ReadOne(req.params.pid)
        return res.json({
            statusCode: 200,
            response
        })
    } catch (error) {
        return next(error)
    }
})
productsRouter.put("/:pid", ProductHandler, async (req, res, next) => {
    try {
        const response = await ProductDB.Update(req.params.pid, req.body)
        return res.json({
            statusCode: 200,
            response
        })
    } catch (error) {
        return next(error)
    }
})
productsRouter.delete("/:pid", async (req, res, next) => {
    try {
        const response = await ProductDB.Destroy(req.params.pid)
        return res.json({
            statusCode: 200,
            response
        })
    } catch (error) {
        return next(error)
    }
})

export default productsRouter