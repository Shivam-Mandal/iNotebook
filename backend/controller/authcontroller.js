// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Notes from '../models/Notes.js';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// Create a new user
export const createUser = async (req, res) => {
    console.log(req.body);
    const user = User(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        let salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        let newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            newUser: {
                id: newUser.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Login user
export const loginUser = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    try {
        let success = false;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Invalid Credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Invalid Credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        };

        success = true;
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.json({ success, authToken });

    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Get logged-in user details
export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        const notes = await Notes.find({ user: req.user.id });

        res.json({
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            totalNotes: notes.length,
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send("Internal Server Error");
    }
};
