import { VerifyToken } from "../utils/token.js";

export default async (req, res, next) => {
    try {
        const data = VerifyToken(req.cookies.token);
        if (!data) return res.status(403).json({
            statusCode: 403,
            message: "Forbidden"
        })

        return next();
    } catch (error) {
        return next(error)
    }
}