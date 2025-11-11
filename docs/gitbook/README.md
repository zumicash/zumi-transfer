# ZUMI Cash — Privacy Layer for Solana

<div align="center">

[![Website](https://img.shields.io/badge/Website-zumi.cash-7B3FF2?style=for-the-badge&logo=google-chrome&logoColor=white)](https://zumi.cash)
[![Twitter](https://img.shields.io/badge/Twitter-@zumicash-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/zumicash)
[![Telegram](https://img.shields.io/badge/Telegram-@zumicash-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/zumicash)
[![Solana](https://img.shields.io/badge/Solana-Network-14F195?style=for-the-badge&logo=solana&logoColor=white)](https://solana.com)

[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)

</div>

### _Private, secure, and censorship-resistant transactions for the Solana ecosystem._

ZUMI Cash establishes a new financial primitive on Solana — an **invisible settlement layer** designed for individuals, teams, traders, protocols, and institutions that require confidentiality without compromising on-chain validity or execution speed.

Financial privacy is essential for fairness, safety, negotiation, and sovereignty. Without privacy, every action reveals intention, competitive strategy, and personal financial state. ZUMI Cash ensures that **economic activity on Solana can remain both verifiable and private**, enabling users to operate with security, dignity, and freedom.

---

## Philosophy

Modern blockchain ecosystems have achieved scale, speed, and openness — but openness has come at a cost. Every transfer, position, wallet balance, and strategic action is visible to everyone.

That means:
- Traders are watched and front‑run
- Personal wealth is exposed to strangers
- Corporate treasury movements leak strategy
- Negotiations are forced to happen off‑chain
- Individuals lose any concept of financial privacy

ZUMI Cash reintroduces privacy as a core pillar of the Solana economy, allowing users to interact, transact, and build **without broadcasting their actions to the world**.

Privacy is not secrecy.  
Privacy is **selective visibility** — the right to choose what is shared and with whom.

---

## Core Architecture

ZUMI Cash is designed to be **lightweight, interoperable, and composable**, integrating seamlessly into the existing Solana developer and wallet ecosystem.

### Component Breakdown

| Component | Technology | Role |
|----------|------------|------|
| Frontend Client | Next.js 14+, TypeScript | User interface + wallet interaction |
| Application Layer | Serverless API (Edge Runtime) | Stateless request coordination |
| State Controller | Upstash Redis | Temporary encrypted state + status tracking |
| Settlement Layer | Solana Web3.js + Light Protocol | On-chain settlement and privacy shielding |
| Proof Engine | ZUMI Proof Service | Ensures transaction correctness without revealing context |

This layered model ensures:
- No personal information is stored
- The system cannot be used to profile or monitor users
- The protocol cannot censor or reorder user transactions
- Performance remains consistent with Solana’s throughput

### Environment Configuration

```
UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=

SOLANA_RPC_ENDPOINT=
SOLANA_NETWORK=mainnet-beta

ZUMI_PROOF_API_KEY=
ZUMI_PROOF_ENDPOINT=

NEXT_PUBLIC_APP_URL=https://zumi.cash
MERCHANT_CALLBACK_SECRET=
```

---

## Transaction Privacy Flow

### 1. Shielding Assets
A user deposits assets into a privacy-enabled address that obscures the source and intended destination.

### 2. Proof of Valid Transfer
A mathematical proof is generated confirming:
- The sender controls the assets
- The transaction is legitimate
- No duplication or double usage occurs

This happens *without* disclosing:
- Sender identity
- Receiver identity
- Transfer amount
- Balance origin

### 3. Settlement on Solana
The transaction is executed on-chain, but the observable state reveals no user-specific information.

### 4. Confirmation and Monitoring
Users and merchants receive real‑time status updates through WebSockets or webhook callbacks.


---

## Features

### Privacy Controls
- Private token transfers
- Shielded balances
- Invisible swaps and market actions
- Adjustable privacy depth settings
- Optional mixing for deeper anonymity sets

### Developer Toolkit
- REST API for integration directly into existing services
- Real-time WebSocket streams for live applications
- TypeScript SDK for client or server environments
- Complete reference documentation

### Merchant + Enterprise Console
- Private and compliant reporting workflows
- Internal account permission and auditing layers
- Secure export pipelines
- Designed for treasury, payroll, OTC, settlement, and internal transfers

---

## Endpoints Overview

```
POST /api/privacy/shield        → Enable privacy mode for assets
POST /api/privacy/unshield      → Convert back to standard visibility
POST /api/privacy/transfer      → Execute private payment or settlement
GET  /api/privacy/balance/:id   → Retrieve hidden balance state

POST /api/mixer/deposit         → Add assets to private liquidity pool
POST /api/mixer/withdraw        → Withdraw after privacy strengthening
GET  /api/mixer/status/:id      → Check processing status

POST /api/bridge/initiate       → Begin cross-network private routing
GET  /api/bridge/status/:id     → Verify routing progress
POST /api/bridge/claim          → Receive funds on the destination chain

GET  /api/analytics/stats       → Protocol analytics
GET  /api/analytics/wallet/:id  → Wallet privacy profile
GET  /api/analytics/privacy-score/:id
```

---

## Security Model

ZUMI Cash does **not**:
- Store personal data
- Track wallet identity
- Log user activity
- Control custody
- Interfere with settlement order

The user is always in control of assets and visibility.

Privacy is guaranteed through mathematical validation of transaction correctness, rather than trust in intermediaries.

---

## Development Workflow

```
npm install
npm run dev
npm run build
npm start
npm test
```

---

## Deployment Options

| Platform | Status | Notes |
|---------|--------|------|
| Vercel | ✅ Recommended | Global scaling + edge execution |
| AWS Amplify | Supported | Can integrate enterprise workflows |
| Cloudflare Workers | Supported | Best for low-latency regions |
| Netlify | Supported | Simple deployment pipeline |

---

## Roadmap

### Phase 1 — Establish Privacy Foundation ✅
- Shielding + unshielding framework
- Asset-obscured transfers
- Solana mainnet reliability

### Phase 2 — Network Expansion 🚧
- Private liquidity and multi‑participant pool mechanics
- Cross‑chain private settlement
- Full client + server SDK packages

### Phase 3 — Institutional & Infrastructure Layer 📌
- Privacy gateways for exchanges and enterprise services
- Mobile-native secure signing clients
- Multi‑chain execution pathways

---

## Contributions

We welcome contributions from:
- Solana developers
- Privacy researchers
- Wallet integration teams
- DAOs, funds, treasury managers
- Compliance-aware infrastructure builders

Please review `CONTRIBUTING.md` before submitting improvements.

---

## License

MIT License — free for public and commercial use.

---

## Official Channels

🌐 Website: https://zumi.cash  
📚 Documentation: https://zumi.cash/docs  
🐦 Twitter: https://x.com/zumicash  
💬 Telegram: https://t.me/zumicash  

> **True freedom in finance requires privacy. Without privacy, there is no autonomy.**
> — ZUMI Cash Team
