import { Router } from "express";
import usersRouter from "./users.js";
import productsRouter from "./products.js";
import ordersRouter from "./orders.js";


const apiRouter = Router()

apiRouter.use("/users", usersRouter)
apiRouter.use("/products", productsRouter)
// apiRouter.use("/orders", ordersRouter)

export default apiRouter