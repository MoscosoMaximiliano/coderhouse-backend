import Order from "./models/OrderModel.js";
import Product from "./models/ProductModel.js";
import User from "./models/UserModel.js";

import notFoundOne from '../../utils/notFoundOne.js'

class MongoManager {
    constructor(model) {
        this.model = model
    }

    async Create(data) {
        try {
          const one = await this.model.create(data);
          return one;
        } catch (error) {
          throw error;
        }
      }
      async Read({ filter, order }) {
        try {
          const all = await this.model
            .find(filter, "-createdAt -updatedAt -__v")
            //.populate("user_id","-password -createdAt -updatedAt -__v")
            //.populate("event_id","name place price")
            .sort(order);
          if (all.length === 0) {
            const error = new Error("There aren't any document");
            error.statusCode = 404;
            throw error;
          }
          return all;
        } catch (error) {
          throw error;
        }
      }
      async ReadOne(id) {
        try {
          const one = await this.model.findById(id);
          notFoundOne(one);
          return one;
        } catch (error) {
          throw error;
        }
      }
      async Update(id, data) {
        try {
          const opt = { new: true };
          const one = await this.model.findByIdAndUpdate(id, data, opt);
          notFoundOne(one);
          return one;
        } catch (error) {
          throw error;
        }
      }
      async Destroy(id) {
        try {
          const one = await this.model.findByIdAndDelete(id);
          notFoundOne(one);
          return one;
        } catch (error) {
          throw error;
        }
      }
      async Stats({ filter }) {
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
}

const UserDB = new MongoManager(User)
const ProductDB = new MongoManager(Product)
const OrderDB = new MongoManager(Order)

export {
    UserDB,
    ProductDB,
    OrderDB
}