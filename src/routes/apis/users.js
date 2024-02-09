import { Router } from "express";
import UserManager from "../../data/fs/userManager.js";
import UserHandler from "../../middleware/userHandler.js";

import { UserDB } from '../../data/mongo/MongoManager.js'

const usersRouter = Router()

usersRouter.post("/", async (req, res, next) => {
    try {
        const data = req.body;
        const response = await UserDB.Create(data);
        return res.json({
            statusCode: 201,
            response,
        });
    } catch (error) {
        return next(error);
    }
});
usersRouter.get("/", async (req, res, next) => {
    try {
        const all = await UserDB.Read({});
        //mas adelante read va a necesitar un parámetros para
        //paginar, ordenar y filtrar
        return res.json({
            statusCode: 200,
            response: all,
        });
    } catch (error) {
        return next(error);
    }
});
usersRouter.get("/stats", async (req, res, next) => {
    try {
        const all = await UserDB.Stats({});
        return res.json({
            statusCode: 200,
            response: all,
        });
    } catch (error) {
        return next(error);
    }
});
usersRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const one = await UserDB.ReadOne(uid);
        return res.json({
            statusCode: 200,
            response: one,
        });
    } catch (error) {
        return next(error);
    }
});
usersRouter.put("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const one = await UserDB.Update(uid, data);
        return res.json({
            statusCode: 200,
            response: one,
        });
    } catch (error) {
        return next(error);
    }
});
usersRouter.delete("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const one = await UserDB.Destroy(uid);
        return res.json({
            statusCode: 200,
            response: one,
        });
    } catch (error) {
        return next(error);
    }
});


export default usersRouter