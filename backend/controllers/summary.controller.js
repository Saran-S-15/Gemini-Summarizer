import geminiResponse from "../config/gemini.config.js";
import Summary from "../models/Summary.js";

export const createSummary = async (req, res) => {
    try {
        const { title, summaryType, content } = req.body;

        if (!title || !summaryType || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const response = await geminiResponse(summaryType, content);
        if (!response) {
            return res.status(500).json({ message: "Failed to generate summary" });
        }

        const newSummary = new Summary({
            user: req.user._id,
            title,
            summaryType,
            content,
            response
        });

        if (newSummary) {
            await newSummary.save();
            res.status(201).json({
                success: true,
                message: "Summarisation successfull",
                summary: {
                    ...newSummary._doc
                }
            })
        }

        else {
            res.status(400).json({ message: "Error in summarisation" });
        }

    } catch (error) {
        console.log(`Error in createSummary controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllSummaries = async (req, res) => {
    try {
        const summaries = await Summary.find({});

        res.status(200).json({
            success: true,
            message: "Summaries fetched successfully",
            summaries
        })
    } catch (error) {
        console.log(`Error in getAllSummaries controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getSingleSummary = async (req, res) => {
    try {
        const { id } = req.params;

        const summary = await Summary.findById(id);
        if (!summary) {
            return res.status(404).json({ message: "Summary not found" });
        }

        res.status(200).json({
            success: true,
            message: "Summary fetched successfully",
            summary
        });
    } catch (error) {
        console.log(`Error in getSingleSummary controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteSummary = async (req, res) => {
    try {
        const { id } = req.params;

        const summary = await Summary.findByIdAndDelete(id);
        if (!summary) {
            return res.status(404).json({ message: "Summary not found" });
        }

        res.status(200).json({ message: "Summary deleted successfully" });
    } catch (error) {
        console.log(`Error in deleteSummary controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}