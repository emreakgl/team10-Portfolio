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


async function login() {
    const input = document.getElementById("password").value;

    if (!input) {
        document.getElementById("error").innerText = "Please enter a password.";
        return;
    }

    const userHash = await sha256(input);

    if (userHash === storedHash) {
        sessionStorage.setItem("auth", "true");

        // reload protected page and show messages
        location.reload();
    } else {
        document.getElementById("error").innerText = "Incorrect password.";
        document.getElementById("error").innerText = userHash;
    }
}


function checkAccess() {
    const loggedIn = sessionStorage.getItem("auth");

    if (loggedIn === "true") {
        // Hide login box
        document.getElementById("login-box").style.display = "none";

        // Show private area
        document.getElementById("private-content").style.display = "block";

        // Load messages from GitHub
        loadMessages();
    } else {
        // Show login box
        document.getElementById("login-box").style.display = "block";

        // Hide private content
        document.getElementById("private-content").style.display = "none";
    }
}


function logout() {
    sessionStorage.removeItem("auth");
    location.reload();
}
