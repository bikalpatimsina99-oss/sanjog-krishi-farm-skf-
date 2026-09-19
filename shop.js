let cart = [];

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const cartOverlay = document.getElementById("cartOverlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const searchButton = document.getElementById("searchButton");
const searchSection = document.getElementById("searchSection");
const searchInput = document.getElementById("searchInput");

const addButtons = document.querySelectorAll(".add-cart");


/* CART OPEN */

cartButton.addEventListener("click", () => {

    cartPanel.classList.add("open");
    cartOverlay.classList.add("show");

});


/* CART CLOSE */

function closeCartPanel() {

    cartPanel.classList.remove("open");
    cartOverlay.classList.remove("show");

}


closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);


/* ADD TO CART */

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingProduct = cart.find(
            item => item.name === name
        );


        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }


        updateCart();

        cartPanel.classList.add("open");
        cartOverlay.classList.add("show");

    });

});


/* UPDATE CART */

function updateCart() {

    cartItems.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    }


    cart.forEach((item, index) => {

        totalItems += item.quantity;

        totalPrice += item.price * item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <p>
                    Rs. ${item.price} × ${item.quantity}
                </p>

            </div>

            <button
                class="remove-item"
                onclick="removeItem(${index})"
            >
                ✕
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = totalItems;

    cartTotal.textContent =
        "Rs. " + totalPrice.toLocaleString();

}


/* REMOVE ITEM */

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


/* SEARCH BUTTON */

searchButton.addEventListener("click", () => {

    searchSection.classList.toggle("show");

    if (searchSection.classList.contains("show")) {

        searchInput.focus();

    }

});


/* SEARCH PRODUCTS */

searchInput.addEventListener("input", () => {

    const searchValue =
        searchInput.value.toLowerCase().trim();


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const productName =
            product.dataset.name.toLowerCase();


        if (
            productName.includes(searchValue)
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

});


/* CHECKOUT */

document
    .getElementById("checkoutButton")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;

        }


        alert(
            "Checkout system will be connected to Firebase next."
        );

    });


/* INITIAL CART */

updateCart();