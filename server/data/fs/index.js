import {ProductManager} from "./ProductManager.js";
import {UserManager} from "./UserManager.js";

const userManager = new UserManager()

await userManager.Create({ 
    name: "Jose", 
    photo: "www.google.com", 
    email: "asd@gmail.com" 
}).then(response => console.log(response.msg))

await userManager.Read().then(response => {
    if (response.code !== 200)
        console.log(response.msg)
    else
        console.log(`\n====Read users==== \n${response.data_stringify}\n`);
})

await userManager.ReadOne(3).then(response => {
    if (response.code !== 200)
        console.log(response.msg);
    else
        console.log(`\n====ReadOne user==== \n${response.data_stringify}\n`);
})

const productManager = new ProductManager()

await productManager.Create({ 
    title: "Harry Potter", 
    photo: "www.google.com", 
    price: 2032,
    stock: 20
}).then(response => console.log(response.msg))

await productManager.Read().then(response => {
    if (response.code !== 200)
        console.log(response.msg)

    console.log(`\n====Read products==== \n${response.data_stringify}\n`);
})

await productManager.ReadOne(1).then(response => {
    if (response.code !== 200)
        console.log(response.msg);
    else
        console.log(`\n====ReadOne product==== \n${response.data_stringify}\n`);
})