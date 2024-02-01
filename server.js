import express from "express"
import  "dotenv/config.js"

import router from "./src/routes/index.js"
import pathHandler from "./src/middleware/pathHandler.js";
import errorHandler from "./src/middleware/errorHandler.js";

import {__dirname} from "./utils.js";
import morgan from "morgan";

import { engine } from 'express-handlebars'

import { Server } from 'socket.io'
import { createServer } from 'http'
import connectionOnSocket from "./src/utils/socket.js";

import dbConnection from './src/utils/db.js'

const server = express()
const PORT = 8080

const ready = () => {
    console.log(`Server Ready on port ${PORT}`)
    dbConnection()
}

//websocket

const httpServer = createServer(server)
const socketServer = new Server(httpServer)
httpServer.listen(PORT, ready)
socketServer.on('connection', connectionOnSocket)

//middleware

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(express.static(__dirname+"/public"))
server.use(morgan("dev"))

//handlebars

server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')

//routes

server.use("/", router)
server.use(errorHandler)
server.use(pathHandler)

// server.listen(PORT, ready)

export {
    socketServer
}