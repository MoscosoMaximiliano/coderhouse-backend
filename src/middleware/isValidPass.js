import users from "../data/mongo/users.js"
import isValidPassUtils from "../utils/isValidPass.js";
import { CreateHash, VerifyHash } from "../utils/hash.js";
import CustomError from "../services/errors/customError.js";
import errors from "../services/errors/enums.js";

async function isValidPass(req, res, next) {
  try {
    const { email, password } = req.body;
    const one = await users.readByEmail(email);

    const dbPassword = one.password;

    const isValidPassword = VerifyHash(email, dbPassword)
    if (!isValidPassword) {
      CustomError.createError(errors.UNAUTHORIZED);
    } else {
      one.password = null
      req.user = one
      return next()
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default isValidPass;
