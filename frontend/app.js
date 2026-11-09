// NovaMesh AI - Frontend API connection

const API_BASE_URL = "https://YOUR-SERVICE.onrender.com";

let currentMode = "text";

function showMessage(message) {
    let output = document.getElementById("generationStatus");

    if (!output) {
        output = document.createElement("p");
        output.id = "generationStatus";

        const button = document.querySelector(
            'button[onclick="generateModel()"]'
        );

        if (button) {
            button.insertAdjacentElement("afterend", output);
        } else {
            document.body.appendChild(output);
        }
    }

    output.textContent = message;
}

function setMode(mode) {
    currentMode = mode;

    const imageInput = document.getElementById("image");

    if (imageInput) {
        imageInput.style.display =
            mode === "image" ? "block" : "none";
    }

    showMessage(
        mode === "image"
            ? "Image to 3D mode selected."
            : "Text to 3D mode selected."
    );
}

async function generateModel() {
    const prompt = document.getElementById("prompt");
    const style = document.getElementById("style");
    const image = document.getElementById("image");

    try {
        showMessage("Connecting to NovaMesh AI backend...");

        let response;

        if (currentMode === "image") {
            if (!image || !image.files.length) {
                showMessage("Please select an image first.");
                return;
            }

            const formData = new FormData();
            formData.append("file", image.files[0]);

            response = await fetch(
                `${API_BASE_URL}/api/generate/image`,
                {
                    method: "POST",
                    body: formData
                }
            );
        } else {
            if (!prompt || !prompt.value.trim()) {
                showMessage("Please enter a 3D model description.");
                return;
            }

            response = await fetch(
                `${API_BASE_URL}/api/generate/text`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        prompt: prompt.value,
                        style: style ? style.value : "Realistic",
                        quality: "Standard"
                    })
                }
            );
        }

        const result = await response.json();

        if (result.status === "not_configured") {
            showMessage(
                "Backend connected. AI generation model is not installed yet."
            );
        } else if (!response.ok) {
            showMessage("Server error: " + response.status);
        } else {
            showMessage(result.message || "Request completed.");
        }

    } catch (error) {
        showMessage(
            "Cannot connect to backend. Check the API address and deployment."
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setMode("text");
});
