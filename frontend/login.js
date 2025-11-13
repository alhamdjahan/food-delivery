// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // --- Get Elements ---
    const showLoginBtn = document.getElementById("show-login-btn");
    const showRegisterBtn = document.getElementById("show-register-btn");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const loginTypeBtns = document.querySelectorAll(".login-type-btn");
    
    // --- Toggle between Login and Register Forms ---
    if (showLoginBtn && showRegisterBtn && loginForm && registerForm) {
        
        // Show Login Form
        showLoginBtn.addEventListener("click", () => { // FIX: Corrected syntax from ()_ =>
            loginForm.classList.add("active-form");
            registerForm.classList.remove("active-form");
            
            showLoginBtn.classList.add("active");
            showRegisterBtn.classList.remove("active");
        });

        // Show Register Form
        showRegisterBtn.addEventListener("click", () => { // FIX: Corrected syntax from ()_ =>
            loginForm.classList.remove("active-form");
            registerForm.classList.add("active-form");

            showLoginBtn.classList.remove("active");
            showRegisterBtn.classList.add("active");
        });
    }

    // --- Toggle between User and Admin Login Type ---
    if (loginTypeBtns) {
        loginTypeBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                // Remove active class from all buttons
                loginTypeBtns.forEach(b => b.classList.remove("active"));
                // Add active class to the clicked button
                btn.classList.add("active");

                const loginType = btn.getAttribute("data-type");
                console.log("Login type set to:", loginType);
                // In a real app, you might set a hidden input value here
            });
        });
    }

    // --- Handle Form Submissions (Demo) ---
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent actual form submission
            console.log("Login form submitted");
            
            // In a real app, you'd send this to your backend (Python, PHP, etc.)
            // For demo, just log and redirect
            console.log("Login successful! (Demo) Redirecting to home page...");
            window.location.href = "index.html";
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent actual form submission
            console.log("Register form submitted");

            // In a real app, you'd check passwords match, then send to backend
            // For demo, just log and switch to login
            console.log("Registration successful! (Demo) Please log in.");
            
            // Programmatically click the "Login" tab
            showLoginBtn.click();
        });
    }

});