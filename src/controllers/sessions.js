import service from '../services/users.service.js'
import errors from "../middleware/errors/index.js";
import nodemailer from "nodemailer";
import sendEmail from "../utils/sendEmail.js";

class SessionsController {
  constructor() {
    this.service = service;
  }
  register = async (req, res, next) => {
    const { email, name, verifiedCode } = req.user;
    await this.service.register({ email, name, verifiedCode });
    try {
      return res.success201("Registered!");
    } catch (error) {
      return next(error);
    }
  };
  login = async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .success200("Logged in!");
    } catch (error) {
      return next(error);
    }
  };
  google = async (req, res, next) => {
    try {
      return res.success200("Logged in with Google!");
    } catch (error) {
      return next(error);
    }
  };
  github = async (req, res, next) => {
    try {
      return res.success200("Logged in with Github!");
    } catch (error) {
      return next(error);
    }
  };
  me = async (req, res, next) => {
    try {
      const user = {
        email: req.user.email,
        role: req.user.role,
        photo: req.user.photo,
      };
      return res.success200(user);
    } catch (error) {
      return next(error);
    }
  };
  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").success200("Signed out!");
    } catch (error) {
      return next(error);
    }
  };
  badauth = (req, res, next) => {
    try {
      return res.error401();
    } catch (error) {
      return next(error);
    }
  };

  verifyAccount = async (req, res, next) => {
    try {
      const { email, verifiedCode } = req.body;
      const user = await service.readByEmail(email);
      if (user.verifiedCode === verifiedCode) {
        await service.update(user._id, { verified: true });
        return res.json({
          statusCode: 200,
          message: "Verified user!",
        });
      } else {
        return res.json({
          statusCode: 400,
          message: "Invalid verified token!",
        });
      }
    } catch (error) {
      return next(error);
    }
  };
  reset = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await service.readByEmail(email);
      if (!user) {
        return res.json({
          statusCode: 401,
          message: "User not found!",
        })
      }

      const token = crypto.randomBytes(20).toString("hex");
      user.resetTokenPassword = token
      user.resetPasswordExpiration = new Date() + 3600000

      await user.save()

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-email-password',
        },
      });

      const mailOptions = {
        to: user.email,
        from: 'passwordreset@yourdomain.com',
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   http://${req.headers.host}/reset/${token}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({
        statusCode: 200,
        message: "Successfully sent!",
      })
    } catch (error) {
      return next(error);
    }
  }
}

export default SessionsController;
const controller = new SessionsController();
const { register, login, google, github, me, signout, badauth, reset } = controller;
export { register, login, google, github, me, signout, badauth, reset };
