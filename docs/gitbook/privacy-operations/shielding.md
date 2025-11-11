# Shielding Tokens

Learn how to shield your tokens for complete privacy.

## What is Shielding?

Shielding converts your **public tokens** into **private tokens** protected by Zero-Knowledge proofs. Once shielded, your balance and transactions become completely invisible on the blockchain.

## How Shielding Works

```
Public Wallet          Shielding Process         Private Wallet
(Visible)         ━━━━━━━━━━━━━━━━>        (Hidden)

10.5 SOL               Generate ZUMI Proof          10.5 SOL
                       Lock on public side        (Invisible)
                       Mint on private side
```

## Shielding Process

### Step 1: Check Public Balance

```bash
$ balance

Public Balance:  10.5 SOL
Shielded Balance: 0 SOL
```

### Step 2: Shield Tokens

**Command:**
```bash
$ shield <amount>
```

**Example:**
```bash
$ shield 5.0

⏳ Generating ZUMI proof...
⏳ Submitting to Solana...
✓ Successfully shielded 5.0 SOL

ZUMI Proof Hash: 0x7a8f3e2d1c0b9a8f7e6d5c4b3a2f1e0d
Transaction: https://solscan.io/tx/abc123...

New Balances:
Public:   5.5 SOL (10.5 - 5.0)
Shielded: 5.0 SOL
```

### Step 3: Verify Shielding

Check your updated balances:
```bash
$ balance

Public Balance:  5.5 SOL
Shielded Balance: 5.0 SOL  ✅
```

## Important Notes

### Gas Fees

⚠️ **Shielding requires gas fees** (approximately 0.001-0.005 SOL)

Make sure to keep some SOL in your public wallet for fees:
```bash
# Shield amount = Public Balance - Gas Reserve
$ shield 5.0  # Leaves ~5.5 SOL for future gas
```

### Shielding Time

- **ZUMI Proof Generation**: 2-5 seconds
- **Transaction Confirmation**: 1-3 seconds
- **Total Time**: ~5-10 seconds

### Minimum Amount

Minimum shielding amount: **0.01 SOL**

```bash
$ shield 0.005

✗ Error: Amount below minimum (0.01 SOL)
```

## Advanced Shielding

### Shield All

Shield entire public balance (minus gas):
```bash
$ shield all

⏳ Calculating maximum amount...
⏳ Shielding 10.495 SOL (0.005 reserved for gas)
✓ Complete!
```

### Shield Specific Tokens

Shield SPL tokens:
```bash
$ shield 100 USDC

⏳ Shielding 100 USDC...
✓ Successfully shielded 100 USDC
```

### Batch Shielding

Shield multiple assets:
```bash
$ shield 5.0 SOL 100 USDC 50 USDT

⏳ Processing 3 shielding operations...
✓ Shielded 5.0 SOL
✓ Shielded 100 USDC  
✓ Shielded 50 USDT
```

## Verification

### Check ZUMI Proof

Verify your shielding proof:
```bash
$ verify-proof 0x7a8f3e2d...

✓ Proof Valid
Amount: 5.0 SOL (Hidden)
Timestamp: 2024-01-15 10:30:45 UTC
Status: Confirmed
```

### View on Explorer

Public transaction is visible, but **amount and destination are hidden**:

```
Transaction: abc123...
Type: Shield
From: 7xKXt...aLQ8k
To: 0ZUMI (Shielded Pool)
Amount: [HIDDEN]
Status: Success
```

## Common Issues

### Issue: Insufficient Balance

```bash
$ shield 15.0

✗ Error: Insufficient public balance
Available: 10.5 SOL
Required: 15.0 SOL + gas
```

**Solution:** Shield a smaller amount or add more SOL to public wallet.

### Issue: Network Congestion

```bash
$ shield 5.0

⏳ Network congested, retrying...
✓ Success (took 30 seconds)
```

**Solution:** Wait for network to clear or increase gas.

### Issue: Failed Proof Generation

```bash
$ shield 5.0

✗ Error: Failed to generate ZUMI proof
```

**Solution:** Retry the operation:
```bash
$ shield 5.0 --retry
```

## Security Best Practices

1. ✅ **Always verify balances** after shielding
2. ✅ **Keep some public SOL** for gas fees
3. ✅ **Save transaction hashes** for records
4. ✅ **Don't shield entire balance** - reserve for gas
5. ✅ **Use secure connections** when shielding

## FAQ

**Q: Can anyone see my shielded balance?**
A: No, shielded balances are completely hidden using Zero-Knowledge proofs.

**Q: Can I unshield later?**
A: Yes, you can unshield anytime back to your public wallet.

**Q: Are shielding fees high?**
A: No, typically 0.001-0.005 SOL per transaction.

**Q: How long do shielded tokens stay private?**
A: Forever, until you choose to unshield them.

## Next Steps

- [Private Transfers](./private-transfers.md) - Send shielded tokens privately
- [Privacy Mixer](./mixer.md) - Enhance privacy further
- [Unshielding](./unshielding.md) - Convert back to public

---

**Previous:** [Basic Commands](../getting-started/basic-commands.md) | **Next:** [Private Transfers](./private-transfers.md)