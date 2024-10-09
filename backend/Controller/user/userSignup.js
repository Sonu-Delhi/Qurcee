import mongoose from "mongoose";
import userModel from "../../models/userModels.js";
import bcrypt from 'bcryptjs';

const createUser = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        // Check if all fields are provided
        if (!email || !password || !name) {
            return res.status(400).json({
                message: "Please provide all required fields (email, password, name)",
                error: true,
                success: false
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                error: true,
                success: false
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new userModel({
            ...req.body,
            role: "GENERAL",
            password: hashedPassword
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Respond with the newly created user
        res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: "User created successfully"
        });
    } catch (err) {
        // Generic error handler
        res.status(500).json({
            message: err.message,
            error: true,
            success: false
        });
    }
};

export default createUser;
