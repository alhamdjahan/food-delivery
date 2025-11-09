// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    
    // Select all the "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    
    // Select the notification element
    const toast = document.getElementById("toast-notification");
    
    // Variable to hold the timer for the toast
    let toastTimer;

    // Check if the toast element actually exists
    if (toast) {
        // Loop through each button and add a click event listener
        addToCartButtons.forEach(button => {
            button.addEventListener("click", () => {
                // When a button is clicked, show the notification
                
                // Clear any existing timer to reset the duration
                clearTimeout(toastTimer);
                
                // Add the 'show' class to make it visible
                toast.classList.add("show");
                
                // Set a timer to hide the notification after 3 seconds (3000 milliseconds)
                toastTimer = setTimeout(() => {
                    toast.classList.remove("show");
                }, 3000);
            });
        });
    } else {
        console.error("Toast notification element not found.");
    }
    
});

