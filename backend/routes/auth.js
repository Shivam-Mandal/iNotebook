const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const fetchuser = require("../middleware/fetchuser")
const jwt = require("jsonwebtoken");
const JWT_SECRET = "HelloWorld@IamShivam"

//Route 1: creatign a new user using POST- api/auth/createuser
router.post('/createuser', [
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 4 characters").isLength({ min: 4 })

], async (req, res) => {

    console.log(req.body);
    const user = User(req.body);
    // user.save();
    // res.send(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        // findOne is asynchronous method so we need to use await as it return promis
        let existingUser = await User.findOne({ email: req.body.email })
        if (existingUser != null) {
            return res.status(400).json({ error: "email already exist" })
            
        }

        // genSalt is asynchronous method so we need to use await as it return promis
        let salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);
        // create is asynchronous method so we need to use await as it return promis
        let newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        // using jwt sign method to send the token
        const data = {
            newUser: {
                id: newUser.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({ authToken })
        // return res.json(newUser)
    }

    catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
            // Duplicate key error, email already exists
            return res.status(400).json({ error: "Email already exists" });
        }
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    };
})


//Route 2: Authenticating a user usig post /api/auth/login
router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be blank").exists(),
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    try {
        let success= false;
        let user = await User.findOne({ email })
        if (!user) {
            success = false
            return res.status(400).json({success, error: "Email is not correct" })
        }
        //comparing the password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false
            return res.status(400).json({success, error: "Password is not correct" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        // console.log("data->user.id",data.user.id)
        success=true
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.json({success, authToken })
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
            // Duplicate key error, email already exists
            return res.status(400).json({ error: "Email already exists" });
        }
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }

}
)

// Router 3: Get loggedin user details using POST - api/auth/getuser
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }catch(error){
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;