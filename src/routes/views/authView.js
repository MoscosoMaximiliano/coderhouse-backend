import CustomRouter from '../CustomRouter.js';

export default class AuthRouter extends CustomRouter {
    init() {
        this.Create('/register', [ "public" ], async (req, res, next) => {
            try {
                return res.render('register')
            } catch (error) {
                next(error)
            }
        })

        this.Create('/login', [ "public" ], async (req, res, next) => {
            try {
                return res.render('login')
            } catch (error) {
                next(error)
            }
        })
    }
}