document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startBtn");
    const urlCountInput = document.getElementById("urlCount");
    const urlInputsDiv = document.getElementById("urlInputs");
    const currentUrlInput = document.getElementById("currentUrl");
    const nextBtn = document.getElementById("nextBtn");

    let totalUrls = 0;
    let currentIndex = 0;
    let urls = [];

    // Hide URL input initially
    urlInputsDiv.style.display = "none";

    // Start button logic
    startBtn.addEventListener("click", () => {
        totalUrls = parseInt(urlCountInput.value);
        if (isNaN(totalUrls) || totalUrls <= 0) {
            alert("Enter a valid number of URLs");
            return;
        }

        urlInputsDiv.style.display = "block";
        currentIndex = 0;
        urls = [];
        currentUrlInput.value = "";
        currentUrlInput.focus();

        // Reset next button text
        nextBtn.disabled = false;
        nextBtn.querySelector(".btn-text").textContent = totalUrls === 1 ? "Submit" : "Next";
    });

    // Next/Submit button logic
    nextBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent form submission/reload

        const url = currentUrlInput.value.trim();
        if (!url) {
            alert("Enter a URL");
            return;
        }

        urls.push(url);
        currentIndex++;

        if (currentIndex < totalUrls) {
            // More URLs to input
            currentUrlInput.value = "";
            currentUrlInput.focus();

            // Change button to Submit on last URL
            if (currentIndex === totalUrls - 1) {
                nextBtn.querySelector(".btn-text").textContent = "Submit";
            }
        } else {
            // All URLs entered, now submit
            const selectedWebsite = document.querySelector('input[name="contact"]:checked')?.value;
            if (!selectedWebsite) {
                alert("Select a website");
                return;
            }

            // POST to backend
            fetch("/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ website: selectedWebsite, urls })
            })
            .then(res => {
                 if(!res.ok) {
                        // try to parse JSON error if possible, else throw status text
                        return res.text().then(text => {
                            let msg;
                            try {
                                msg = JSON.parse(text).error || text;
                            } catch {
                                msg = text;
                            }
                            throw new Error(`Server error (${res.status}): ${msg}`);
                        });
                    }
                    return res.json();
            })
            .then(data => {
                console.log("Server response:", data);
                alert("URLs submitted successfully!");

                nextBtn.disabled = true;
                nextBtn.querySelector(".btn-text").textContent = "Sent";

                // Optional: display results if result-div exists
                const outputDiv = document.getElementById("result-div");
                if (outputDiv && data.result) {
                    outputDiv.innerHTML = ""; // clear previous
                    data.result.forEach((item, index) => {
                        let pTitle = document.createElement("p");
                        pTitle.textContent = `Title ${index + 1}: ${item.title}`;
                        outputDiv.appendChild(pTitle);

                        let pUrl = document.createElement("p");
                        pUrl.innerHTML = `URL ${index + 1}: <a href="${item.url}" target="_blank">${item.url}</a>`;
                        outputDiv.appendChild(pUrl);


                        item.images.forEach((img, i) => {
                            let pImg = document.createElement("p");
                            pImg.textContent = `Image ${i + 1}: `; // number label

                            let link = document.createElement("a");
                            link.href = img;
                            link.textContent = img;   // only the URL here
                            link.target = "_blank";

                            pImg.appendChild(link);
                            outputDiv.appendChild(pImg);
                        });


                        let hr = document.createElement("hr");
                        outputDiv.appendChild(hr);
                    });
                }

                // Reset UI
                urlInputsDiv.style.display = "none";
                urlCountInput.value = "";
                currentUrlInput.value = "";
                nextBtn.querySelector(".btn-text").textContent = "Next";
                urls = [];
                currentIndex = 0;

                // Reset selected website
                document.querySelectorAll('input[name="contact"]').forEach(r => r.checked = false);
            })
            .catch(err => {
                console.error("Error submitting URLs:", err);
                alert("Failed to submit URLs. Try again.");
            });
        }
    });
});
