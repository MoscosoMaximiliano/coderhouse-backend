import addLogger from "../utils/logger.js";

function wintson(req, res, next) {
    try {
        req.logger = addLogger;
        const message = `${req.method} ${req.url} - ${(new Date()).toLocaleString()}`;
        req.logger.HTTP(message);
        return next();
    } catch (error) {
        return next(error);
    }
}

export default wintson;
