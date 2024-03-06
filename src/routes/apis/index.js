import UsersRouter from "./users.js";
import ProductsRouter from "./products.js";
import OrdersRouter from "./orders.js";
import SessionsRouter from "./sessions.js";
import CustomRouter from "../CustomRouter.js";

const users = new UsersRouter()
const products = new ProductsRouter()
const orders = new OrdersRouter()
const sessions = new SessionsRouter()

export default class ApiRouter extends CustomRouter {
    init() {
        this.Use("/users", users.GetRouter())
        this.Use("/products", products.GetRouter())
        this.Use("/orders", orders.GetRouter())
        this.Use("/sessions", sessions.GetRouter())
    }
}