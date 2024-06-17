export class ProductManager {
    static #products = []
    constructor() {}
    Create  = ({title, photo, price, stock}) => {
        try {
            if(!title || !photo || !price || !stock)
                throw new Error("Please not leave blank values")

            let id = ProductManager.#products.length + 1

            ProductManager.#products.push({
                id,
                title,
                photo,
                price,
                stock
            })

            return {
                code: 200,
                msg: `Product created with id: ${id}!`
            }
        } catch (error) {
            return {
                code: 404,
                msg: error.message
            }
        }
    }

    Read = () => ProductManager.#products
    ReadOne = (id) => ProductManager.#products.find((item) => item.id === id)
    Destroy = (id) => ProductManager.#products.filter((x) => x.id !== id)
    Update = (id, data) => {
        const userId = ProductManager.#products.findIndex((user) => user.id === id)

        ProductManager.#products[userId] = data
    }
}

