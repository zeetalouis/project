document.getElementById("sendButton").addEventListener("click", function() {
    const input = document.getElementById("messageInput");
    const message = input.value.trim().toLowerCase();
    const imageInput = document.getElementById("imageInput");
    const imageFile = imageInput.files[0];

    if (message !== "" || imageFile) {
        if (message !== "") {
            displayMessage(message, "user");
            input.value = "";

            // Send message to backend for emotion analysis
            fetch('https://your-flask-backend.onrender.com/analyze-emotion', {  // Update with your backend URL on Render
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            })
            .then(response => response.json())
            .then(data => {
                const botMessage = data.emotion;
                displayMessage(botMessage, "bot");
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

        if (imageFile) {
            const reader = new FileReader();

            reader.addEventListener("load", function() {
                displayMessage("", "user", reader.result);
            });

            reader.readAsDataURL(imageFile);
            imageInput.value = "";
            document.getElementById("imagePreview").style.display = "none";
        }
    }
});

function displayMessage(text, type, imageUrl) {
    const messageElement = document.createElement("div");
    messageElement.className = `message ${type}-message`;

    if (imageUrl) {
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.alt = "Image";
        imageElement.style.maxWidth = "100%";
        imageElement.style.height = "auto";
        messageElement.appendChild(imageElement);
    }

    const textElement = document.createElement("p");
    textElement.textContent = text;
    messageElement.appendChild(textElement);

    document.querySelector(".messages").appendChild(messageElement);
    scrollToBottom();
}

function scrollToBottom() {
    const chatArea = document.querySelector(".chat-area");
    chatArea.scrollTop = chatArea.scrollHeight;
