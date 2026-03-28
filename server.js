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

// API
app.post("/translate", async (req, res) => {
    const { text, target } = req.body;

    try {
        const response = await axios.post(
            "https://translate.argosopentech.com/translate",
            {
                q: text,
                source: "en",
                target: target,
                format: "text"
            }
        );

        res.json({
            translatedText: response.data.translatedText
        });

    } catch (error) {
        console.log("ERROR:", error.message);

        res.json({
            translatedText: "API Error"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});