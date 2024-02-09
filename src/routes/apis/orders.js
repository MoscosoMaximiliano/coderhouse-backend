import { Router } from "express";
import OrderManager from '../../data/fs/orderManager.js'

import {OrderDB} from '../../data/mongo/MongoManager.js'

const ordersRouter = Router()

ordersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const one = await OrderDB.Create(data);
    return res.json({
      statusCode: 201,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.user_id) {
      filter.user_id = req.query.user_id;
    }
    const all = await OrderDB.Read({ filter });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});
  
ordersRouter.get("/total/:uid", async (req, res, next) => {
  console.log("getting total")
  try {
    const { uid } = req.params
    const response = await OrderDB.Report(uid)
    if (!response)
      throw new Error("No orders for this user")

    return res.json({
      statusCode: 200,
      response
    })
  } catch (error) {
    return next(error)
  }
})

ordersRouter.get("/:uid", async (req, res, next) => {
    try {
      const { uid } = req.params;
      const filter = { order_id: uid };
      const all = await OrderDB.Read({ filter });
      return res.json({
        statusCode: 200,
        response: all,
      });
    } catch (error) {
      return next(error);
    }
});
ordersRouter.put("/:oid", async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const one = await OrderDB.Update(oid, data);
      return res.json({
        statusCode: 200,
        response: one,
      });
    } catch (error) {
      return next(error);
    }
});
ordersRouter.delete("/:oid", async (req, res, next) => {
    try {
      const { oid } = req.params;
      const one = await OrderDB.Destroy(oid);
      return res.json({
        statusCode: 200,
        response: one,
      });
    } catch (error) {
      return next(error);
    }
});


  
export default ordersRouter