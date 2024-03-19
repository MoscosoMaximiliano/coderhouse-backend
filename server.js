import express from "express"
import "dotenv/config.js"

import IndexRouter from "./src/routes/index.js";
import pathHandler from "./src/middleware/pathHandler.js";
import errorHandler from "./src/middleware/errorHandler.js";

import { __dirname } from "./utils.js";
import morgan from "morgan";

import { engine } from 'express-handlebars'
import cookieParser from 'cookie-parser'
import expressSession from "express-session";
import sessionFileStore from 'session-file-store'
import MongoStore from 'connect-mongo'

import { Server } from 'socket.io'
import { createServer } from 'http'
import connectionOnSocket from "./src/utils/socket.js";
import { args } from "./src/utils/args.js";
import dotenv from "dotenv"

import dbConnection from './src/utils/db.js'


const server = express()
const PORT = process.env.PORT || args.port

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
server.use(express.urlencoded({ extended: true }))
server.use(express.static(__dirname + "/public"))
server.use(morgan("dev"))


const FileStore = sessionFileStore(expressSession)
server.use(cookieParser(process.env.SECRET_SESSION))
server.use(expressSession({
    store: new MongoStore({ mongoUrl: process.env.MONGODB_URI, ttl: 7 * 24 * 60 * 60 }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}))

//handlebars

server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')

//routes

const router = new IndexRouter()
server.use("/", router.GetRouter())
server.use(errorHandler)
server.use(pathHandler)
server.use(
    cors({
        origin: true,
        credentials: true
    })
)

// server.listen(PORT, ready)

export {
    socketServer
}