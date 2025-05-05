
document.addEventListener("DOMContentLoaded", function () {
    console.log("Login script loaded");

    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("login-error");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    if (!loginForm) {
        console.error("Error: Login form not found!");
        return;
    }

    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "Show";
        }
    });

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("Login form submitted");

        const username = document.getElementById("username").value.trim();
        const password = passwordInput.value.trim();

        console.log("Username entered:", username);

        if (!username || !password) {
            alert("Please fill in both username and password.");
            console.log("Error: Empty fields");
            return;
        }

        try {
            console.log("Fetching users.json...");
            const response = await fetch("../users.json");
            if (!response.ok) throw new Error("Failed to load users.json");

            const users = await response.json();
            console.log("Users fetched:", users);

            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                console.log("User authenticated:", user);
                sessionStorage.setItem("loggedInUser", JSON.stringify(user));

                const redirectMap = {
                    student: "../dashboard/student-dashboard.html",
                    instructor: "../dashboard/instructor-dashboard.html",
                    admin: "../dashboard/admin-dashboard.html"
                };

                window.location.href = redirectMap[user.role] || "../login/login.html";
            } else {
                alert("Invalid username or password. Please try again.");
                console.log("Error: Invalid credentials");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("An error occurred while logging in. Please try again later.");
        }
    });
});