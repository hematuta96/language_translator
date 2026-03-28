const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Serve frontend files
app.use(express.static(path.join(__dirname)));

// 🔥 Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const API_KEY = process.env.API_KEY;

app.post("/translate", async (req, res) => {
    const { text, target } = req.body;

    try {
        const response = await axios.post(
            `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
            {
                q: text,
                target: target
            }
        );

        res.json({
            translatedText: response.data.data.translations[0].translatedText
        });

    } catch (error) {
    console.log("FULL ERROR:", error.response?.data || error.message);
    res.status(500).json({
        error: error.response?.data || error.message
    });
}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});