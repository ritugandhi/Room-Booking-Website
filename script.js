document.addEventListener("DOMContentLoaded", function () {
    // Set minimum date for Check-In and Check-Out fields
    const today = new Date().toISOString().split("T")[0];
    const checkIn = document.getElementById("checkin");
    const checkOut = document.getElementById("checkout");

    if (checkIn && checkOut) {
        checkIn.setAttribute("min", today);
        checkOut.setAttribute("min", today);

        checkIn.addEventListener("change", function () {
            checkOut.value = "";
            checkOut.setAttribute("min", checkIn.value);
        });
    }

    // Ensure the script waits until the modal is opened before binding events
    const bookingModal = document.getElementById("bookingModal");

    bookingModal.addEventListener("shown.bs.modal", function () {
        console.log("Booking modal opened!");

        // Get form elements after modal opens
        const bookingForm = document.getElementById("bookingForm");
        const confirmButton = document.getElementById("conformBookingBtn");

        if (!bookingForm || !confirmButton) {
            console.error("Booking form or confirm button not found!");
            return;
        }

        // Handle confirm booking button click
        confirmButton.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent form submission if validation fails

            console.log("Confirm Booking button clicked!");

            let isValid = true;
            const requiredFields = bookingForm.querySelectorAll("input[required], select[required]");

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add("error"); // Highlight empty fields
                } else {
                    field.classList.remove("error");
                }
            });

            if (!isValid) {
                alert("⚠️ Please fill all the required fields.");
                return;
            }

            // If all fields are filled, close the modal and show success message
            const bootstrapModal = bootstrap.Modal.getInstance(bookingModal);
            if (bootstrapModal) {
                bootstrapModal.hide(); // Close the modal
            }

            // Show success message after modal closes
            setTimeout(() => {
                alert("🎉 Congratulations! Your room booking is successfully completed!");
            }, 500); // Delay message slightly to ensure modal is closed first

            // Close the modal safely
            if (typeof bootstrap !== "undefined" && bootstrap.Modal.getInstance(bookingModal)) {
                bootstrap.Modal.getInstance(bookingModal).hide(); // Bootstrap method
            } 
            else {
                bookingModal.classList.remove("show");
                bookingModal.style.display = "none";
                document.body.classList.remove("modal-open");
                document.querySelector(".modal-backdrop").remove();
            }
        });
    });   
    
    document.addEventListener("DOMContentLoaded", function () {
        const contactForm = document.querySelector("form");
    
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission
    
            const name = document.querySelector("input[type='text']").value.trim();
            const email = document.querySelector("input[type='email']").value.trim();
            const subject = document.querySelectorAll("input[type='text']")[1].value.trim(); // Second text input
            const message = document.querySelector("textarea").value.trim();
    
            // Email validation regex
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
            if (!name || !email || !subject || !message) {
                alert("Please fill in all fields before sending the message.");
                return;
            }
    
            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }
    
            // Success message
            alert("Your message has been sent successfully!");
            contactForm.reset(); // Reset the form after submission
        });
    });        
});