import { Router } from 'express'

const authRouter = Router()

viewsRouter.get('/register', async (req, res, next) => {
    try {
        return res.render('register', {})
    } catch (error) {
        next(error)
    }
})

viewsRouter.get('/login', async (req, res, next) => {
    try {
        return res.render('index', {
            username: "Maxi"
        })
    } catch (error) {
        next(error)
    }
})

export default authRouter