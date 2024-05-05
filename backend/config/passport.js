import dotenv from "dotenv";
dotenv.config(); // Add this at the top of your controller file

import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"; // Updated syntax
import User from "../models/userModel.js";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    User.findById(jwtPayload.userId)
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => console.error("Error finding user:", err)); // Error Handling
  })
);
