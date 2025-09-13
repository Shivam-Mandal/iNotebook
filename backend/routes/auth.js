// routes/authRoutes.js
import express from 'express';
import { body } from 'express-validator';
import fetchuser from '../middleware/fetchuser.js';
import jwt from 'jsonwebtoken'
import { createUser, loginUser, getUserDetails } from '../controller/authcontroller.js';
import dotenv from 'dotenv'
dotenv.config()
import passport from 'passport';
import session from 'express-session'

const router = express.Router();

// Redirect to Google login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login",  session: false }),
  (req, res) => {
    console.log("✅ Callback reached with user:", req.user);

    const user = req.user;
    const token = jwt.sign({ id: user._id, email:req.user.email }, process.env.SESSION_SECRET, { expiresIn: "1h" });

    res.redirect(`http://localhost:3000/?token=${token}`); // send token to React app
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

// Route 1: Creating a new user using POST - api/auth/createuser
router.post('/createuser', [
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 4 characters").isLength({ min: 4 })
], createUser);

// Route 2: Authenticating a user using POST /api/auth/login
router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be blank").exists(),
], loginUser);

// Route 3: Get logged-in user details using POST - api/auth/getuser
router.post("/getuser", fetchuser, getUserDetails);

export default router;
