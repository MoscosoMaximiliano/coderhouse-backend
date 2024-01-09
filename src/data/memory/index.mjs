import { ProductManager } from "./ProductManager.mjs";
import { UserManager } from "./UserManager.mjs";

const productManager = new ProductManager()
const userManager = new UserManager()

let result = productManager.Create({title: "Berenjena"})

result.code !== 200 ? console.log(result.msg) : productManager.Read()

result = productManager.Create({title: "Berenjena", photo: "https://www.photo.com/asd", price: 300, stock: 200})

result.code !== 200 ? console.log(result.msg) : console.log(productManager.Read())

console.log(productManager.ReadOne(1))

result = userManager.Create({title: "Charlie"})

result.code !== 200 ? console.log(result.msg) : userManager.Read()

result = userManager.Create({name: "Charlie", photo: "https://www.photo.com/asd", email: "usuario@gmail.com"})

result.code !== 200 ? console.log(result.msg) : console.log(userManager.Read())

console.log(userManager.ReadOne(1))