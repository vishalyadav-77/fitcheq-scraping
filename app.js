document.addEventListener("DOMContentLoaded", () => {
const startBtn = document.getElementById("startBtn");
const urlCountInput = document.getElementById("urlCount");
const urlInputsDiv = document.getElementById("urlInputs");
const currentUrlInput = document.getElementById("currentUrl");
const nextBtn = document.getElementById("nextBtn");

let totalUrls = 0;
let currentIndex = 0;
let urls = [];

startBtn.addEventListener("click", () => {
    totalUrls = parseInt(urlCountInput.value);
    if (isNaN(totalUrls) || totalUrls <= 0) {
        alert("Enter a valid number of URLs");
        return;
    }
    urlInputsDiv.style.display = "block";
    currentIndex = 0;
    urls = [];
    nextBtn.textContent = "Next";
    currentUrlInput.value = "";
    currentUrlInput.focus();
});

nextBtn.addEventListener("click", () => {
    const url = currentUrlInput.value.trim();
    if (!url) {
        alert("Enter a URL");
        return;
    }
    urls.push(url);
    currentIndex++;

    if (currentIndex < totalUrls) {
        currentUrlInput.value = "";
        currentUrlInput.focus();
        if (currentIndex === totalUrls - 1) {
            nextBtn.textContent = "Submit";
        }
    } else {
        const selectedWebsite = document.getElementById("website").value;
        // submit logic
        // All URLs submitted – POST to endpoint
        fetch("https://your-api-endpoint.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                website: selectedWebsite,
                urls: urls }) // send as JSON
        })
        .then(response => response.json())
        .then(data => {
            console.log("Server response:", data);
            alert("URLs submitted successfully!");
            // Reset UI
            urlInputsDiv.style.display = "none";
            urlCountInput.value = "";
            nextBtn.textContent = "Next";
            urls = [];
            currentIndex = 0;
        })
        .catch(error => {
            console.error("Error submitting URLs:", error);
            alert("Failed to submit URLs. Try again.");
        });
    }
});
});