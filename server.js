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
import cors from 'cors'

import { Server } from 'socket.io'
import { createServer } from 'http'
import connectionOnSocket from "./src/utils/socket.js";
import env from "./src/utils/env.js";

import dbConnection from './src/utils/db.js'


const server = express()
const PORT = env.PORT || env.port

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
server.use(cookieParser(env.SECRET_SESSION))
server.use(expressSession({
    store: new MongoStore({ mongoUrl: env.MONGODB_URI, ttl: 7 * 24 * 60 * 60 }),
    secret: env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}))

//handlebars

server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')

//routes

server.use("/", IndexRouter)
server.use(errorHandler)
server.use(pathHandler)
server.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
)

// server.listen(PORT, ready)

export {
    socketServer
}