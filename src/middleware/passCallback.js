import passport from "./passport.js";

export default (strategy) => {
    return (req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if (err)
                return next(err);

            if (!user)
                return res.error400(info.message || info.toString())

            req.user(user, (err) => {
                if (err)
                    return next(err);
                return next();
            });
        })(req, res, next);
    };
}