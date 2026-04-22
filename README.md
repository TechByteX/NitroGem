# NitroGem

A community-driven dApp for discovering, listing, voting on, and promoting cryptocurrency tokens. Users connect their wallets, list new tokens, vote for favorites with ETH, and climb tier-based rankings for maximum visibility.

---

## Features

### Token Listing & Discovery
- Submit new tokens with contract address, logo, social links, and network (Ethereum / BSC)
- Browse all listed tokens with filtering by tier, network, and recency
- Detailed token pages with market data, contract info, and social links

### Voting System
- Community members vote for tokens they believe in (0.0035 ETH per vote)
- Daily vote limit of 5 per wallet to prevent manipulation
- On-chain voting tracked via the VotingManager smart contract
- Real-time vote counts and daily/weekly rankings

### Tier-Based Promotion
- **Emerald Tier** - Free listing (default)
- **Ruby Tier** - 250+ votes or 0.5 ETH purchase for enhanced visibility
- **Diamond Tier** - 500+ votes or 1 ETH purchase for top-level promotion

### NitroGem Credits
- Purchase platform credits with ETH (9 price tiers from 0.001 to 5 ETH)
- Spend credits for voting and other platform actions
- On-chain credit system via the NitroGem smart contract

### Treasury
- Live treasury balance display (ETH converted to USD)
- Transparent fund tracking for buyback programs

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 17, React Router v6, SCSS, Material-UI |
| Backend | Express.js, SQLite (via Sequelize), Firebase Realtime Database |
| Blockchain | Solidity 0.8.20, Hardhat, OpenZeppelin, ethers.js v5 |
| Wallet | MetaMask integration via `@metamask/detect-provider` |
| Networks | Ethereum Mainnet, BSC (configurable) |

---

## Project Structure

```
nitrogem/
  contracts/           Solidity smart contracts
    NitroGem.sol         Credit system (buy credits, tiers, withdraw)
    VotingManager.sol    On-chain voting (vote, daily limits, fee forwarding)
  test/                Hardhat tests (53 tests)
  scripts/             Deployment & ABI sync scripts
  deployments/         Deployment records per network
  src/                 React frontend
    pages/               Page components (Default, Treasury, Details, etc.)
    components/          Shared UI components (NavBar, Footer, Filter, etc.)
    helpers/             Wallet, contract, Firebase, and config utilities
      abis/              Contract ABIs (synced from Hardhat artifacts)
    assets/              Images and fonts
  app/                 Express backend
    controllers/         Mempool scanning, DEX trading controllers
    routes/              API routes
    config/              Database configuration
  hardhat.config.js    Hardhat configuration
  package.json         Dependencies and scripts
```

---

## Getting Started

### Prerequisites

- Node.js >= 18.19.0
- npm >= 8.0.0
- MetaMask browser extension

### Install Dependencies

```sh
npm install
```

### Environment Setup

Create a `.env` file in the project root:

```
OPENAI_KEY=your_openai_key
OPENAI_MODEL=gpt-4
```

### Run the Application

```sh
npm start
```

This starts both the Express backend and the React dev server at `http://localhost:3000`.

---

## Smart Contracts

### Compile

```sh
npm run compile
```

### Run Tests

```sh
npm run test:contracts
```

All 53 tests cover: credit purchases (9 tiers), spending, tier buying, on-chain voting, daily limits, admin functions, pause/unpause, access control, and reentrancy protection.

### Build Contracts & Sync ABIs

```sh
npm run build:contracts
```

Compiles contracts and copies ABIs to `src/helpers/abis/` for the React frontend.

### Deploy

```sh
# Local Hardhat network
npm run deploy:local

# Sepolia testnet (configure in hardhat.config.js)
npm run deploy:sepolia

# Ethereum mainnet (configure in hardhat.config.js)
npm run deploy:mainnet
```

Deployment records are saved to `deployments/<network>.json`.

### Contract Overview

**NitroGem.sol** - Platform credit system
- `buyCredits()` - Purchase credits with ETH (9 price tiers)
- `spendCredits(amount, reason)` - Spend credits for platform actions
- `buyRubyTier()` / `buyDiamondTier()` - Tier upgrades
- `withdraw()` - Owner withdraws ETH to treasury
- `pause()` / `unpause()` - Emergency circuit breaker

**VotingManager.sol** - On-chain voting
- `vote(coinId)` - Vote for a token listing (0.0035 ETH fee)
- `votesRemainingToday(address)` - Check daily allowance
- `getVotes(coinId)` - Read total votes for a listing
- Fees forwarded to treasury immediately on each vote

Both contracts use OpenZeppelin's `Ownable`, `ReentrancyGuard`, and `Pausable`.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start backend + React dev server |
| `npm run compile` | Compile Solidity contracts |
| `npm run test:contracts` | Run all 53 smart contract tests |
| `npm run build:contracts` | Compile contracts + sync ABIs to frontend |
| `npm run deploy:local` | Deploy to local Hardhat network |
| `npm run deploy:sepolia` | Deploy to Sepolia testnet |
| `npm run deploy:mainnet` | Deploy to Ethereum mainnet |
| `npm run sync-abi` | Copy compiled ABIs to frontend |
| `npm test` | Run React unit tests |

---

## Configuration

Contract addresses and fee settings are in `src/helpers/configurations/index.js`:

```js
ENVS = {
  CONTRACT_ADDRESS: "0x...",        // NitroGem contract
  VOTING_CONTRACT_ADDRESS: "",      // VotingManager (set after deployment)
  CHAIN_ID: "0x1",                  // Ethereum Mainnet
  NORMAL_VOTE_FEE: "0.0035",       // ETH per vote
  RUBY_TIRE_FEE: "0.5",            // Ruby tier price
  DIAMOND_TIRE_FEE: "1",           // Diamond tier price
  CHARITY_ADDR: "0x...",            // Fee recipient
  TREASURY_ADDR: "0x...",           // Treasury address
}
```

Network configuration for deployments is in `hardhat.config.js`.

---

## License

MIT
