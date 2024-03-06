import CustomRouter from "../CustomRouter.js";

import ProductHandler from "../../middleware/productHandler.js"

import { ProductDB } from '../../data/mongo/MongoManager.js'
import passCallback from "../../middleware/passCallback.js";
import IsAdmin from "../../middleware/isAdmin.js";

export default class ProductsRouter extends CustomRouter {
    init() {
        this.Create("/",
            passCallback("jwt"),
            IsAdmin,
            ProductHandler, async (req, res, next) => {
                try {
                    const response = await ProductDB.Create(req.body)

                    res.message201(response)
                } catch (error) {
                    return next(error)
                }
            });

        this.Read("/", [ 'public' ], async (req, res, next) => {
            try {
                const response = await ProductDB.Read({})
                res.success200(response)
            } catch (error) {
                return next(error)
            }
        });

        this.Read("/:pid", [ 'public' ], async (req, res, next) => {
            try {
                const { pid } = req.params
                const response = await ProductDB.ReadOne(pid)
                res.success200(response)
            } catch (error) {
                return next(error)
            }
        });

        this.Update("/:pid", [ 'admin' ], ProductHandler, async (req, res, next) => {
            try {
                const { pid } = req.params
                const response = await ProductDB.Update(pid, req.body)
                res.success200(response)
            } catch (error) {
                return next(error)
            }
        });

        this.Destroy("/:pid", [ 'admin' ], async (req, res, next) => {
            try {
                const { pid } = req.params
                const response = await ProductDB.Destroy(pid)
                res.success200(response)
            } catch (error) {
                return next(error)
            }
        });
    }
}