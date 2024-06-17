import CustomRouter from '../CustomRouter.js'

export default class ProductsViewRouter extends CustomRouter {
    init() {
        this.create('/form', [ "PUBLIC" ], async (req, res, next) => {
            try {
                return res.redirect('form')
            } catch (error) {
                next(error)
            }
        })
        this.create('/', [ "PUBLIC" ], async (req, res, next) => {
            try {
                return res.redirect('index', {
                    username: "Maxi"
                })
            } catch (error) {
                next(error)
            }
        })
    }
}