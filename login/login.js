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

        if (!username || !password) {
            alert("Please fill in both username and password.");
            return;
        }

        try {
            console.log("Fetching users.json...");
            const response = await fetch("../../app/data/users.json");
            if (!response.ok) throw new Error("Failed to load users.json");

            const users = await response.json();

            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                sessionStorage.setItem("loggedInUser", JSON.stringify(user));

                const redirectMap = {
                    student: "../dashboard/student-dashboard.html",
                    instructor: "../dashboard/instructor-dashboard.html",
                    admin: "../dashboard/admin-dashboard.html"
                };

                window.location.href = redirectMap[user.role] || "../login/login.html";
            } else {
                alert("Invalid username or password. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred while logging in. Please try again later.");
        }
    });
});
