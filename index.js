import menuArray from './data.js'

function getItem(itemArr) {
    return itemArr.map(item => {
        const{
            name,
            ingredients,
            id,
            price,
            emoji

        } = item
        return  `
            <section class="item">
                <div class="image">${emoji}</div>
                <div class="desc">
                    <p class="name">${name}</p>
                    <p class="ingredients">${ingredients}</p>
                    <p class="price">$${price}</p>
                </div>
                <div class="addbtn" ><button class="addItemButton" data-id="${id}">+</button></div>
            </section>
            <hr class = "menu-divider">
            `
             
    }).join(' ')
    
 }

 document.getElementById('container').innerHTML = getItem(menuArray)
 

let cartItemsArr = []

 
function renderCart() {
    const cartDiv = document.getElementById("cart");
    if (cartItemsArr.length === 0) {
        cartDiv.style.display = "none"; // Hide the cart if it's empty
        cartDiv.innerHTML = "";
        return;
    }
        cartDiv.style.display = "block"; // Show the cart if it has items
    // Calculate the total price
    const totalPrice = cartItemsArr.reduce((total, item) => total + item.price, 0);

    cartDiv.innerHTML = `
        <h2 class="cart-head">Your Cart</h2>
        <div class="cart-items">
            ${cartItemsArr.map(item => `
                <div class="cart-row">
                    <div class="cart-left-row">
                        <div class="cart-item">${item.name}</div>
                        <button class="removeItemButton" data-id="${item.id}">remove</button>
                    </div>
                    <div class="cart-item">$${item.price}</div>
                </div>
            `).join('')}
        </div>
        <hr class="cart-divider">
        <div class="cart-total">
            <div class="total-label">Total:</div>
            <h3>$${totalPrice.toFixed(2)}</h3>
        </div>
        <button class="completeOrderBtn">Complete order</button>
    `;
    const removeButtons = document.querySelectorAll(".removeItemButton");
    removeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const itemId = this.dataset.id; // Get the ID of the item to remove
            removeItemFromCart(itemId); // Call the function to remove the item
        });
    });
}
document.getElementById('cart').style.display = 'none';

// Function to remove an item from the cart
function removeItemFromCart(itemId) {
    // Find the index of the item to remove
    const itemIndex = cartItemsArr.findIndex(item => item.id == itemId);

    if (itemIndex !== -1) {
        cartItemsArr.splice(itemIndex, 1); // Remove the item from the array
        renderCart(); // Re-render the cart to reflect the changes
    }
}


// Function to render the payment gateway form
function renderPaymentForm() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = `
        <h2 class="payment-head">Enter card details</h2>
        <form id="paymentForm">
            <div class="form-group">
                <input type="text" id="name" name="name" placeholder="Enter your name" required>
            </div>
            <div class="form-group">
                <input type="text" id="cardNumber" name="cardNumber" placeholder="Enter card number" maxlength="16" required>
            </div>
            <div class="form-group">
                <input type="text" id="cvv" name="cvv" maxlength="3" placeholder="Enter CVV" required>
            </div>
            <button type="submit" class="submitPaymentBtn">Pay</button>
        </form>
    `;
    


    // Add event listener for form submission
    document.getElementById("paymentForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const userName = document.getElementById("name").value; // Get the user's name
        renderThankYouMessage(userName); // Render the thank-you message
    });
}

// Event listener for the "Complete order" button
    document.getElementById("cart").addEventListener("click", function(e) {
        if (e.target.classList.contains("completeOrderBtn")) {
            renderPaymentForm();
        }
    });


function renderThankYouMessage(userName) {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = `
        <p class="thank-you-msg">Thanks, <strong>${userName}</strong>! Your order is on its way!</p>
    `;
    cartItemsArr = []; // Clear the cart
    setTimeout(() =>{
        cartDiv.innerHTML = '';
        cartDiv.style.display = 'none';
    },3000)  ;   
}



document.getElementById('container').addEventListener('click', function(e) {
    if (e.target.tagName === "BUTTON") {
        const itemId = e.target.dataset.id
        const item = menuArray.find(itemin => itemin.id == itemId)
        if (item) {
            cartItemsArr.push(item)
            renderCart()
        }
    }
})

// ...existing code...
 

