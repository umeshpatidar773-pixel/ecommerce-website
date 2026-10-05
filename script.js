const products = [
  {
    id: 1,
    name: "Aero Wireless Headphones",
    category: "electronics",
    price: 149,
    oldPrice: 199,
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    tag: "Hot",
  },
  {
    id: 2,
    name: "Urban Street Jacket",
    category: "fashion",
    price: 119,
    oldPrice: 169,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    tag: "New",
  },
  {
    id: 3,
    name: "Luma Smart Lamp",
    category: "home",
    price: 89,
    oldPrice: 129,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    tag: "Best",
  },
  {
    id: 4,
    name: "Pulse Smartwatch",
    category: "electronics",
    price: 199,
    oldPrice: 249,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    tag: "Popular",
  },
  {
    id: 5,
    name: "Essence Leather Tote",
    category: "fashion",
    price: 96,
    oldPrice: 140,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    tag: "Limited",
  },
  {
    id: 6,
    name: "Nova Air Purifier",
    category: "home",
    price: 179,
    oldPrice: 220,
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    tag: "Fresh",
  },
  {
    id: 7,
    name: "Orbit Pro Speaker",
    category: "electronics",
    price: 129,
    oldPrice: 175,
    image:
      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    tag: "Top",
  },
  {
    id: 8,
    name: "Cozy Knit Throw",
    category: "home",
    price: 54,
    oldPrice: 79,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    rating: 4.5,
    tag: "Cozy",
  },
];

const cart = [];
let selectedCategory = "all";
let searchQuery = "";

const productsGrid = document.getElementById("productsGrid");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const subtotalValue = document.getElementById("subtotalValue");
const totalValue = document.getElementById("totalValue");
const cartDrawer = document.getElementById("cartDrawer");
const cartToggle = document.getElementById("cartToggle");
const closeCart = document.getElementById("closeCart");
const checkoutBtn = document.getElementById("checkoutBtn");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderProducts() {
  let filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!filteredProducts.length) {
    productsGrid.innerHTML = `
      <div class="empty-cart" style="grid-column: 1 / -1; padding: 48px 0;">
        No products found for this search.
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image-wrap">
            <span class="tag">${product.tag}</span>
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="product-body">
            <div class="product-meta">
              <span class="product-category">${product.category}</span>
              <span class="product-rating">★ ${product.rating}</span>
            </div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-footer">
              <div class="product-pricing">
                <span class="current-price">$${product.price}</span>
                <span class="old-price">$${product.oldPrice}</span>
              </div>
              <button class="add-btn" data-id="${product.id}">Add to cart</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".add-btn").forEach((button) => {
    button.addEventListener("click", () => addToCart(Number(button.dataset.id)));
  });
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  cartDrawer.classList.add("open");
}

function updateCart() {
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = itemsCount;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + 10;

  subtotalValue.textContent = `$${subtotal.toFixed(2)}`;
  totalValue.textContent = `$${total.toFixed(2)}`;

  if (!cart.length) {
    cartItems.innerHTML = '<div class="empty-cart">Your cart is empty.</div>';
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <h4>${item.name}</h4>
            <p>${item.category}</p>
            <div class="item-controls">
              <div style="display: flex; align-items: center; gap: 8px;">
                <button class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
                <span class="item-qty">${item.quantity}</span>
                <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
              </div>
              <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  document.querySelectorAll(".qty-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      const action = button.dataset.action;
      updateQuantity(id, action);
    });
  });
}

function updateQuantity(productId, action) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index === -1) return;

  if (action === "increase") {
    cart[index].quantity += 1;
  } else {
    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }

  updateCart();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    selectedCategory = button.dataset.category;
    renderProducts();
  });
});

searchInput.addEventListener("input", (event) => {
  searchQuery = event.target.value.trim();
  renderProducts();
});

cartToggle.addEventListener("click", () => {
  cartDrawer.classList.toggle("open");
});

closeCart.addEventListener("click", () => {
  cartDrawer.classList.remove("open");
});

checkoutBtn.addEventListener("click", () => {
  if (!cart.length) {
    alert("Your cart is empty.");
    return;
  }

  alert("Checkout successful! Your order has been placed.");
  cart.length = 0;
  updateCart();
  cartDrawer.classList.remove("open");
});

document.querySelector(".newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Thanks for joining our newsletter!");
  event.target.reset();
});

renderProducts();
updateCart();

window.addEventListener("click", (event) => {
  if (
    cartDrawer.classList.contains("open") &&
    !cartDrawer.contains(event.target) &&
    !cartToggle.contains(event.target)
  ) {
    cartDrawer.classList.remove("open");
  }
});

