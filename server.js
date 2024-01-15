import express from "express"

import router from "./src/routes/index.js"
import pathHandler from "./src/middleware/pathHandler.js";
import errorHandler from "./src/middleware/errorHandler.js";

import {__dirname} from "./utils.js";
import morgan from "morgan";

import { engine } from 'express-handlebars'

import { Server } from 'socket.io'
import { createServer } from 'htpp'
import { connectionSocket } from "./src/utils/socket.js";

const server = express()
const PORT = 8080

const ready = () => {
    console.log(`Server Ready on port ${PORT}`)
}

const httpServer = createServer(server)
const socketServer = new Server(httpServer)
httpServer.listen(PORT, ready)
socketServer.on('connection', connectionSocket)

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(express.static(__dirname+"/public"))
server.use(morgan("dev"))

server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')

server.use("/", router)
server.use(errorHandler)
server.use(pathHandler)

server.listen(PORT, ready)

export {
    socketServer
}