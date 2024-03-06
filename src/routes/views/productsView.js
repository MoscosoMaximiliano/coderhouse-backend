import CustomRouter from '../CustomRouter.js'

export default class ProductsViewRouter extends CustomRouter {
    init() {
        this.Create('/form', [ "public" ], async (req, res, next) => {
            try {
                return res.render('form')
            } catch (error) {
                next(error)
            }
        })
    }
}