import PropsProductsHandler from "./propsProductsHandler.js";


export default async (socket) => {
    console.log(`client ${socket.id} connected`)
    // socket.emit("products", await ProductDB.Read({}))
    
    socket.on("new product", async (data) => {
        try {
            data.photo = "https://random.responsiveimages.io/300/300"
            console.log(data)
            // add the product
            PropsProductsHandler(data)
            // ProductDB.Create(data)
            // socketServer.emit("products", await ProductDB.Read())
        } catch (error) {
            console.log(error)
        }
    })

    // socket.on("new user", async (data) => {
    //     try {
    //         // add the product
    //         PropsProductsHandler(data)
    //         products.Create(data)
    //         socketServer.emit("products", await products.Read())
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })
    
}

