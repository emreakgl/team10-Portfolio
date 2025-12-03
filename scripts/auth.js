// =============================
// SHA-256 HASH FUNCTION
// =============================
async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// =============================
// LOGIN FUNCTION
// =============================
async function login() {
    const input = document.getElementById("password").value;

    if (!input) {
        document.getElementById("error").innerText = "Please enter a password.";
        return;
    }

    const userHash = await sha256(input);

    // storedHash is loaded from config.js
    if (userHash === storedHash) {
        sessionStorage.setItem("auth", "true");
        location.reload();
    } else {
        document.getElementById("error").innerText = "Incorrect password.";
        document.getElementById("error").innerText = userHash;
    }
}

// =============================
// CHECK IF USER IS LOGGED IN
// =============================
function checkAccess() {
    const loggedIn = sessionStorage.getItem("auth");

    if (loggedIn === "true") {
        // Hide login box
        document.getElementById("login-box").style.display = "none";
        // Show private content
        document.getElementById("private-content").style.display = "block";

        loadMessages();  // Load message list
    } else {
        // Show login box
        document.getElementById("login-box").style.display = "block";
        // Hide private content
        document.getElementById("private-content").style.display = "none";
    }
}

// =============================
// LOAD MESSAGE FILES DYNAMICALLY
// =============================
function loadMessages() {
    const messageList = document.getElementById("messageList");

    // Add your message filenames here OR dynamically generate them
    const messages = [
        "sample.html"
        // When you generate new messages, add them here automatically
    ];

    messages.forEach(msg => {
        const li = document.createElement("li");
        const link = document.createElement("a");

        link.href = `protected/messages/${msg}`;
        link.innerText = msg;

        li.appendChild(link);
        messageList.appendChild(li);
    });
}

// =============================
// LOGOUT FUNCTION
// =============================
function logout() {
    sessionStorage.removeItem("auth");
    location.reload();
}

