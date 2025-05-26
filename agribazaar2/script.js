document.addEventListener("DOMContentLoaded", () => {

  /* ---------- CART UTILITIES ---------- */
  const getCart = () => JSON.parse(localStorage.getItem("cart") || "[]");
  const saveCart = c => localStorage.setItem("cart", JSON.stringify(c));
  const updateCartCount = () => {
    const countSpans = document.querySelectorAll("#cartCount");
    const totalItems = getCart().length;
    countSpans.forEach(s => (s.textContent = totalItems));
  };

  /* ---------- ADD‑TO‑CART BUTTONS ---------- */
  document.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", e => {
      const { name, price } = e.target.dataset;
      const cart = getCart();
      cart.push({ name, price: +price });
      saveCart(cart);
      updateCartCount();
      alert(`${name} added to cart!`);
    });
  });

  /* ---------- RENDER CART PAGE ---------- */
  const cartContainer = document.getElementById("cartItems");
  if (cartContainer) {                 // we're on cart.html
    const cart = getCart();
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach((item, idx) => {
        const div = document.createElement("div");
        div.className = "card";
        div.style.marginBottom = "1rem";
        div.innerHTML = `
          <div class="card-content">
            <h3>${item.name}</h3>
            <p class="price">GHS ${item.price.toFixed(2)}</p>
            <button data-remove="${idx}">Remove</button>
          </div>`;
        cartContainer.appendChild(div);
      });
      // total
      const total = cart.reduce((sum, i) => sum + i.price, 0);
      document.getElementById("total").textContent =
        `Total: GHS ${total.toFixed(2)}`;
    }

    /* remove single item */
    cartContainer.addEventListener("click", e => {
      if (e.target.dataset.remove !== undefined) {
        const idx = +e.target.dataset.remove;
        const cart = getCart();
        cart.splice(idx, 1);
        saveCart(cart);
        location.reload();   // refresh view
      }
    });

    /* clear all */
    document.getElementById("clearCart").addEventListener("click", () => {
      localStorage.removeItem("cart");
      location.reload();
    });
  }

  /* ---------- LIVE SEARCH (if present) ---------- */
  const searchBox = document.getElementById("searchBox");
  if (searchBox) {
    const cards = document.querySelectorAll(".card");
    searchBox.addEventListener("input", () => {
      const q = searchBox.value.toLowerCase();
      cards.forEach(c => {
        const title = c.querySelector("h3").textContent.toLowerCase();
        c.style.display = title.includes(q) ? "block" : "none";
      });
    });
  }

  /* ---------- INIT ---------- */
  updateCartCount();
});

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cartCount");
  const checkoutBtn = document.getElementById("checkout-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.textContent = cart.length;

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      cartTotal.textContent = 'Total: GHS 0';
      return;
    }

    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <p><strong>${item.name}</strong> - GHS ${item.price}</p>
      `;
      cartItemsContainer.appendChild(div);
      total += item.price;
    });

    cartTotal.textContent = `Total: GHS ${total.toFixed(2)}`;
  }

  renderCart();

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      alert("Checkout successful! Thank you for your purchase.");
      localStorage.removeItem("cart");
      cart = [];
      renderCart();
      cartCount.textContent = "0";
    }
  });
});

document.getElementById("checkout-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  // Simulate order placed
  document.getElementById("confirmation").innerHTML = `
    <p>Thank you, <strong>${name}</strong>! Your order has been placed.</p>
    <p>We will contact you at <strong>${email}</strong> or <strong>${phone}</strong>.</p>
    <p>Delivery address: <strong>${address}</strong></p>
  `;

  localStorage.removeItem("cart");
  cart = [];
  renderCart();
  cartCount.textContent = "0";

  this.reset(); // Clear form
});
