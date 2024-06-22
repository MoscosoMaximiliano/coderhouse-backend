import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/data/index.js";
const { usersMongo } = dao;

const requester = supertest('http://localhost:8080' + process.env.PORT + '/api');

describe("/api/sessions", function() {
    const user = {
        name: "John",
        email: "john@gmail.com",
        password: "123456",
        role: "ADMIN"
    }
    let uid
    let token = {}
    it('registered successfully', async () => {
        const response = await requester.post("/sessions/register").send(user)
        const {_body, statusCode } = await response
        uid = _body.payload._id
        expect(statusCode).to.equal(200)
    });
    it('login successfully', async () => {
        const response = await requester.post("/sessions/login").send(user)
        const {headers, statusCode } = await response
        token.key = headers["set-cookie"][0].split("=")[0];
        token.value = headers["set-cookie"][0].split("=")[0];
        expect(statusCode).to.be.equal(200)
    })
    it('Session Closed successfully', async () => {
        const response = await requester.post("/sessions/logout").set("token", [`${token.key}=${token.value}`]);
        const {statusCode} = await response
        expect(statusCode).to.be.equal(200)
    })
    it('Deleted User successfully', async () => {
        const response = await requester.delete("/users/" + uid)
        const {statusCode} = await response
        expect(statusCode).to.be.equal(200)
    })
})

describe("/api/products", function() {
    let productId

    const product = {
        title: "Product Example",
        price: 200,
        stock: 200,
        photo: "https://s3.amazonaws.com/images/products"
    }
    it('create product', async () => {
        const response = await requester.post("/products").send(product)
        const {_body, statusCode } = await response
        productId = _body.payload._id
        expect(statusCode).to.be.equal(200)
    })
    it('gets all products', async () => {
        const response = await requester.get(`/products`)
        const {_body, statusCode} = await response
        expect(statusCode).to.be.equal(200)
        expect(_body.payload).to.be.an('array')
    })
    it('get a products', async () => {
        const response = requester.get(`/products/${productId}`)
        const {_body, statusCode} = await response
        expect(statusCode).to.be.equal(200)
    })
    it('update product', async () => {
        const response = await requester.put(`/products/${productId}`, {
            title: "Product Example 2",
            price: 123123123,
            stock: 200,
            photo: "https://s3.amazonaws.com/images/products"
        })
    })
    it('delete a product', async () => {
        const response = await requester.delete(`/products/${productId}`)
        const {_body, statusCode} = await response
        expect(statusCode).to.be.equal(200)
    })
    it('check not existing product', async () => {
        const response = await requester.post(`/products/non-exist`)
        const {_body, statusCode} = await response
        expect(statusCode).to.be.equal(404)
    })
})