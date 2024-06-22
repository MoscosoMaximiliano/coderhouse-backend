import { faker } from "@faker-js/faker"
import repository from "../../repositories/products.js"

const ProductsMock = () => {
    return {
        title: faker.commerce.productName(),
        photo: faker.image.url(),
        price: faker.commerce.price({ min: 100, max: 1000 }),
        stock: faker.number.int({ min: 1, max: 100 }),
    }
}

const createProducts = async () => {
    for (let i = 0; i < 100; i++) {
        await repository.create(ProductsMock())
    }
}

createProducts().then(r => console.log("Created Successfully"))