import CustomRouter from "../CustomRouter.js";
import passport from "../../middleware/passport.js";
import passCallBack from "../../middleware/passCallback.js";
import {
  register,
  login,
  google,
  me,
  signout,
  badauth,
} from "../../controllers/sessions.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passCallBack("register"), register);
    this.create("/login", ["PUBLIC"], passCallBack("login"), login);
    this.create(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );
    this.read(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      google
    );
    this.create("/", ["USER", "ADMIN", "PREM"], me);
    this.create("/signout", ["USER", "ADMIN", "PREM"], signout);
    this.read("/badauth", ["PUBLIC"], badauth);
  }
}

let sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();
