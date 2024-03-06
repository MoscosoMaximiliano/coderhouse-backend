import CustomRouter from "../CustomRouter.js";
import UserHandler from "../../middleware/userHandler.js";

import { UserDB } from '../../data/mongo/MongoManager.js'

export default class UsersRouter extends CustomRouter {
    init() {
        this.Create("/", [ "admin" ], UserHandler, async (req, res, next) => {
            try {
                const response = await UserDB.Create(req.body)
                res.success201(response)
            } catch (error) {
                return next(error)
            }
        });

        this.Read("/", [ 'public' ], async (req, res, next) => {
            try {
                const response = await UserDB.Read({})
                res.success200(response)
            } catch (error) {
                return next(error)
            }
        });

        this.Read("/:uid", [ 'public' ], async (req, res, next) => {
            try {
                const { uid } = req.params
                const response = await UserDB.ReadOne(uid)
                res.success200(response)
            } catch (error) {
                return next(error)
            }
        });

        this.Update("/:uid", [ 'admin' ], UserHandler, async (req, res, next) => {
            try {
                const { uid } = req.params
                const response = await UserDB.Update(uid, req.body)
                res.success200(response)
            } catch (error) {
                return next(error)
            }
        });

        this.Destroy("/:uid", [ 'admin' ], async (req, res, next) => {
            try {
                const { uid } = req.params
                const response = await UserDB.Destroy(uid)
                res.success200(response)
            } catch (error) {
                return next(error)
            }
        });


    }
}