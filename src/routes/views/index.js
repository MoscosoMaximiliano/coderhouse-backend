import { Router } from 'express'
import authViewRouter from "./authView.js";
import productsViewRouter from "./productsView.js";


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

viewsRouter.get('/auth', authViewRouter)
viewsRouter.get('/products', productsViewRouter)

viewsRouter.get('/orders', async (req, res, next) => {
    
})

export default viewsRouter