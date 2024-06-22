import CustomRouter from '../CustomRouter.js';

export default class AuthRouter extends CustomRouter {
    init() {
        this.create('/register', [ "PUBLIC" ], async (req, res, next) => {
            try {
                return res.redirect('register')
            } catch (error) {
                next(error)
            }
        })

        this.create('/login', [ "PUBLIC" ], async (req, res, next) => {
            try {
                return res.redirect('login')
            } catch (error) {
                next(error)
            }
        })
    }
}