import crypto from "crypto"

import {__dirname, WriteFile, GetAllData, FileCheck} from '../../../utils.js'


class ProductManager {
    static path = "./src/data/fs/files/products.json"
    constructor() {
        FileCheck(ProductManager.path)
    }

    Create  = async ({title, photo, price, stock}) => {
        try {
            const products = await GetAllData(ProductManager.path)
            let newProduct = {
                id: crypto.randomBytes(12).toString("hex"),
                title,
                photo,
                price,
                stock
            }

            products.push(newProduct)
            
            await WriteFile(ProductManager.path, products)
            
            return newProduct.id
        } catch (error) {
            throw error
        }
    }

    Read = async () => {
        try {
            return await GetAllData(ProductManager.path)
        } catch (error) {
            throw error
        }
    }

    ReadOne = async (id) => {
        try {
            const products = await GetAllData(ProductManager.path) 
            const product = products.find((item) => item.id === id)

            if(!product)
                throw new Error("Error getting the product, this doesn't exist!")
            
            return product
        } catch (error) {
            throw error
        }
    }

    Destroy = async (id) => {
        try {
            const users = await GetAllData(ProductManager.path)
            const filteredProducts = users.filter((x) => x.id !== id)

            await WriteFile(ProductManager.path, filteredProducts)

            return "success"

        } catch (error) {
            throw error
        }

    }

    Update = async (id, data) => {
        try {
            let products = await GetAllData(ProductManager.path)
    
            const productId = products.findIndex((user) => user.id === id)
    
            if (productId === -1)
                throw new Error("User not founded")
    
            products[productId] = {...data, id: id}
    
            await WriteFile(ProductManager.path, products)
    
            return `Updated the product with ID: ${products[productId].id}`
        } catch (error) {
            throw error
        }
    }
}


const products = new ProductManager()
export default products