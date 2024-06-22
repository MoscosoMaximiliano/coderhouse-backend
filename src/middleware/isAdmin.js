import { VerifyToken } from "../utils/token.js"
import CustomError from "../services/errors/customError.js";
import errors from "../services/errors/enums.js";

const IsAdmin = (req, res, next) => {
    try {
        const data = VerifyToken(req.headers.authorization)
        if (data.role === "admin") {
            return next()
        }
        return CustomError.createError(errors.FORBIDDEN)
    } catch (error) {
        return next(error)
    }
}

export default IsAdmin