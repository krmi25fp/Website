const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.name === name);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const product = {
        name: name,
        price: price,
        quantity: 1,
      };

      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
  });
});

const cartItemsContainer = document.getElementById("cart-items");

if (cartItemsContainer) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
    let totalPrice = 0;

    cart.forEach((item, index) => {
      const div = document.createElement("div");

      totalPrice += item.price * item.quantity;

      div.innerHTML = `
      <h2>${item.name}</h2>
<p>Price: ${item.price} kr</p>
<p>Quantity: ${item.quantity}</p>
        <p>Item total: ${item.price * item.quantity} kr</p>
<button class="decrease-btn" data-index="${index}">-</button>
        <button class="increase-btn" data-index="${index}">+</button>
        <button class="remove-btn" data-index="${index}">Remove</button>
     
    `;

      cartItemsContainer.appendChild(div);
    });

    const totalElement = document.createElement("h2");
    totalElement.innerHTML = `Total price: ${totalPrice} kr`;
    cartItemsContainer.appendChild(totalElement);

    const increaseButtons = document.querySelectorAll(".increase-btn");
    const decreaseButtons = document.querySelectorAll(".decrease-btn");
    const removeButtons = document.querySelectorAll(".remove-btn");

    increaseButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = button.dataset.index;
        cart[index].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });

    decreaseButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = button.dataset.index;
        cart[index].quantity -= 1;

        if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });

    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = button.dataset.index;

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();
      });
    });
  }
  renderCart();
}
