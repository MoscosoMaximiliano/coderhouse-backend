import EEnums from "../../services/errors/enums.js";

export default (error, req, res, next) => {
    console.log(error.cause)
    switch (error.code) {
        case EEnums.UNAUTHORIZED:
            return res.status(401).json(error)
        case EEnums.FORBIDDEN:
            return res.status(403).json(error)
        case EEnums.NOT_FOUND:
            return res.status(404).json(error)
        case EEnums.BAD_REQUEST:
            return res.status(400).json(error)
        case EEnums.INTERNAL_SERVER_ERROR:
            return res.status(500).json(error)
        default:
            return res.status(500).json(error)
    }
}
