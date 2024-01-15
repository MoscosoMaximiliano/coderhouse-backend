import { socketServer } from "../../server";
import products from "../data/fs/productManager";

export const connectionSocket =  async (socket) => {
    console.log(`Client ${socket.id} connected`)
    try {
        const allProducts = await products.Read()
        socket.emit("products", {products: allProducts})
    } catch (error) {
        console.log(error)
    }
}

export const productsSocket = (socket) => {
    const allProducts = products.Read()
    socket.emit('products', {products: allProducts})
}


