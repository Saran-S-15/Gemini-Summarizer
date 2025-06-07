import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateTokenAndSetCookie from "../config/generateTokenAndSetCookie.js"
import commonPasswords from "../utils/commonPasswords.js";

export const signup = async (req, res) => {
    try {
        const { username, fullName, email, password, gender } = req.body;
        if (!username || !fullName || !email || !password || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (username.length < 3) {
            return res.status(400).json({ message: "Username must be at least 3 characters" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        if (commonPasswords.includes(password)) {
            return res.status(400).json({ message: "Password is not strong" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            username,
            fullName,
            email,
            password: hashedPassword,
            gender,
            profilePic: gender == "Male" ? maleProfilePic : femaleProfilePic
        });

        if (newUser) {
            await newUser.save();
            generateTokenAndSetCookie(newUser._id, res);

            res.status(201).json({
                success: true,
                message: "User created successfully",
                user: {
                    ...newUser._doc
                }
            })

        }

        else {
            res.status(400).json({ message: "Error creating User" })
        }

    } catch (error) {
        console.log(`Error in signup Controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log(`Error in login Controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log(`Error in logout Controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({
            success: true,
            message:"User session hasn't expired",
            user: {
                ...user._doc
            }
        })
    } catch (error) {
        console.log(`Error in checkAuth Controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}