const EEnums = {
    NOT_FOUND: { statusCode: 404, status: "error", message: "Not found document" },
    UNAUTHORIZED: { statusCode: 401, status: "auth", message: "Invalid credentials" },
    FORBIDDEN: { statusCode: 403, status: "forbidden", message: "Not Allowed" },
    BAD_REQUEST: { statusCode: 400, status: "error", message: "Bad request" },
    INTERNAL_SERVER_ERROR: {statusCode: 502, status: "error", message: 'INTERNAL_SERVER_ERROR'},
    MISSING_REQUIRED_FIELDS: { statusCode: 400, status: "error", message: "Incomplete values" },


}

export default EEnums