import { VerifyToken } from "../utils/token.js";
import CustomError from "../services/errors/customError.js";
import errors from "../services/errors/enums.js";

export default async (req, res, next) => {
    try {
        const data = VerifyToken(req.cookies.token);
        if (!data) return CustomError.createError(errors.UNAUTHORIZED)

        return next();
    } catch (error) {
        return next(error)
    }
}