import passCallback from "../../middleware/passCallback.js";
import CustomRouter from "../CustomRouter.js";

import { UserDB } from "../../data/mongo/MongoManager.js";
import has8char from "../../middleware/has8char.js";
import isValidPass from "../../middleware/isValidPass.js";
import isAdmin from "../../middleware/isAdmin.js";
import passport from "../../middleware/passport.js";

export default class SessionsRouter extends CustomRouter {
  init() {
    this.Create("/",
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      [ "public" ], async (req, res, next) => {
        try {
          if (req.session.email) {
            return res.json({
              statusCode: 200,
              message: "Session with email: " + req.session.email,
              token: req
            });
          } else {
            const error = new Error("No Auth");
            error.statusCode = 400;
            throw error;
          }
        } catch (error) {
          return next(error);
        }
      })
    this.Create("/register", [ "public" ], passCallback("register"), has8char, async (req, res, next) => {
      try {
        const response = await UserDB.Create(req.body)
        res.message("Registered")
      } catch (error) {
        return next(error)
      }
    })

    this.Create("/login", [ "public" ], passCallback("login"), async (req, res, next) => {
      try {
        res.cookie(
          "token",
          req.token,
          {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
          }
        ).message("Logged in!")
      } catch (error) {
        return next(error)
      }
    })

    this.Read("/signout",
      passport.authenticate("jwt", { session: false }),
      [ "public" ], async (req, res, next) => {
        try {
          res.clearCookie("token").message("Signed out!")
        } catch (error) {
          return next(error)
        }
      })

    //! Need to add the google login method
  }
}