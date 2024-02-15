import { Router } from "express";
import { users as UserDB } from "../../data/mongo/MongoManager.js";
import has8char from "../../middleware/has8char.js";
import isValidPass from "../../middleware/isValidPass.js";

const sessionsRouter = Router()

//register
sessionsRouter.post("/register", has8char, async (req, res, next) => {
    try {
      const data = req.body;
      await UserDB.create(data);
      return res.json({
        statusCode: 201,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  });
  
  //login
  sessionsRouter.post("/login", isValidPass, async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (email && password === "hola1234") {
        req.session.email = email;
        req.session.role = "user";
        return res.json({
          statusCode: 200,
          message: "Logged in!",
          session: req.session,
        });
      }
      const error = new Error("Bad Auth");
      error.statusCode = 401;
      throw error;
    } catch (error) {
      return next(error);
    }
  });
  
  //me
  sessionsRouter.post("/", async (req, res, next) => {
    try {
      if (req.session.email) {
        return res.json({
          statusCode: 200,
          message: "Session with email: " + req.session.email,
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

export default sessionsRouter