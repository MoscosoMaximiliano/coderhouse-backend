import jwt from "jsonwebtoken";

const GenerateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

const VerifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

export {
    GenerateToken,
    VerifyToken
}