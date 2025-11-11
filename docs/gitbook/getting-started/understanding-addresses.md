# Understanding Addresses

Learn about public and shielded addresses in ZUMI.

## Two Types of Addresses

ZUMI uses two distinct address types for maximum privacy:

### 1. Public Address (Solana Native)

**Format:** Standard Solana base58 address

**Example:** `52TG2miyqWfJ4rhvQiS7Kc7EBm6gtRj6GEJSSttjK8Bw`

**Characteristics:**
- ✅ Visible on Solana blockchain explorer
- ✅ Same as regular Solana wallets
- ✅ Used for deposits and public transactions
- ✅ Balances are transparent
- ❌ No privacy protection

### 2. Shielded Address (ZUMI Private)

**Format:** Zero-Knowledge protected address

**Example:** `0zum_4350c48084244b24f1d2dc3547c812b0c5af4esa`

**Characteristics:**
- ✅ NOT visible on blockchain
- ✅ Balances are hidden
- ✅ Transactions are private
- ✅ Protected by ZUMI proofs
- ✅ Full anonymity guaranteed

## How They Work Together

```
┌─────────────────┐
│  Public Address │
│    (Visible)    │
└────────┬────────┘
         │
         │ SHIELD
         ▼
┌─────────────────┐
│ Shielded Address│
│    (Hidden)     │
└────────┬────────┘
         │
         │ UNSHIELD
         ▼
┌─────────────────┐
│  Public Address │
│    (Visible)    │
└─────────────────┘
```

## Privacy Flow

### Step 1: Deposit to Public Address
Receive SOL or SPL tokens to your public address (visible on-chain)

### Step 2: Shield Tokens
Transfer tokens from public to shielded address (becomes private)

### Step 3: Private Operations
All transactions within shielded addresses are completely private

### Step 4: Unshield (Optional)
Transfer back to public address when you need visibility

## Address Comparison

| Feature | Public Address | Shielded Address |
|---------|---------------|------------------|
| Visibility | ✅ Visible | ❌ Hidden |
| Privacy | ❌ None | ✅ Complete |
| Transaction History | ✅ Public | ❌ Private |
| Balance | ✅ Visible | ❌ Hidden |
| ZUMI Proofs | ❌ No | ✅ Yes |
| Speed | Fast | Fast |
| Cost | Low | Slightly Higher |

## Use Cases

### Use Public Address For:
- Receiving funds from exchanges
- Public airdrops
- Transparent transactions
- Quick transfers

### Use Shielded Address For:
- Private payments
- Salary/payment privacy
- Anonymous donations
- Trading without tracking
- Mixing funds
- Cross-chain privacy

## Security Notes

🔐 **Shielded addresses provide complete privacy** - No one can see your balance or transaction history

🔐 **Zero-Knowledge proofs** verify transactions without revealing details

🔐 **Non-custodial** - You always control your keys

## Next Steps

- [CLI Dashboard Overview](./dashboard-overview.md)
- [Basic Commands](./basic-commands.md)
- [Shielding Tokens](../privacy-operations/shielding.md)

---

**Previous:** [Creating Your First Wallet](./creating-wallet.md) | **Next:** [CLI Dashboard Overview](./dashboard-overview.md)