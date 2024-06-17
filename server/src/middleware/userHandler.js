const UserHandler = (req, res, next) => {
    const {name, email, photo} = req.body
    if(!name || !email || !photo) {
        const error = new Error("Name, Email or Photo is required")
        error.statusCode = 404
        throw error
    } else {
        return next()
    }
}

export default UserHandler