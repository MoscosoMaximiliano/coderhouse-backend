import { Router } from 'express'

const productsViewRouter = Router()

productsViewRouter.get('/form', async (req, res, next) => {
    try {
        return res.render('form', {})
    } catch (error) {
        next(error)
    }
})


export default productsViewRouter