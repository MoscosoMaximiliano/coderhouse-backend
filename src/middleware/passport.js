import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { CreateHash, VerifyHash } from "../utils/hash.js";
import { UserDB } from "../data/mongo/MongoManager.js";
import { GenerateToken } from "../utils/token.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await UserDB.ReadByEmail(email);
        if (!one) {
          let data = req.body;
          data.password = CreateHash(password);
          let user = await UserDB.Create(data);
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await UserDB.ReadByEmail(email);
        if (user && VerifyHash(password, user.password)) {
          req.token = GenerateToken({ email, role: user.role });
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "google",
  new GoogleStrategy(
    {
      passReqToCallback: true,
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:9999/api/sessions/google/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        let user = await UserDB.ReadByEmail(profile.id + "@gmail.com");
        if (!user) {
          user = {
            email: profile.id + "@gmail.com",
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.coverPhoto,
            password: CreateHash(profile.id),
          };
          user = await UserDB.Create(user);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;