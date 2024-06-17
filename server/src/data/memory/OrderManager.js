export class OrderManager {
    static #orders = []
    constructor(){}

    Create  = ({pid, uid, quantity, state}) => {
        try {
            if(!pid || !uid || !quantity || !state)
                throw new Error("Please not leave blank values")

            let id = OrderManager.#orders.length + 1

            OrderManager.#orders.push({
                id,
                pid,
                uid,
                quantity,
                state
            })

            return {
                code: 200,
                msg: `Order created with id: ${id}!`
            }
        } catch (error) {
            return {
                code: 404,
                msg: error.message
            }
        }
    }

    Read = () => OrderManager.#orders
    ReadOne = (id) => OrderManager.#orders.find((item) => item.id === id)
    Destroy = (id) => OrderManager.#orders.filter((x) => x.id !== id)
    Update = (id, data) => {
        const orderId = OrderManager.#orders.findIndex((user) => user.id === id)

        OrderManager.#orders[orderId] = data
    }
}
