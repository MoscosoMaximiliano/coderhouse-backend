import { UserDB } from "../data/mongo/MongoManager.js";
import isValidPassUtils from "../utils/isValidPass.js";
import { CreateHash } from "../utils/hash.js";

async function isValidPass(req, res, next) {
  try {
    const { email, password } = req.body;
    const one = await UserDB.ReadByEmail(email);

    const dbPassword = one.password;
    const hashedPassword = CreateHash(password);

    isValidPassUtils(hashedPassword, dbPassword);
    return next();
  } catch (error) {
    return next(error);
  }
}

export default isValidPass;
