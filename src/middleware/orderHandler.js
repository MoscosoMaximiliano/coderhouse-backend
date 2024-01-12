const OrderHandler = (req, res, next) => {
    console.log(req.body)
    const {pid, uid, quantity, state} = req.body
    if(!pid || !uid || !quantity || !state) {
        const error = new Error("Product ID, User ID, Quantity and State is required")
        error.statusCode = 404
        throw error
    } else {
        return next()
    }
}

export default OrderHandler