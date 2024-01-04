/* 
ACTIVIDAD OPCIONAL 1:
1- definir un arreglo de productos (inicialmente vacío)
2- definir una función que agregue un objeto al array de productos (será un producto con los campos id, nombre y precio)
3- definir una función que busque un producto (pasando el id del producto)
4- definir una función que actualice un producto (pasando el id del producto)
5- definir una función que quite un producto (pasando el id del producto)
*/

products = []

const AddProduct = (id, productName, price) => products.push({"id": id, "name": productName, "price": price})

const SearchProduct = (id) =>{ return products.find((item) => item.id === id)}

const UpdateProduct = (newProduct) => {
    const prod = SearchProduct(newProduct.id)

    if(prod !== undefined) {
        prod.name = newProduct.name
        prod.price = newProduct.price
    } else {
        console.log("Product not founded!");
    }
} 

const RemoveProduct = (id) => {
    products = products.filter((item) => item.id !== id)
}

AddProduct(0, "Manzana", 32)
AddProduct(1, "Pera", 42424)
AddProduct(2, "Cereza", 123123)

UpdateProduct({id: 0, name: "Naranja", price: 123})

RemoveProduct(2)

console.log(products);