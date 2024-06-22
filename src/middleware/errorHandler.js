import {addLogger} from "../utils/logger.js";

const ErrorHandler = (error, req, res, next) => {
    addLogger.error(error)
    return res.json({
        status: 500,
        message: `${req.method}${req.url}${error.message}`
    })
}

export default ErrorHandler