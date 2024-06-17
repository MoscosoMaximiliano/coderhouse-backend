const ErrorHandler = (error, req, res, next) => {
    console.log(error)
    return res.json({
        status: 500,
        message: `${req.method}${req.url}${error.message}`
    })
}

export default ErrorHandler