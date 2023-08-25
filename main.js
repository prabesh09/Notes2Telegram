const botToken = localStorage.getItem("botToken");
document.getElementById("botTokenInput").value = localStorage.getItem("botToken");
const chatId = localStorage.getItem("chatId");
document.getElementById("chatIdInput").value = localStorage.getItem("chatId");

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", sendMessage);

function sendMessage() {
    const message = messageInput.value;
    if (message) {
        const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const data = {
            chat_id: chatId,
            text: message,
        };

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then(() => {
                const notification = document.getElementById("notification-send");
                notification.style.display = "block";
            })
            .catch((error) => {
                console.error("Error sending message:", error);
            });
    }

    setTimeout(function () {
        notification.style.display = "none";
    }, 2000);
}

const toggleMenuIcon = document.getElementById("toggleMenu");
const menuBar = document.querySelector(".menu-container");

toggleMenuIcon.addEventListener("click", () => {
    if (menuBar.style.display === "none") {
        menuBar.style.display = "flex";
    } else {
        menuBar.style.display = "none";
    }
});

messageInput.addEventListener("input", () => {
    menuBar.style.display = "none";
});

// Local Storage
const storeValue = () => {
    const botToken = document.getElementById("botTokenInput").value;
    const chatId = document.getElementById("chatIdInput").value;

    localStorage.setItem("botToken", botToken);
    localStorage.setItem("chatId", chatId);
};

document.getElementById("saveValue").addEventListener("click", () => {
    storeValue();
    const notification = document.getElementById("notification-save");
    notification.style.display = "block";

    setTimeout(function () {
        notification.style.display = "none";
    }, 2000);
});

document.addEventListener("keydown", function (event) {
    if (event.shiftKey && event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
});
