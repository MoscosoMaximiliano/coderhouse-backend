import MongoManager from "./MongoManager.js";
import Event from "./models/ProductModel.js";

const events = new MongoManager(Event);
export default events;
