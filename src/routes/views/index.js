import AuthViewRouter from "./authView.js";
import ProductsViewRouter from "./productsView.js";
import CustomRouter from '../CustomRouter.js';

const authView = new AuthViewRouter()
const productsView = new ProductsViewRouter()

export default class ViewsRouter extends CustomRouter {
    init() {
        this.Create("/", [ "public" ], async (req, res, next) => {
            try {
                return res.render('index', {
                    username: "Maxi"
                })
            } catch (error) {
                next(error)
            }
        })

        this.Use("/auth", authView.GetRouter())
        this.Use("/products", productsView.GetRouter())
    }
}