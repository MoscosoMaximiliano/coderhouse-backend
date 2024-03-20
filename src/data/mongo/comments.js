import MongoManager from "./MongoManager.js";
import Comment from "./models/CommentModel.js";

const comments = new MongoManager(Comment);
export default comments;
