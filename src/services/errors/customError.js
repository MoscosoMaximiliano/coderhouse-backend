export default class CustomError {
    static createError = ({ status = "Error", message, statusCode }) => {
        const error = new Error(`${message}`);
        error.status = status
        error.statusCode = statusCode
        throw error;
    }
}