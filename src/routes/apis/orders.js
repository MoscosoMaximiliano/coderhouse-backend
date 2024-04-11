import CustomRouter from "../../routes/CustomRouter.js";

import { OrderDB } from '../../data/mongo/MongoManager.js'

export default class OrdersRouter extends CustomRouter {

  init() {
    this.Create("/", [ "public" ], async (req, res, next) => {
      try {
        const data = req.body;
        const one = await OrderDB.Create(data);
        res.success201(one)
      } catch (error) {
        return next(error);
      }
    });

    this.Read("/", [ "public" ], async (req, res, next) => {
      try {
        const all = await OrderDB.Read({});
        res.success200(all)
      } catch (error) {
        return next(error);
      }
    });

    this.Read("/:oid", [ "public" ], async (req, res, next) => {
      try {
        const { oid } = req.params
        const response = await OrderDB.ReadOne(oid)
        res.success200(response)
      } catch (error) {
        return next(error)
      }
    });

    this.Update("/:oid", [ "public" ], async (req, res, next) => {
      try {
        const { oid } = req.params
        const data = req.body
        const response = await OrderDB.Update(oid, data)
        res.success200(response)
      } catch (error) {
        return next(error)
      }
    });

    this.Destroy("/:oid", [ "public" ], async (req, res, next) => {
      try {
        const { oid } = req.params
        const response = await OrderDB.Destroy(oid)
        res.success200(response)
      } catch (error) {
        return next(error)
      }
    });

    this.Read("/total/:uid", [ "public" ], async (req, res, next) => {
      try {
        const { uid } = req.params
        const response = await OrderDB.Report(uid)
        res.success200(response)
      } catch (error) {
        return next(error)
      }
    })
  }
}