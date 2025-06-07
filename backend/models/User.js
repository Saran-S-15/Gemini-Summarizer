import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength:3
    },

    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },

    profilePic: {
        type: String,
        default: ""
    }
    
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;