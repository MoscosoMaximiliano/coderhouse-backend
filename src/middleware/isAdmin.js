import { VerifyToken } from "../utils/token.js"

const IsAdmin = (req, res, next) => {
    try {
        const data = VerifyToken(req.headers.authorization)
        if (data.role === "admin") {
            return next()
        }
        return res.status(403).json({
            statusCode: 403,
            message: "Forbidden"
        })
    } catch (error) {
        return next(error)
    }
}

export default IsAdmin