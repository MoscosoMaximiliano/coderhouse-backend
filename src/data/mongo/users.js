import MongoManager from "./MongoManager.js";
import User from "./models/UserModel.js";

const users = new MongoManager(User);
export default users;
