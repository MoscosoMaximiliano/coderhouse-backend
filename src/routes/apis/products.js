import { Router } from "express";
import ProductManager from "../../data/fs/productManager.js";
import ProductHandler from "../../middleware/productHandler.js"

const productsRouter = Router()

productsRouter.post("/", ProductHandler, async(req, res, next) => {
    try {
        const response = await ProductManager.Create(req.body)

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
        const response = await ProductManager.Read()
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
        const response = await ProductManager.ReadOne(req.params.pid)
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
        const response = await ProductManager.Update(req.params.pid, req.body)
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
        const response = await ProductManager.Destroy(req.params.pid)
        return res.json({
            statusCode: 200,
            response
        })
    } catch (error) {
        return next(error)
    }
})

export default productsRouter