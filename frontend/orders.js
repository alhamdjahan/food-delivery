// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {

    const trackButtons = document.querySelectorAll(".track-btn");
    const modal = document.getElementById("tracking-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const modalOrderId = document.getElementById("modal-order-id");

    // Check if modal elements exist
    if (modal && closeModalBtn && modalOrderId) {

        // Function to open the modal
        const openModal = (orderId) => {
            modalOrderId.textContent = orderId; // Set the order ID in the modal
            
            // In a real app, you would fetch the order status
            // For this demo, we just show the static modal
            modal.classList.add("show");
        };

        // Function to close the modal
        const closeModal = () => {
            modal.classList.remove("show");
        };

        // Add click listener to all "Track Order" buttons
        trackButtons.forEach(button => {
            // Only add listener if the button is not disabled
            if (!button.disabled) {
                button.addEventListener("click", ()_ => {
                    const orderId = button.getAttribute("data-order-id");
                    openModal(orderId);
                });
            }
        });

        // Add click listener to the close button
        closeModalBtn.addEventListener("click", closeModal);

        // Add click listener to the overlay (to close when clicking outside)
        modal.addEventListener("click", (event) => {
            // Check if the click was directly on the overlay
            if (event.target === modal) {
                closeModal();
            }
        });

    } else {
        console.error("Tracking modal elements not found.");
    }

});