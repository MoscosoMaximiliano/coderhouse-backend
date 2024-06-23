import Stripe from "stripe";
import CheckoutProduct from "../dto/checkout.js";
import cartsManager from "../data/mongo/CartsManager.js";
import dao from "../data/index.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const { carts } = dao

const checkoutRepository = async (filter) => {
    try {
        let productsOnCart = await cartsManager.read(filter);
        productsOnCart = productsOnCart.map((each) => new CheckoutProduct(each));
        console.log(productsOnCart);
        const line_items = productsOnCart;
        const mode = "payment";
        const success_url = "http://localhost:8080/thanks.html";
        const intent = await stripe.checkout.sessions.create({
            line_items,
            mode,
            success_url,
        });
        return intent;
    } catch (error) {
        throw error;
    }
};


class CheckoutController {
    constructor() {
        this.model = carts
    }

    async checkout(req, res, next) {
        try {
            const { user_id } = req.session;
            req.logger.info(user_id)
            //ubicar donde está el user_id
            const response = await checkoutRepository({ user_id });
            return res.json(response);
        } catch (error) {
            return next(error);
        }
    }
}

const checkoutController = new CheckoutController();
export default checkoutController