const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// 🔥 FREE API (LibreTranslate)
app.post("/translate", async (req, res) => {
    const { text, target } = req.body;

    try {
        const response = await axios.post(
            "https://libretranslate.de/translate",
            {
                q: text,
                source: "auto",
                target: target,
                format: "text"
            }
        );

        res.json({
            translatedText: response.data.translatedText
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            translatedText: "Error: Translation failed"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});