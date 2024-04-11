import { Router } from "express";
import passport from "../../middleware/passport.js";

import { UserDB } from "../../data/mongo/MongoManager.js";
import has8char from "../../middleware/has8char.js";
import isValidPass from "../../middleware/isValidPass.js";

const sessionsRouter = Router();

// GOOGLE
sessionsRouter.post(
  "/google",
  passport.authenticate("google", { scope: [ "email", "profile" ] })
);

sessionsRouter.get(
  "google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/sessions/badauth",
    session: false,
  }),
  (req, res, next) => {
    try {
      req.session.email = req.user.email;
      req.session.role = "user";
      return res.json({
        statusCode: 200,
        message: "Logged in!",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

//register
sessionsRouter.post(
  "/register",
  has8char,
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      const data = req.body
      await UserDB.Create(data);
      return res.json({
        statusCode: 201,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//login
sessionsRouter.post(
  "/login",
  //isValidPass,
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in!",
        token: req.token,
      });
    } catch (error) {
      return next(error);
    }
  }
);

//me
sessionsRouter.post("/", async (req, res, next) => {
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
});

//signout
sessionsRouter.post("/signout", async (req, res, next) => {
  try {
    if (req.session.email) {
      req.session.destroy();
      return res.json({
        statusCode: 200,
        message: "Signed out!",
      });
    } else {
      const error = new Error("No Auth");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

//badauth
sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Bad auth",
    });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
