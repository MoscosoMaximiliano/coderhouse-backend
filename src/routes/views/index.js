import { Router } from 'express'

const viewsRouter = Router()

viewsRouter.get('/', async (req, res, next) => {
    try {
        return res.render('index', {
            username: "Maxi"
        })
    } catch (error) {
        next(error)
    }
})

viewsRouter.get('/register', async (req, res, next) => {
    try {
        return res.render('register', {})
    } catch (error) {
        next(error)
    }
})

viewsRouter.get('/real', async (req, res, next) => {
    try {
        return res.render('real', {})
    } catch (error) {
        next(error)
    }
})

viewsRouter.get('/form', async (req, res, next) => {
    try {
        return res.render('form', {})
    } catch (error) {
        next(error)
    }
})

viewsRouter.get('/orders', async (req, res, next) => {
    
})

export default viewsRouter