const OrderHandler = (req, res, next) => {
    console.log(req.body)
    const {title, price, stock, photo} = req.body
    if(!title || !price || !stock || !photo) {
        const error = new Error("Title, Price, Stock and Photo is required")
        error.statusCode = 404
        throw error
    } else {
        return next()
    }
}

export default OrderHandler