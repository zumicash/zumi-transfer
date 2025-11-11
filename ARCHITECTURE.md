# ZK-RAICHAN Architecture

## System Overview

ZK-RAICHAN is a privacy-first protocol built on Solana, providing zero-knowledge transaction capabilities through a serverless architecture.

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│                     (Next.js 14 + React)                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTPS/WSS
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    API Layer (Serverless)                    │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐  │
│  │  Privacy   │  │   Mixer    │  │      Bridge          │  │
│  │   APIs     │  │   APIs     │  │       APIs           │  │
│  └────────────┘  └────────────┘  └──────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │               │
        ▼              ▼               ▼
┌──────────────┐  ┌──────────┐  ┌──────────────┐
│    Redis     │  │  Solana  │  │  ZK Proof    │
│   (Upstash)  │  │  Network │  │   Service    │
│              │  │          │  │              │
│ - Sessions   │  │ - Txs    │  │ - Generate   │
│ - Cache      │  │ - Balance│  │ - Verify     │
│ - Queue      │  │ - Status │  │ - Store      │
└──────────────┘  └──────────┘  └──────────────┘
```

## Core Components

### 1. Privacy Service Layer

**Purpose:** Handle all privacy-related operations (shield, unshield, transfer)

**Components:**
- `lib/services/solana.ts` - Solana blockchain interactions
- `lib/services/zkproof.ts` - Zero-knowledge proof generation/verification
- `lib/services/redis.ts` - State management and caching

**Key Features:**
- Address validation
- Shielded address generation
- Balance tracking (public + private)
- Transaction lifecycle management

### 2. API Routes (Next.js App Router)

**Structure:**
```
app/api/
├── privacy/
│   ├── shield/route.ts        # Shield public tokens
│   ├── unshield/route.ts      # Unshield to public
│   ├── transfer/route.ts      # Private transfers
│   └── balance/[address]/route.ts
├── mixer/
│   ├── deposit/route.ts       # Mixer deposit
│   ├── withdraw/route.ts      # Mixer withdraw
│   └── status/[id]/route.ts
├── bridge/
│   ├── initiate/route.ts      # Cross-chain bridge
│   ├── claim/route.ts
│   └── status/[id]/route.ts
└── analytics/
    ├── stats/route.ts         # Platform stats
    └── wallet/[address]/route.ts
```

### 3. State Management (Redis)

**Data Models:**

```typescript
// Privacy Session
{
  sessionId: string
  walletAddress: string
  type: 'shield' | 'unshield' | 'transfer' | 'mixer' | 'bridge'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  amount: number
  proofHash: string
  txSignature?: string
  createdAt: number
  expiresAt: number
}

// Cached Balance
{
  publicBalance: number
  shieldedBalance: number
  timestamp: number
}

// ZK Proof
{
  proofHash: string
  commitment: string
  nullifier: string
  timestamp: number
}
```

### 4. Zero-Knowledge Proof System

**Proof Generation Flow:**
1. User initiates transaction
2. System generates unique commitment & nullifier
3. ZK circuit creates proof without revealing details
4. Proof hash stored temporarily in Redis
5. On-chain submission with proof
6. Verification via Light Protocol

**Privacy Guarantees:**
- No link between sender/receiver
- Amount obfuscated
- Transaction graph analysis resistant
- Forward secrecy maintained

## Data Flow Examples

### Shield Transaction Flow

```
User Wallet (Public)
      │
      ├─→ POST /api/privacy/shield
      │   { walletAddress, amount }
      │
      ▼
API validates address
      │
      ▼
Generate shielded address
      │
      ▼
Create ZK proof
  - commitment
  - nullifier
  - proof hash
      │
      ▼
Store session in Redis
      │
      ▼
Return session details
  { sessionId, proofHash, status }
      │
      ▼
User signs & submits on Solana
      │
      ▼
Update session status → completed
```

### Private Transfer Flow

```
Shielded Address A
      │
      ├─→ POST /api/privacy/transfer
      │   { fromShielded, toShielded, amount }
      │
      ▼
Validate both addresses
      │
      ▼
Generate transfer proof
  - proves ownership of A
  - proves valid amount
  - hides both parties
      │
      ▼
Submit shielded transaction
      │
      ▼
Recipient sees balance increase
(without knowing sender)
```

## Security Considerations

### 1. Proof Verification
- All proofs verified before on-chain submission
- Commitment/nullifier uniqueness enforced
- Time-based expiration (prevents replay)

### 2. Session Management
- Sessions expire after 1 hour
- Unique session IDs prevent collision
- Status transitions logged

### 3. Rate Limiting
- Redis-based request throttling
- Per-wallet address limits
- IP-based restrictions (optional)

### 4. Error Handling
- No sensitive data in error messages
- Failed transactions don't leak proof data
- Graceful degradation on service failures

## Scalability

### Horizontal Scaling
- Serverless functions auto-scale
- Stateless API design
- Redis handles concurrent sessions

### Performance Optimization
- Redis caching for balances (5min TTL)
- Batch proof verification support
- Lazy loading for historical data

### Monitoring
- Request latency tracking
- Proof generation time metrics
- Session completion rates
- Error rate monitoring

## Deployment Architecture

### Production Stack
```
Vercel Edge Functions
       │
       ├─→ Primary (us-east-1)
       ├─→ Fallback (eu-west-1)
       └─→ Backup (ap-southeast-1)

Upstash Redis Global
       │
       └─→ Multi-region replication

Solana RPC
       │
       ├─→ Primary node
       └─→ Backup nodes
```

### CI/CD Pipeline
```
GitHub Push
    │
    ▼
Run Tests
    │
    ▼
Build & Deploy (Vercel)
    │
    ▼
Integration Tests
    │
    ▼
Production Live
```

## Future Enhancements

### Phase 1
- [ ] Light Protocol full integration
- [ ] Hardware wallet support
- [ ] Mobile SDK

### Phase 2
- [ ] Multi-chain support (Ethereum, Polygon)
- [ ] Enhanced mixer with time-locked deposits
- [ ] Institutional features

### Phase 3
- [ ] Decentralized prover network
- [ ] Governance token
- [ ] DAO for protocol upgrades

## References

- [Solana Documentation](https://docs.solana.com)
- [Light Protocol](https://lightprotocol.com)
- [Zero-Knowledge Proofs](https://z.cash/technology/zksnarks/)
- [Upstash Redis](https://upstash.com)
