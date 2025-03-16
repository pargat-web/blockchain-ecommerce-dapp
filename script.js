const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with deployed contract address
const contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "addProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "buyProduct",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
    ],
    name: "ProductAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "ProductPurchased",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getProduct",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "bool",
            name: "purchased",
            type: "bool",
          },
        ],
        internalType: "struct Ecommerce.Product",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "productCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "products",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "seller",
        type: "address",
      },
      {
        internalType: "bool",
        name: "purchased",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]; // Replace with contract ABI JSON

let web3;
let contract;
let userAccount;
let isLoading = false;
let currentFilter = "all";
let allProducts = [];

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initBlockchainAnimation();
  initGlassEffects();

  // Check if already connected
  if (window.ethereum && window.ethereum.selectedAddress) {
    connectWallet(true);
  }

  // Set current year in copyright
  const yearElement = document.querySelector(".copyright");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = `© ${currentYear} PARGAT SINGH`;
  }
});

// Initialize glass morphism effects
function initGlassEffects() {
  // Add hover effects to cards
  document.querySelectorAll(".cyber-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      addRippleEffect(this);
    });
  });

  // Add moving gradient to stat cards
  document.querySelectorAll(".stat-card").forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.1), rgba(26, 28, 41, 0.6) 40%)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.background = "rgba(26, 28, 41, 0.5)";
    });
  });

  // Add subtle tilt effect on cards
  const tiltCards = document.querySelectorAll(".product-card");
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    });
  });

  // Create floating particles for background
  createFloatingParticles();
}

// Add ripple effect on elements
function addRippleEffect(element) {
  const ripple = document.createElement("div");
  ripple.className = "ripple-effect";

  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = "0";
  ripple.style.top = "0";

  element.appendChild(ripple);

  // Add styles for ripple effect
  const style = document.createElement("style");
  style.textContent = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.05);
            transform: scale(0);
            animation: ripple-animation 1s linear;
            pointer-events: none;
            z-index: 1;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;

  if (!document.querySelector('style[data-ripple="true"]')) {
    style.setAttribute("data-ripple", "true");
    document.head.appendChild(style);
  }

  setTimeout(() => {
    ripple.remove();
  }, 1000);
}

// Create floating particles in the background
function createFloatingParticles() {
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "floating-particle";

    // Random properties
    const size = Math.random() * 5 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 30 + 10;
    const delay = Math.random() * 5;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    document.querySelector(".background-shapes").appendChild(particle);
  }

  // Add style for floating particles
  const style = document.createElement("style");
  style.textContent = `
        .floating-particle {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            pointer-events: none;
            animation: float-animation linear infinite;
        }
        
        @keyframes float-animation {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.5;
            }
            90% {
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100px) translateX(50px);
                opacity: 0;
            }
        }
    `;

  document.head.appendChild(style);
}

// Initialize blockchain animation in background
function initBlockchainAnimation() {
  window.particlesJS &&
    window.particlesJS("blockchain-animation", {
      particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } },
        color: { value: "#6A5AE0" },
        shape: { type: "circle" },
        opacity: {
          value: 0.3,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#16C2D5",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.4 } },
          push: { particles_nb: 3 },
        },
      },
      retina_detect: true,
    });
}

// ✅ Connect Wallet
async function connectWallet(silent = false) {
  const connectBtn = document.getElementById("connect-btn");
  const walletAddress = document.getElementById("wallet-address");
  const contractAddressElement = document.getElementById("contract-address");

  if (!silent) {
    connectBtn.innerHTML = '<span class="loading"></span> Connecting...';
  }

  try {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      userAccount = accounts[0];

      // Add eventListener for account changes
      window.ethereum.on("accountsChanged", function (accounts) {
        userAccount = accounts[0];
        updateWalletDisplay();
        loadProducts();
      });

      // Initialize contract
      contract = new web3.eth.Contract(contractABI, contractAddress);

      // Update UI
      updateWalletDisplay();
      contractAddressElement.textContent = `${contractAddress.substring(
        0,
        6
      )}...${contractAddress.substring(contractAddress.length - 4)}`;

      // Load products
      await loadProducts();

      // Add connection effect
      addConnectionEffect();

      return true;
    } else {
      showNotification(
        "Please install MetaMask to interact with this dApp",
        "error"
      );
      return false;
    }
  } catch (error) {
    console.error("Connection error:", error);
    showNotification(error.message || "Failed to connect wallet", "error");
    return false;
  } finally {
    connectBtn.innerHTML = '<i class="fa-solid fa-wallet"></i> Connect Wallet';
  }
}

// Add connection effect
function addConnectionEffect() {
  // Create a container for connection circles
  const container = document.createElement("div");
  container.className = "connection-effect";
  document.body.appendChild(container);

  // Create connecting circles
  for (let i = 0; i < 5; i++) {
    const circle = document.createElement("div");
    circle.className = "connect-circle";
    circle.style.animationDelay = `${i * 0.2}s`;
    container.appendChild(circle);
  }

  // Add style for connection effect
  const style = document.createElement("style");
  style.textContent = `
        .connection-effect {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        }
        
        .connect-circle {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: radial-gradient(circle, var(--glass-primary) 0%, transparent 70%);
            opacity: 0;
            animation: connect-pulse 2s ease-out forwards;
        }
        
        @keyframes connect-pulse {
            0% { 
                width: 0;
                height: 0;
                opacity: 0.7;
            }
            100% {
                width: 100vw;
                height: 100vw;
                opacity: 0;
            }
        }
    `;

  document.head.appendChild(style);

  // Remove effect after animation completes
  setTimeout(() => {
    container.remove();
  }, 2500);
}

// Update wallet display
function updateWalletDisplay() {
  const walletAddress = document.getElementById("wallet-address");
  if (userAccount) {
    const shortenedAddress = `${userAccount.substring(
      0,
      6
    )}...${userAccount.substring(userAccount.length - 4)}`;
    walletAddress.textContent = shortenedAddress;
    walletAddress.classList.add("connected");
    document.getElementById("connect-btn").innerHTML =
      '<i class="fa-solid fa-wallet"></i> Connected';
  } else {
    walletAddress.textContent = "Not Connected";
    walletAddress.classList.remove("connected");
    document.getElementById("connect-btn").innerHTML =
      '<i class="fa-solid fa-wallet"></i> Connect Wallet';
  }
}

// ✅ Add Product
async function addProduct() {
  if (!isWalletConnected()) return;

  const name = document.getElementById("product-name").value.trim();
  const price = document.getElementById("product-price").value.trim();

  // Form validation
  if (!name || name.length < 2) {
    return showNotification("Please enter a valid product name", "error");
  }

  if (!price || isNaN(price) || price <= 0) {
    return showNotification(
      "Please enter a valid price greater than 0",
      "error"
    );
  }

  const addButton = document.querySelector("button[onclick='addProduct()']");
  addButton.innerHTML = '<span class="loading"></span> Processing...';
  addButton.disabled = true;

  try {
    // Add the product to the blockchain
    await contract.methods.addProduct(name, price).send({ from: userAccount });

    // Clear form fields
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";

    showNotification(
      "Product added to the blockchain successfully!",
      "success"
    );

    // Add transaction effect
    addTransactionEffect();

    // Reload products
    await loadProducts();
  } catch (error) {
    console.error("Error adding product:", error);
    showNotification(error.message || "Transaction failed", "error");
  } finally {
    addButton.innerHTML =
      '<i class="fa-solid fa-arrow-up-from-bracket"></i> Add Product to Blockchain';
    addButton.disabled = false;
  }
}

// Add transaction effect
function addTransactionEffect() {
  // Create waves
  const waves = document.createElement("div");
  waves.className = "transaction-waves";
  document.body.appendChild(waves);

  // Add style for transaction effect
  const style = document.createElement("style");
  style.textContent = `
        .transaction-waves {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, var(--glass-success), transparent 70%);
            z-index: 999;
            pointer-events: none;
            opacity: 0;
            animation: wave-pulse 1.5s ease-out;
        }
        
        @keyframes wave-pulse {
            0% { opacity: 0; }
            50% { opacity: 0.2; }
            100% { opacity: 0; }
        }
    `;

  document.head.appendChild(style);

  // Remove effect after animation
  setTimeout(() => {
    waves.remove();
  }, 1500);
}

// ✅ Load Products
async function loadProducts() {
  if (!isWalletConnected()) return;

  // Set loading state
  isLoading = true;
  const productsElement = document.getElementById("products");
  const loadingElement = document.getElementById("loading-products");
  const noProductsElement = document.getElementById("no-products");

  loadingElement.style.display = "block";
  productsElement.innerHTML = "";
  noProductsElement.style.display = "none";

  try {
    const productCount = await contract.methods.productCount().call();

    // Update stats
    document.getElementById("product-count").textContent = productCount;

    allProducts = [];
    let totalVolume = 0;
    const sellers = new Set();

    // If no products found
    if (productCount == 0) {
      loadingElement.style.display = "none";
      noProductsElement.style.display = "block";
      return;
    }

    // Load each product
    for (let i = 1; i <= productCount; i++) {
      const product = await contract.methods.getProduct(i).call();
      allProducts.push(product);

      // Update stats data
      if (product.purchased) {
        totalVolume += parseFloat(web3.utils.fromWei(product.price, "ether"));
      }
      sellers.add(product.seller);
    }

    // Update stats display
    document.getElementById("trade-volume").textContent =
      totalVolume.toFixed(2) + " ETH";
    document.getElementById("unique-sellers").textContent = sellers.size;

    // Apply current filter
    filterProducts(currentFilter);
  } catch (error) {
    console.error("Error loading products:", error);
    showNotification("Failed to load products from blockchain", "error");
  } finally {
    loadingElement.style.display = "none";
    isLoading = false;

    // Show no products message if none were added to UI
    if (productsElement.children.length === 0 && allProducts.length === 0) {
      noProductsElement.style.display = "block";
    }
  }
}

// Filter products based on selection
function filterProducts(filter) {
  if (!allProducts || allProducts.length === 0) return;

  currentFilter = filter;

  // Update active tab
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`.tab-btn[onclick="filterProducts('${filter}')"]`)
    .classList.add("active");

  // Filter products
  const productsElement = document.getElementById("products");
  productsElement.innerHTML = "";
  const noProductsElement = document.getElementById("no-products");

  let filteredProducts = [];
  switch (filter) {
    case "available":
      filteredProducts = allProducts.filter((p) => !p.purchased);
      break;
    case "sold":
      filteredProducts = allProducts.filter((p) => p.purchased);
      break;
    default: // 'all'
      filteredProducts = allProducts;
  }

  // Display filtered products
  if (filteredProducts.length === 0) {
    noProductsElement.style.display = "block";
    noProductsElement.innerHTML = `
            <i class="fa-solid fa-filter fa-2x"></i>
            <p>No ${filter === "all" ? "" : filter} products found.</p>
        `;
  } else {
    noProductsElement.style.display = "none";

    // Add products with fade-in animation
    filteredProducts.forEach((product, index) => {
      setTimeout(() => {
        addProductToUI(product);
      }, index * 100);
    });
  }
}

// Add a product to the UI
function addProductToUI(product) {
  if (!product) return;

  const productsElement = document.getElementById("products");

  // Create product card
  const productElement = document.createElement("div");
  productElement.className = "product-card";
  productElement.style.opacity = "0";
  productElement.style.transform = "translateY(20px)";

  // Set status label
  const statusClass = product.purchased ? "sold" : "available";
  const statusText = product.purchased ? "Sold" : "Available";

  // Create short form of seller address
  const shortSellerAddress = `${product.seller.substring(
    0,
    6
  )}...${product.seller.substring(product.seller.length - 4)}`;
  const isCurrentUser =
    product.seller.toLowerCase() === (userAccount || "").toLowerCase();

  // Set content
  productElement.innerHTML = `
        <div class="product-status ${statusClass}">${statusText}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">${web3.utils.fromWei(
          product.price,
          "ether"
        )}</div>
        <div class="product-seller">
            <i class="fa-solid fa-user"></i> 
            ${isCurrentUser ? "You" : `Seller: ${shortSellerAddress}`}
        </div>
        ${
          !product.purchased
            ? `<button onclick="buyProduct(${product.id}, '${product.price}')" class="cyber-btn">
            <i class="fa-solid fa-basket-shopping"></i> Buy Now
        </button>`
            : ""
        }
    `;

  productsElement.appendChild(productElement);

  // Animate entry
  setTimeout(() => {
    productElement.style.transition = "all 0.5s ease";
    productElement.style.opacity = "1";
    productElement.style.transform = "translateY(0)";
  }, 10);
}

// ✅ Buy Product
async function buyProduct(productId, price) {
  if (!isWalletConnected()) return;

  if (isLoading) {
    return showNotification(
      "Please wait for the current transaction to complete",
      "warning"
    );
  }

  isLoading = true;

  try {
    // Update button to show loading
    const buyButton = event.target.closest("button");
    const originalHTML = buyButton.innerHTML;
    buyButton.innerHTML = '<span class="loading"></span> Processing...';
    buyButton.disabled = true;

    // Execute the purchase transaction
    await contract.methods.buyProduct(productId).send({
      from: userAccount,
      value: price,
    });

    showNotification(
      "Purchase successful! You now own this product.",
      "success"
    );

    // Add purchase effect
    addTransactionEffect();

    // Reload products to update UI
    await loadProducts();
  } catch (error) {
    console.error("Purchase error:", error);
    showNotification(error.message || "Transaction failed", "error");

    // Restore button state if we're staying on the same UI
    const buyButton = document.querySelector(
      `button[onclick="buyProduct(${productId}, '${price}')"]`
    );
    if (buyButton) {
      buyButton.innerHTML = originalHTML;
      buyButton.disabled = false;
    }
  } finally {
    isLoading = false;
  }
}

// Check if wallet is connected
function isWalletConnected() {
  if (!web3 || !contract || !userAccount) {
    showNotification("Please connect your wallet first", "warning");
    return false;
  }
  return true;
}

// Show notification
function showNotification(message, type = "info") {
  // Check if notification container exists
  let notificationContainer = document.querySelector(".notification-container");

  // Create container if it doesn't exist
  if (!notificationContainer) {
    notificationContainer = document.createElement("div");
    notificationContainer.className = "notification-container";
    document.body.appendChild(notificationContainer);

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
            }
            .notification {
                margin-bottom: 10px;
                padding: 15px 25px;
                border-radius: 12px;
                color: white;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                font-size: 14px;
                transition: all 0.3s ease;
                max-width: 300px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                animation: notification-slide 0.3s forwards;
                transform: translateX(100%);
            }
            
            @keyframes notification-slide {
                to { transform: translateX(0); }
            }
            
            .notification.info {
                background: rgba(106, 90, 224, 0.8);
            }
            .notification.success {
                background: rgba(46, 206, 137, 0.8);
            }
            .notification.warning {
                background: rgba(255, 207, 75, 0.8);
            }
            .notification.error {
                background: rgba(255, 94, 94, 0.8);
            }
            .notification i {
                margin-right: 10px;
                font-size: 1.2em;
            }
        `;
    document.head.appendChild(style);
  }

  // Create notification
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  // Set icon based on notification type
  let icon = "";
  switch (type) {
    case "success":
      icon = '<i class="fa-solid fa-circle-check"></i>';
      break;
    case "warning":
      icon = '<i class="fa-solid fa-triangle-exclamation"></i>';
      break;
    case "error":
      icon = '<i class="fa-solid fa-circle-xmark"></i>';
      break;
    default:
      icon = '<i class="fa-solid fa-circle-info"></i>';
  }

  notification.innerHTML = `${icon} ${message}`;
  notificationContainer.appendChild(notification);

  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100px)";
    setTimeout(() => {
      notificationContainer.removeChild(notification);
    }, 300);
  }, 5000);
}
