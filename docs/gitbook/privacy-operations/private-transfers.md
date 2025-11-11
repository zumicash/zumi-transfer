# Private Transfers

Send tokens with complete anonymity using Zero-Knowledge proofs.

## What are Private Transfers?

Private transfers allow you to send shielded tokens to another shielded address **without revealing**:
- Sender address
- Receiver address  
- Transfer amount
- Transaction history

## How It Works

```
Shielded Wallet A    ZUMI Proof Transfer    Shielded Wallet B
   (Hidden)      ━━━━━━━━━━━━━━>      (Hidden)

   5.0 SOL          Amount: [HIDDEN]       5.0 SOL
                    From: [HIDDEN]
                    To: [HIDDEN]
```

On-chain, observers only see:
- A ZUMI proof was verified
- A transaction occurred
- **NO details about who, what, or how much**

## Transfer Process

### Step 1: Get Recipient Address

Recipient shares their **shielded address**:
```
0ZUMI_9f8e7d6c5b4a3210fedcba9876543210abcdef
```

### Step 2: Check Your Balance

```bash
$ balance

Public Balance:  2.5 SOL
Shielded Balance: 5.0 SOL  ✅
```

### Step 3: Send Private Transfer

**Command:**
```bash
$ transfer <recipient_address> <amount>
```

**Example:**
```bash
$ transfer 0ZUMI_9f8e7d6c5b4a3210fedcba 1.5

⏳ Validating recipient address...
⏳ Generating ZUMI proof...
⏳ Broadcasting transaction...
✓ Private transfer completed!

ZUMI Proof: 0x3f2e1d0c9b8a7f6e5d4c3b2a
Transaction: [PRIVATE]

Your Balance: 3.5 SOL (5.0 - 1.5)
Recipient will see funds in ~30 seconds
```

### Step 4: Confirmation

Recipient can verify receipt:
```bash
$ balance

Shielded Balance: 6.5 SOL  ✅ (+1.5 SOL)
```

## Transfer Features

### Standard Transfer

Basic private transfer:
```bash
$ transfer 0ZUMI_abc123... 2.0
```

### Transfer with Memo

Add encrypted memo (only recipient can read):
```bash
$ transfer 0ZUMI_abc123... 2.0 "Payment for services"

✓ Transfer sent with encrypted memo
```

### Delayed Transfer

Schedule transfer for later:
```bash
$ transfer 0ZUMI_abc123... 2.0 --delay 30m

⏳ Transfer scheduled for 30 minutes
Cancel with: cancel-transfer TX_abc123
```

### Recurring Transfer

Set up automatic payments:
```bash
$ transfer 0ZUMI_abc123... 1.0 --recurring daily

✓ Recurring transfer set up
Frequency: Daily at 12:00 UTC
```

## Advanced Options

### Custom Gas

Set custom gas for faster confirmation:
```bash
$ transfer 0ZUMI_abc123... 2.0 --gas 0.002

⏳ Using priority gas: 0.002 SOL
✓ Transfer completed in 3 seconds
```

### Multi-Recipient

Send to multiple addresses:
```bash
$ transfer --multi \
  0ZUMI_addr1... 1.0 \
  0ZUMI_addr2... 2.0 \
  0ZUMI_addr3... 0.5

⏳ Processing 3 transfers...
✓ All transfers completed
Total sent: 3.5 SOL
```

### Split Payment

Split amount among recipients:
```bash
$ transfer --split 6.0 \
  0ZUMI_addr1... \
  0ZUMI_addr2... \
  0ZUMI_addr3...

✓ 6.0 SOL split equally (2.0 each)
```

## Transaction Privacy

### What's Hidden

✅ Sender address (completely hidden)
✅ Receiver address (completely hidden)
✅ Transfer amount (completely hidden)
✅ Transaction metadata (completely hidden)
✅ Balance changes (completely hidden)

### What's Visible

❓ A ZUMI proof was submitted
❓ Proof verification result (valid/invalid)
❓ Approximate timestamp

### Privacy Level

```
Privacy Score: ██████████ 100%

Private transfers provide MAXIMUM privacy
```

## Verification

### Verify Receipt (Recipient)

Recipient can check their balance:
```bash
$ balance
$ tx
```

Both show updated balance without revealing sender.

### Verify Sending (Sender)

Sender can verify transaction:
```bash
$ tx

Recent Transactions:
1. Private Transfer  1.5 SOL  [✓ Completed] 1min ago
   To: [PRIVATE]
   ZUMI Proof: 0x3f2e...
```

## Common Issues

### Issue: Insufficient Shielded Balance

```bash
$ transfer 0ZUMI_abc... 10.0

✗ Error: Insufficient shielded balance
Available: 5.0 SOL
Required: 10.0 SOL + gas
```

**Solution:** Shield more tokens first or reduce amount.

### Issue: Invalid Recipient Address

```bash
$ transfer invalid_address 1.0

✗ Error: Invalid shielded address format
Expected format: 0ZUMI_...
```

**Solution:** Double-check recipient address (must start with "0ZUMI_").

### Issue: Transaction Timeout

```bash
$ transfer 0ZUMI_abc... 2.0

⏳ Waiting for confirmation...
✗ Timeout: Transaction not confirmed
```

**Solution:** Check network status or retry with higher gas.

## Security Tips

1. ✅ **Always verify recipient address** before sending
2. ✅ **Start with small test amounts** for new recipients
3. ✅ **Save transaction proofs** for your records
4. ✅ **Use memos for tracking** (optional, encrypted)
5. ✅ **Check balance after sending** to verify

## Transaction Fees

| Transfer Type | Gas Fee | Time |
|--------------|---------|------|
| Standard | ~0.001 SOL | 5-10s |
| With Memo | ~0.0015 SOL | 5-10s |
| Multi-recipient | ~0.001 SOL each | 10-20s |
| Recurring Setup | ~0.002 SOL | 5-10s |

## FAQ

**Q: Can anyone trace my private transfer?**
A: No, Zero-Knowledge proofs ensure complete untraceability.

**Q: Does the recipient know who sent it?**
A: No, unless you include identifying info in the encrypted memo.

**Q: Can I cancel a transfer?**
A: Only if it's a delayed transfer and hasn't been executed yet.

**Q: Are there transfer limits?**
A: No limits, but large amounts may require additional confirmation time.

## Next Steps

- [Privacy Mixer](./mixer.md) - Enhanced privacy through mixing
- [Cross-Chain Bridge](./bridge.md) - Private bridging to other chains
- [Transaction History](./transaction-history.md) - View your private transactions

---

**Previous:** [Shielding Tokens](./shielding.md) | **Next:** [Privacy Mixer](./mixer.md)