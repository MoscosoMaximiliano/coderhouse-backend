import fs from "fs";

export class ProductManager {
    static path = "./app/fs/files/products.json"
    constructor() {
        ProductManager.FileCheck()
    }

    static FileCheck = () => {
        try {
            if (!fs.existsSync(ProductManager.path))
                fs.writeFileSync(ProductManager.path, JSON.stringify([], null, 2))
        } catch (error) {
            console.log(error);
        }
    }

    static GetProducts = async () => {
        const products = await JSON.parse(fs.readFileSync(ProductManager.path, 'utf-8'))

        console.log(products)

        if(!products)
            return []
        
        return products
    }

    Create  = async ({title, photo, price, stock}) => {
        try {
            if(!title || !photo || !price || !stock)
                throw new Error("Please not leave blank values")

            const products = await ProductManager.GetProducts()
            let newProduct = {
                id: products.length + 1,
                title,
                photo,
                price,
                stock
            }

            products.push(newProduct)

            await fs.promises.writeFile(
                ProductManager.path,
                JSON.stringify(products, null, 2)
            );

            return {
                code: 200,
                msg: `Product created with id: ${newProduct.id}!`
            }
        } catch (error) {
            return {
                code: 404,
                msg: error.message
            }
        }
    }

    Read = async () => {
        try {
            const products = await ProductManager.GetProducts()

            if (products.length === 0)
                throw new Error("No Products!")            

            return {
                code: 200,
                data: products
            }
        } catch (error) {
            return {
                code: 404,
                msg: error.message
            }
        }
    }

    ReadOne = async (id) => {
        try {
            const products = await ProductManager.GetProducts() 
            const product = products.find((item) => item.id === id)

            if(!product)
                throw new Error("Error getting the product, this doesn't exist!")
            
            return {
                code: 200,
                data: product
            }
        } catch (error) {
            return {
                code: 404,
                msg: error.message
            }
        }
    }
}


