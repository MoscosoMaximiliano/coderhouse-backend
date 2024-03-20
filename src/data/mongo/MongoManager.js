import Order from "./models/OrderModel.js";
import Product from "./models/ProductModel.js";
import User from "./models/UserModel.js";

import notFoundOne from '../../utils/notFoundOne.js'

class MongoManager {
  constructor(model) {
    this.model = model
  }

  async create(data) {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async read({ filter, sortPaginate }) {
    try {
      sortPaginate = {...sortPaginate, lean: true, limit: 10, page: 1}
      const all = await this.model
        .paginate(filter, sortPaginate)
      //.find(filter, "-createdAt -updatedAt -__v")
      //.populate("user_id","-password -createdAt -updatedAt -__v")
      //.populate("event_id","name place price")
      // .sort(order);
      if (all.length === 0) {
        const error = new Error("There aren't any document");
        error.statusCode = 404;
        throw error;
      }
      console.log(all)
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async stats({ filter }) {
    try {
      let stats = await this.model.find(filter).explain("executionStats");
      console.log(stats);
      stats = {
        quantity: stats.executionStats.nReturned,
        time: stats.executionStats.executionTimeMillis,
      };
      return stats;
    } catch (error) {
      throw error;
    }
  }
  async report(uid) {
    try {
      console.log(uid)
      const report = await this.model.aggregate([
        //$match productos de un usuario en el carrito (las órdenes de un usuario)
        { $match: { user_id: new Types.ObjectId(uid) } },
        //$lookup para popular los eventos
        {
          $lookup: {
            from: "events",
            foreignField: "_id",
            localField: "event_id",
            as: "event_id",
          },
        },
        //$replaceRoot para mergear el objeto con el objeto cero del array populado
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [ { $arrayElemAt: [ "$event_id", 0 ] }, "$$ROOT" ],
            },
          },
        },
        //$set para agregar la propiedad subtotal = price*quantity
        { $set: { subtotal: { $multiply: [ "$price", "$quantity" ] } } },
        //$group para agrupar por user_id y sumar los subtotales
        { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
        //$project para limpiar el objeto (dejar sólo user_id, total y date)
        {
          $project: {
            _id: false,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
            currency: "USD",
          },
        },
        //{ $merge: { into: "bills" }}
      ]);
      return report;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.model.findOne({ email });
      return one;
    } catch (error) {
      throw error;
    }
  }
}

// const UserDB = new MongoManager(User)
// const ProductDB = new MongoManager(Product)
// const OrderDB = new MongoManager(Order)

// export {
//   UserDB,
//   ProductDB,
//   OrderDB
// }

export default MongoManager