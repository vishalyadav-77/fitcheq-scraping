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
    if (totalUrls === 1) {
        nextBtn.textContent = "Submit";
    }
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
        fetch("http://127.0.0.1:5000/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "website": selectedWebsite,
                "urls": urls }) // send as JSON
        })
        .then(response => response.json())
        .then(data => {
            console.log("Server response:", data);
            alert("URLs submitted successfully!");

            const outputDiv = document.getElementById("result-div");
            let items = data.result;

            items.forEach((item, index) => {
            // Title
            let pTitle = document.createElement("p");
            pTitle.textContent = `Title ${index + 1}: ${item.title}`;
            outputDiv.appendChild(pTitle);

            // URL
            let pUrl = document.createElement("p");
            pUrl.textContent = `URL ${index + 1}: ${item.url}`;
            outputDiv.appendChild(pUrl);

            // Images
            item.images.forEach((img, i) => {
                let pImg = document.createElement("p");
                pImg.textContent = `Image ${i + 1}: ${img}`;
                outputDiv.appendChild(pImg);
            });

            // Add a separator line
            let hr = document.createElement("hr");
            outputDiv.appendChild(hr);
            });

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