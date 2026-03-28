async function translateText() {
    let input = document.getElementById("inputText").value;
    let target = document.getElementById("targetLang").value;

    document.getElementById("outputText").value = "Translating...";

    try {
        let response = await fetch("/translate", {
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
        console.log(data); // debug

        document.getElementById("outputText").value = data.translatedText;

    } catch (error) {
        alert("Translation failed");
        console.log(error);
    }
}

function swapLanguages() {
    let source = document.getElementById("sourceLang");
    let target = document.getElementById("targetLang");

    let inputText = document.getElementById("inputText");
    let outputText = document.getElementById("outputText");

    let tempLang = source.value;
    source.value = target.value;
    target.value = tempLang;

    let tempText = inputText.value;
    inputText.value = outputText.value;
    outputText.value = tempText;
}