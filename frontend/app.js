/* =================================
   NOVAMESH AI
   MAIN JAVASCRIPT
   Version 0.1.0
================================= */

let currentMode = "text";

// MODE SELECTOR
function setMode(mode) {
  currentMode = mode;

  const imageInput = document.getElementById("image");
  const promptInput = document.getElementById("prompt");
  const status = document.getElementById("status");

  if (mode === "text") {
    imageInput.style.display = "none";
    promptInput.placeholder =
      "Describe your 3D model...";
    status.textContent =
      "Text to 3D mode selected.";
  }

  if (mode === "image") {
    imageInput.style.display = "block";
    promptInput.placeholder =
      "Add optional instructions for your image...";
    status.textContent =
      "Image to 3D mode selected.";
  }
}

// GENERATE MODEL
async function generateModel() {
  const prompt =
    document.getElementById("prompt").value.trim();

  const image =
    document.getElementById("image").files[0];

  const style =
    document.getElementById("style").value;

  const status =
    document.getElementById("status");

  const button =
    document.querySelector(".generate");

  if (currentMode === "text" && !prompt) {
    status.textContent =
      "Please enter a model description.";
    return;
  }

  if (currentMode === "image" && !image) {
    status.textContent =
      "Please select an image first.";
    return;
  }

  button.disabled = true;
  button.textContent = "Preparing request...";

  status.textContent =
    "Your request is ready. AI service is not connected yet.";

  const request = {
    mode: currentMode,
    prompt: prompt,
    style: style,
    image: image ? image.name : null
  };

  console.log("AI3D Studio request:", request);

  button.disabled = false;
  button.textContent = "✦ Generate 3D";
}

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  const imageInput =
    document.getElementById("image");

  imageInput.style.display = "none";

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];

    if (file) {
      document.getElementById("status").textContent =
        "Selected image: " + file.name;
    }
  });

  console.log("AI3D Studio initialized.");
});
    
