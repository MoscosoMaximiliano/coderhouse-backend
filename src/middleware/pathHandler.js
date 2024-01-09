const PathHandler = (req, res, next) => {
    return res.json({
        status: 500,
        message: `${req.method} ${req.url} not found path`
    })
}

export default PathHandler