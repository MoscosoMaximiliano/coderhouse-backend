import UsersRouter from "./users.js";
import ProductsRouter from "./products.js";
import OrdersRouter from "./orders.js";
import SessionsRouter from "./sessions.js";
import CommentRouter from './comments.js'

import CustomRouter from "../CustomRouter.js";

class ApiRouter extends CustomRouter {
    init() {
        this.use("/users", UsersRouter)
        this.use("/products", ProductsRouter)
        this.use("/orders", OrdersRouter)
        this.use("/sessions", SessionsRouter)
        this.use("/comments", CommentRouter)
    }
}

const apiRouter = new ApiRouter()
export default apiRouter.getRouter()