import checkoutController from "../repositories/payment.js";

const checkoutService = async (filter) => {
    try {
        const response = await checkoutController.checkout(filter);
        return response;
    } catch (error) {
        throw error;
    }
};

export default checkoutService;
