import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { CreateHash, VerifyHash } from "../utils/hash.js";
import { GenerateToken } from "../utils/token.js";
import { ExtractJwt, Strategy as JwtEstStrategy } from "passport-jwt";

import UserDTO from '../dto/user.js'
import dao from '../data/index.js'
const {users} = dao

import env from "../utils/env.js"

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await users.readByEmail(email);
        if (!one) {
          let data = req.body;
          data.password = CreateHash(password);
          data = new UserDTO(data)
          let user = await users.Create(data);
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
        const user = await users.readByEmail(email);
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
  "jwt",
  new JwtEstStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([ (req) => req?.cookies.token ]),
      secretOrKey: env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await users.readByEmail(jwtPayload.email);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
)


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
        let user = await users.readByEmail(profile.id + "@gmail.com");
        if (!user) {
          user = {
            email: profile.id + "@gmail.com",
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.coverPhoto,
            password: CreateHash(profile.id),
          };
          user = await users.Create(user);
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