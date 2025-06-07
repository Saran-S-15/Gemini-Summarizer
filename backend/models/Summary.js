import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    summaryType: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    response: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const Summary = mongoose.model("Summary", summarySchema);

export default Summary;