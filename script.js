async function translateText() {
    let input = document.getElementById("inputText").value;
    let target = document.getElementById("targetLang").value;

    document.getElementById("outputText").value = "Translating...";

    try {
        let response = await fetch("https://lang-trans-ql5x.onrender.com/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: input,
                target: target
            })
        });

        let data = await response.json();
        document.getElementById("outputText").value = data.translatedText;

    } catch (error) {
        alert("Translation failed");
        console.log(error);
    }
}