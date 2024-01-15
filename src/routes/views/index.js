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

viewsRouter.get('/products', async (req, res, next) => {
    
})

viewsRouter.get('/new-product', async (req, res, next) => {
    
})

viewsRouter.get('/orders', async (req, res, next) => {
    
})

export default viewsRouter