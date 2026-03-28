app.post("/translate", async (req, res) => {
    const { text, target } = req.body;

    try {
        const response = await axios.post(
            "https://translate.argosopentech.com/translate",
            {
                q: text,
                source: "en",   // ✅ FIXED
                target: target,
                format: "text"
            }
        );

        console.log("API:", response.data);

        res.json({
            translatedText: response.data.translatedText
        });

    } catch (error) {
        console.log("ERROR:", error.response?.data || error.message);

        res.json({
            translatedText: "API Error"
        });
    }
});