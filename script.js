const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = button.dataset.price;

    const product = {
      name: name,
      price: price,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
  });
});

const cartItemsContainer = document.getElementById("cart-items");

if (cartItemsContainer) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    let totalPrice = 0;

    cart.forEach((item, index) => {
      const div = document.createElement("div");

      totalPrice += Number(item.price);

      div.innerHTML = `
      <h2>${item.name}</h2>
      <p>${item.price} kr</p>
      <button class="remove-btn" data-index="${index}">
      Remove
      </button>
    `;

      cartItemsContainer.appendChild(div);
    });

    const totalElement = document.createElement("h2");
    totalElement.innerHTML = `Total price: ${totalPrice} kr`;
    cartItemsContainer.appendChild(totalElement);

    const removeButtons = document.querySelectorAll(".remove-btn");

    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = button.dataset.index;

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();
      });
    });
  }
}
