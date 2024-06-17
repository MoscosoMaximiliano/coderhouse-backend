import argsUtil from "../utils/args.js";
import dbConnection from "../utils/dbConnection.js"

const environment = argsUtil.env;

console.log(`ENV: ${environment}`)

let dao = {};

switch (environment) {
  case "test":
    //vamos a usar MEMORY
    console.log("MEMORY CONNECTED");
    const { default: productsMemory } = await import("./memory/productManager.js")
    const { default: usersMemory } = await import("./memory/userManager.js")
    const { default: ordersMemory } = await import("./memory/orderManager.js")
    dao = { events: productsMemory, users: usersMemory, orders: ordersMemory }
    break;
  case "dev":
    //vamos a usar FS
    console.log("FS CONNECTED");
    const { default: productsFs } = await import("./fs/productManager.js")
    const { default: usersFs } = await import("./fs/userManager.js")
    const { default: ordersFs } = await import("./fs/orderManager.js")
    dao = { events: productsFs, users: usersFs, orders: ordersFs }
    break;
  case "prod":
    //vamos a usar MONGO
    //aca es necesario configurar la conexión de mongo
    dbConnection()
      .then(() => console.log("MONGO CONNECTED"))
    const { default: productsMongo } = await import("./mongo/products.js")
    const { default: usersMongo } = await import("./mongo/users.js")
    const { default: ordersMongo } = await import("./mongo/orders.js")
    const { default: commentsMongo } = await import("./mongo/comments.js")
    const { default: cartsMongo } = await import("./mongo/CartsManager.js")
    dao = { events: productsMongo, users: usersMongo, orders: ordersMongo, comments: commentsMongo, carts: cartsMongo }
    break;
  default:
    break;
}

export default dao;
