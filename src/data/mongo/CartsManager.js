import Cart from "./models/cartModel.js";
import Manager from "./MongoManager.js";

const cartsManager = new Manager(Cart);
export default cartsManager;
