import checkoutController from "../../controllers/payments.js";
import CustomRouter from "../CustomRouter.js";


class PaymentRouter extends CustomRouter {
    init() {
        this.create("/checkout", [ "USER", "PREM" ], checkoutController);
    }
}


const paymentsRouter = new PaymentRouter()
export default paymentsRouter.getRouter()