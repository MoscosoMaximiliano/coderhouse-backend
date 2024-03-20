import CustomRouter from '../CustomRouter.js';

export default class AuthRouter extends CustomRouter {
    init() {
        this.create('/register', [ "public" ], async (req, res, next) => {
            try {
                return res.render('register')
            } catch (error) {
                next(error)
            }
        })

        this.create('/login', [ "public" ], async (req, res, next) => {
            try {
                return res.render('login')
            } catch (error) {
                next(error)
            }
        })
    }
}