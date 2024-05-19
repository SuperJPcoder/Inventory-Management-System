document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("add-product").addEventListener("click", function() {
        var newProductForm = document.getElementById("new-product");
        var addProductButton = document.getElementById("add-product");
        toggleForm(newProductForm, addProductButton);
    });

    document.getElementById("add-supplier").addEventListener("click", function() {
        var newSupplierForm = document.getElementById("new-supplier");
        var addSupplierButton = document.getElementById("add-supplier");
        toggleForm(newSupplierForm, addSupplierButton);
    });

    document.getElementById("quantity").addEventListener("input", function() {
        var quantity = parseInt(this.value);
        if (quantity <= 0 || isNaN(quantity)) {
            this.value = 1;
        }
    });

    document.getElementById("discount").addEventListener("input", function() {
        var discount = parseInt(this.value);
        if (discount < 0 || discount > 100 || isNaN(discount)) {
            this.value = 0;
        }
    });

    document.getElementById("tax-rate").addEventListener("input", function() {
        var taxRate = parseInt(this.value);
        if (taxRate < 0 || taxRate > 100 || isNaN(taxRate)) {
            this.value = 0;
        }
    });

    document.getElementById("submit-order").addEventListener("click", function() {
        var quantity = parseInt(document.getElementById("quantity").value);
        var discount = parseInt(document.getElementById("discount").value);
        var taxRate = parseInt(document.getElementById("tax-rate").value);
        var totalAmount = quantity * 100; // Assuming ₹100 is the base price

        var discountedAmount = totalAmount - (totalAmount * (discount / 100));
        var taxAmount = 0;
        if (taxRate > 0) {
            taxAmount = (discountedAmount * taxRate) / 100;
        }
        var grandTotal = discountedAmount + taxAmount;

        document.getElementById("total-amount").textContent = "Total Amount: ₹" + totalAmount;
        document.getElementById("discounted-amount").textContent = "Discounted Amount: ₹" + discountedAmount;
        document.getElementById("tax-amount").textContent = "Tax Amount: ₹" + taxAmount.toFixed(2);
        document.getElementById("grand-total").textContent = "Grand Total: ₹" + grandTotal.toFixed(2) + " (including tax)";
    });
});

function toggleForm(form, button) {
    if (form.style.display === "none") {
        form.style.display = "block";
        slideDown(form);
        button.textContent = button.textContent === "Add New Product" ? "Cancel New Product" : "Cancel New Supplier";
    } else {
        slideUp(form);
        setTimeout(function() {
            form.style.display = "none";
        }, 300); // Adjust the duration of the animation
        button.textContent = button.textContent === "Cancel New Product" ? "Add New Product" : "Add New Supplier";
    }
}

function slideDown(element) {
    element.style.transition = "height 0.7s ease-in-out";
    element.style.height = element.scrollHeight + "px";
}

function slideUp(element) {
    element.style.transition = "height 0.7s ease-in-out";
    element.style.height = 0;
}
document.getElementById("submit-order").addEventListener("click", function() {
    // Rest of the code remains unchanged

    // Display the pop-up
    var popup = document.createElement("div");
    popup.classList.add("popup");
    var orderId = generateOrderId(); // Assume you have a function to generate Order ID
    popup.innerHTML = `
        <span class="popup-close">&times;</span>
        <h2>Order ID: ${orderId}</h2>
        <div class="popup-content">
            <label>Product Ordered:</label>
            <p>${document.getElementById("product-select").value}</p>
            <label>Supplier:</label>
            <p>${document.getElementById("supplier").value}</p>
            <!-- Add more details as needed -->
        </div>
    `;
    document.body.appendChild(popup);

    // Close the pop-up when close button is clicked
    document.querySelector(".popup-close").addEventListener("click", function() {
        document.body.removeChild(popup);
    });
});

function generateOrderId() {
    // Generate a random number for Order ID
    return Math.floor(Math.random() * 10000) + 1;
}