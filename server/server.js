import express from "express"
import productManager from "./data/fs/ProductManager.js";
import userManager from "./data/fs/UserManager.js";

const server = express()
const PORT = 8080

const ready = () => {
    console.log(`Server Ready on port ${PORT}`)
}

server.listen(PORT, ready)

server.use(express.urlencoded({extended: true}))

server.get("/", (req, res) => {
    res.status(200).send({
        msg: "Is working"
    })
})

server.get("/api/products", async (req, res) => {
    try {
        const response = await productManager.Read()
        response.code === 404 ? res.status(404).send({
            success: false,
            message: "not found!",
        }) : res.status(200).send({
            success: true,
            response: response.data,
        })        
    } catch (error) {
        console.log(error.message)
        res.status(404).send({
            success: false,
            message: "not found!"
        })
    }
})

server.get("/api/products/:pid", async (req, res) => {
    try {
        const {pid} = req.params
        const response = await productManager.ReadOne(pid)
        response.code === 404 ? res.status(404).send({
            success: false,
            message: "not found!"
        }) : res.status(200).send({
            success: true,
            response: response.data
        })
    } catch (error) {
        console.log(error.message)
        res.status(404).send({
            success: false,
            message: "not found!"
        })
    }
})

server.get("/api/users", async (req, res) => {
    try {
        const response = await userManager.Read()
        response.code === 404 ? res.status(404).send({
            success: false,
            message: "not found!"
        }) : res.status(200).send({
            success: true,
            response: response.data
        })
    } catch (error) {
        console.log(error.message)
        res.status(404).send({
            success: false,
            message: "not found!"
        })
    }
})

server.get("/api/users/:uid", async (req, res) => {
    try {
        const {uid} = req.query
        const response = await userManager.ReadOne(uid)
        response.code === 404 ? res.status(404).send({
            success: false,
            message: "not found!"
        }) : res.status(200).send({
            success: true,
            response: response.data
        })
    } catch (error) {
        console.log(error.message)
        res.status(404).send({
            success: false,
            message: "not found!"
        })
    }
})