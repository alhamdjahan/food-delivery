// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // --- 1. TOAST NOTIFICATION LOGIC (Copied from script.js) ---
    
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    const toast = document.getElementById("toast-notification");
    let toastTimer;

    if (toast) {
        addToCartButtons.forEach(button => {
            button.addEventListener("click", () => {
                clearTimeout(toastTimer);
                toast.classList.add("show");
                toastTimer = setTimeout(() => {
                    toast.classList.remove("show");
                }, 3000);
            });
        });
    } else {
        console.error("Toast notification element not found.");
    }

    // --- 2. CATEGORY FILTERING LOGIC ---

    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuItems = document.querySelectorAll(".menu-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Get the filter value from the data-filter attribute
            const filter = button.getAttribute("data-filter");

            // --- Update active button ---
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            // Add 'active' class to the clicked button
            button.classList.add("active");

            // --- Filter the menu items ---
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute("data-category");

                // If filter is "all" or item category matches the filter
                if (filter === "all" || itemCategory === filter) {
                    item.classList.remove("hide"); // Show item
                } else {
                    item.classList.add("hide"); // Hide item
                }
            });
        });
    });
    
});