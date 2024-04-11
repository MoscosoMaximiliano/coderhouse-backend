import MongoManager from "./MongoManager.js";
import Order from "./models/OrderModel.js";

const orders = new MongoManager(Order);
export default orders;
