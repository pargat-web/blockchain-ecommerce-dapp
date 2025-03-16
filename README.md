# Blockchain E-Commerce Platform

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![Blockchain](https://img.shields.io/badge/Blockchain-Ethereum-blue)
![Frontend](https://img.shields.io/badge/Frontend-HTML/CSS/JS-orange)

A decentralized e-commerce marketplace built on the Ethereum blockchain with a modern glass morphism UI design. This platform allows users to buy and sell products using cryptocurrency in a secure, transparent, and decentralized manner.

![Blockchain E-Commerce Platform](https://github.com/your-username/blockchain-ecommerce-dapp/raw/main/screenshot.png)

## 🚀 Features

- **Decentralized Marketplace**: Buy and sell products directly on the Ethereum blockchain
- **Beautiful Glass Morphism UI**: Modern, clean interface with glass-like effects and subtle animations
- **Wallet Integration**: Seamless connection with MetaMask and other Web3 wallets
- **Real-time Blockchain Stats**: Dynamic dashboard showing marketplace activity
- **Product Management**: List new products and track your listings
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop
- **Smart Contract Integration**: Secure transactions managed by Ethereum smart contracts
- **Visual Transaction Feedback**: Animated effects for blockchain interactions

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [MetaMask](https://metamask.io/download.html) or another Web3 wallet
- A modern web browser (Chrome, Firefox, Edge, etc.)
- [Node.js](https://nodejs.org/) (if you want to run a local development server)
- Some ETH in your wallet for transactions (can use testnet ETH)

## 💻 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blockchain-ecommerce-dapp.git
   cd blockchain-ecommerce-dapp
   ```

2. Open `index.html` in your browser or set up a local server:
   ```bash
   # Using Node.js and http-server (optional)
   npm install -g http-server
   http-server
   ```

3. Configure your smart contract:
   - Deploy the e-commerce smart contract to Ethereum (main net or test net)
   - Update the contract address in `script.js`
   - Verify the ABI matches your deployed contract

## ⚙️ Smart Contract Configuration

To connect the frontend to your smart contract:

1. Open `script.js` and locate these lines:
   ```javascript
   const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with deployed contract address
   const contractABI = YOUR_ABI_HERE; // Replace with contract ABI JSON
   ```

2. Replace `YOUR_CONTRACT_ADDRESS` with your deployed contract address
3. Replace `YOUR_ABI_HERE` with your contract's ABI (already included in the repo)

## 📱 Usage

### Connecting Your Wallet
1. Click the "Connect Wallet" button at the top of the page
2. Approve the connection request in your MetaMask (or other wallet)
3. Your wallet address will be displayed, and you'll be able to interact with the marketplace

### Adding a Product
1. Navigate to the "Add New Product" section
2. Enter the product name and price (in Wei)
3. Click "Add Product to Blockchain"
4. Confirm the transaction in your wallet
5. Wait for the transaction to be mined

### Buying a Product
1. Browse the available products in the marketplace
2. Click "Buy Now" on a product you want to purchase
3. Confirm the transaction in your wallet
4. Once completed, the product status will change to "Sold"

### Viewing Statistics
The dashboard displays real-time statistics from the blockchain:
- Total products listed
- Total trading volume
- Number of unique sellers

### Filtering Products
Use the tabs above the product list to filter:
- All products
- Available products only
- Sold products only

## 🧩 Project Structure

```
blockchain-ecommerce-dapp/
├── index.html          # Main HTML file
├── style.css           # CSS styles with glass morphism design
├── script.js           # JavaScript for blockchain interaction
├── README.md           # Project documentation
└── screenshot.png      # Screenshot of the application
```

## 🔧 Customization

### Changing Personal Details
1. Open `index.html` and locate the header section to update:
   - Your name and title
   - Social media links (LinkedIn, GitHub, email)

### Modifying the Theme
1. Open `style.css` and update the CSS variables in the `:root` selector:
   ```css
   :root {
       --glass-primary: #6A5AE0;    /* Primary color */
       --glass-secondary: #FF8A65;  /* Secondary color */
       --glass-accent: #16C2D5;     /* Accent color */
       /* More color variables... */
   }
   ```

## 🌐 Network Configuration

The platform can work with different Ethereum networks:

- **Mainnet**: For production use with real transactions
- **Testnet** (Goerli, Sepolia): For testing without using real ETH
- **Local Blockchain**: For development (Ganache, Hardhat)

To change networks:
1. Switch networks in your MetaMask wallet
2. Reconnect to the application
3. Ensure your contract is deployed on the selected network

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Web3.js](https://web3js.readthedocs.io/) - Ethereum JavaScript API
- [MetaMask](https://metamask.io/) - Crypto wallet & gateway to blockchain apps
- [Particles.js](https://vincentgarreau.com/particles.js/) - Lightweight particle animation
- [Font Awesome](https://fontawesome.com/) - Icons used in the UI

## 📞 Contact

Pargat Singh - [LinkedIn](https://www.linkedin.com/in/pargat1204/) - pargatttsinghhh@gmail.com

Project Link: [https://github.com/pargat-web](https://github.com/your-username/blockchain-ecommerce-dapp) 