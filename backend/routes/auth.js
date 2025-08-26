import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

//Register
router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    try {
        if (!username || !email || !password) {
            return res
            .status(400)
            .json({message: "Please fill all the fields"})
        }

        const userExists = await User.findOne({email})
        if (userExists){
            return res
            .status(400)
            .json({message: "User already exists"})
        }

        const user = await User.create({username, email, password});
        res.status(201).json()

    } catch (err){
       res.status(500).json({message: "Server error"});
    }
})

//Login
router.post('/login', async (req, res) => {
    const {username, email, password} = req.body;
        try {
        if (!email || !password) {
            return res
            .status(400)
            .json({message: "Please fill all the fields"})
        }
        const user = await User.findOne({email});

        if (!user || !(await user.matchPassword(password))) {
            return res
                .status(401)
                .json({ message: "Invalid creditials"})
        }

        res.status(200).json({
            is: user._id,
            username: user.username,
            email: user.email,
        })
    } catch (err){
       res.status(500).json({message: "Server error"});
    }
})

// Me
router.get("/me", async (req, res) => {
    res.status(200).json(req.user)
})

//Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({id}, process.JWT_SECRET, {expiresIn: "30d"})
}

export default router;