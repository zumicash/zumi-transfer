# Installation & Setup

Learn how to install and run ZUMI on your system.

## System Requirements

- **Node.js**: v18.0.0 or higher
- **NPM/Yarn**: Latest version
- **Operating System**: macOS, Linux, or Windows (WSL2 recommended)
- **RAM**: Minimum 4GB
- **Storage**: At least 500MB free space

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/zumicash/zumi.git
cd zumi
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` file with your configuration:

```env
# Upstash Redis (Required)
UPSTASH_REDIS_URL=your_redis_url
UPSTASH_REDIS_TOKEN=your_redis_token

# Solana Configuration
SOLANA_RPC_ENDPOINT=https://api.mainnet-beta.solana.com
SOLANA_NETWORK=mainnet-beta

# Application
NEXT_PUBLIC_APP_URL=https://zumi.cash
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to access the dashboard.

### 5. Access CLI Dashboard

Navigate to the Dashboard section and connect your Solana wallet to start using privacy features.

## Verifying Installation

After installation, verify everything works:

```bash
# Check Node version
node --version

# Check installation
npm list

# Run tests (optional)
npm test
```

## Next Steps

- [Creating Your First Wallet](./creating-wallet.md)
- [Understanding Addresses](./understanding-addresses.md)
- [CLI Dashboard Overview](./dashboard-overview.md)

## Troubleshooting Installation

**Issue: Node version too old**
```bash
# Install Node v18+ using nvm
nvm install 18
nvm use 18
```

**Issue: Dependencies fail to install**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: Port 3000 already in use**
```bash
# Change port in package.json or kill process
lsof -ti:3000 | xargs kill -9
```

---

**Next:** [Creating Your First Wallet](./creating-wallet.md)
