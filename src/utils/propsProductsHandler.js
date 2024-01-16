const PropsProductsHandler = ({title, photo, price, stock}) => {
    if(!title || !price || !stock || !photo) {
        const error = new Error("Title, Price, Stock and Photo is required")
        error.statusCode = 404
        throw error
    }
}

export default PropsProductsHandler