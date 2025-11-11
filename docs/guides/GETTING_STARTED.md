# Getting Started with ZUMI CASH

Welcome to ZUMI CASH, the privacy transfer protocol for Solana!

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- A Solana wallet (Phantom, Solflare, etc.)
- Basic understanding of TypeScript/JavaScript
- Upstash Redis account (free tier available)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/zumicash/zumi-transfer.git
cd zumi-transfer
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Fill in your configuration:

```env
UPSTASH_REDIS_URL=your_redis_url
UPSTASH_REDIS_TOKEN=your_redis_token
SOLANA_RPC_ENDPOINT=https://api.mainnet-beta.solana.com
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application running!

## Basic Usage

### Shielding Tokens (Public → Private)

```typescript
import axios from 'axios';

const shieldTokens = async () => {
  const response = await axios.post('/api/privacy/shield', {
    walletAddress: 'YOUR_WALLET_ADDRESS',
    amount: 1.5 // SOL amount
  });
  
  console.log('Session ID:', response.data.sessionId);
  console.log('Proof Hash:', response.data.proof.hash);
};
```

### Checking Transaction Status

```typescript
const checkStatus = async (sessionId: string) => {
  const response = await axios.get(`/api/privacy/shield?sessionId=${sessionId}`);
  console.log('Status:', response.data.session.status);
};
```

### Private Transfer

```typescript
const privateTransfer = async () => {
  const response = await axios.post('/api/privacy/transfer', {
    fromAddress: 'SHIELDED_ADDRESS_1',
    toAddress: 'SHIELDED_ADDRESS_2',
    amount: 0.5
  });
  
  return response.data;
};
```

## API Endpoints

### Privacy Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/privacy/shield` | Shield public tokens |
| POST | `/api/privacy/unshield` | Unshield to public |
| POST | `/api/privacy/transfer` | Private transfer |
| GET | `/api/privacy/balance/:address` | Get balances |

### Mixer Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/mixer/deposit` | Deposit to mixer |
| POST | `/api/mixer/withdraw` | Withdraw from mixer |
| GET | `/api/mixer/status/:id` | Check status |

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Deployment

### Deploy to Vercel

```bash
vercel
```

### Deploy to Netlify

```bash
netlify deploy
```

## Next Steps

- Read the [API Documentation](./API_DOCUMENTATION.md)
- Explore [Advanced Features](./ADVANCED_FEATURES.md)
## Support

Need help? Reach out:
- Documentation: https://zumi.cash/docs
- Website: https://zumi.cash/

## License

MIT License - see LICENSE file for details
