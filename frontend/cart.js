// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // --- Get Elements ---
    const cartItemsList = document.getElementById("cart-items-list");
    const subtotalEl = document.getElementById("cart-subtotal");
    const deliveryEl = document.getElementById("cart-delivery");
    const totalEl = document.getElementById("cart-total");
    const emptyCartMsg = document.getElementById("empty-cart-message");
    const cartLayoutContainer = document.getElementById("cart-layout-container");
    const checkoutBtn = document.getElementById("checkout-btn");

    // --- Core Function: updateCartTotals ---
    // This function will read all cart items and update the summary.
    function updateCartTotals() {
        const cartItems = cartItemsList.querySelectorAll(".cart-item");
        let subtotal = 0;

        // Check if cart is empty
        if (cartItems.length === 0) {
            emptyCartMsg.classList.remove("hide");
            cartLayoutContainer.classList.add("hide");
            // Set totals to 0
            subtotalEl.textContent = "₹0.00"; // Changed to ₹
            totalEl.textContent = "₹0.00"; // Changed to ₹
            return; // Exit the function
        } else {
            // Ensure cart is visible
            emptyCartMsg.classList.add("hide");
            cartLayoutContainer.classList.remove("hide");
        }

        // Loop through each item in the cart
        cartItems.forEach(item => {
            const priceEl = item.querySelector(".item-price");
            const quantityInput = item.querySelector(".quantity-input");
            const subtotalItemEl = item.querySelector(".item-subtotal");

            const price = parseFloat(priceEl.getAttribute("data-price"));
            const quantity = parseInt(quantityInput.value);
            
            // Calculate and display item subtotal
            const itemSubtotal = price * quantity;
            subtotalItemEl.textContent = `₹${itemSubtotal.toFixed(2)}`; // Changed to ₹
            
            // Add to the grand subtotal
            subtotal += itemSubtotal;
        });

        // Get delivery fee
        const deliveryFee = parseFloat(deliveryEl.getAttribute("data-fee"));

        // Calculate total
        const total = subtotal + deliveryFee;

        // Update the DOM
        subtotalEl.textContent = `₹${subtotal.toFixed(2)}`; // Changed to ₹
        totalEl.textContent = `₹${total.toFixed(2)}`; // Changed to ₹
    }

    // --- Event Listeners for Quantity Changes and Remove ---
    
    // We use event delegation on the parent list
    cartItemsList.addEventListener("click", (e) => {
        const target = e.target;
        const cartItem = target.closest(".cart-item");

        if (!cartItem) return; // Click was not inside a cart item

        const quantityInput = cartItem.querySelector(".quantity-input");
        let currentQty = parseInt(quantityInput.value);

        // --- Plus Button ---
        if (target.classList.contains("qty-plus")) {
            quantityInput.value = currentQty + 1;
            updateCartTotals();
        }

        // --- Minus Button ---
        if (target.classList.contains("qty-minus")) {
            if (currentQty > 1) { // Don't go below 1
                quantityInput.value = currentQty - 1;
                updateCartTotals();
            }
        }

        // --- Remove Button ---
        if (target.classList.contains("item-remove-btn")) {
            cartItem.remove(); // Remove the item from the DOM
            updateCartTotals();
        }
    });

    // --- Event Listener for manual input change ---
    cartItemsList.addEventListener("change", (e) => {
        const target = e.target;
        
        // Check if the changed element is a quantity input
        if (target.classList.contains("quantity-input")) {
            // Ensure quantity is not less than 1
            if (parseInt(target.value) < 1 || isNaN(parseInt(target.value))) {
                target.value = 1;
            }
            updateCartTotals();
        }
    });

    // --- Event Listener for Checkout ---
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            console.log("Proceeding to checkout...");
            // In a real app, this would go to a payment page.
            // For demo, we'll redirect to the "My Orders" page.
            console.log("Redirecting to orders page...");
            window.location.href = "orders.html";
        });
    }

    // --- Initial Call ---
    // Run the function on page load to set the initial totals
    updateCartTotals();

});