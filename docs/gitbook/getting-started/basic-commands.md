# Basic Commands

Master the essential ZUMI CLI commands.

## Command Structure

All commands follow this pattern:

```bash
$ command [subcommand] [parameters] [options]
```

## Essential Commands

### help - Display Available Commands

```bash
$ help

Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━
  balance         - Check wallet balances
  shield <amt>    - Shield tokens to private
  unshield <amt>  - Unshield to public
  transfer <to> <amt> - Private transfer
  mixer <amt>     - Use privacy mixer
  bridge <amt> <chain> - Cross-chain bridge
  tx [limit]      - View transactions
  stats           - Privacy analytics
  clear           - Clear terminal
  exit            - Exit dashboard

Type 'help <command>' for detailed info
```

### balance - Check Your Balances

**Syntax:**
```bash
$ balance
```

**Output:**
```
Public Balance:  10.5 SOL
Shielded Balance: 5.2 SOL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: 15.7 SOL
```

### shield - Shield Tokens to Private

**Syntax:**
```bash
$ shield <amount>
```

**Examples:**
```bash
# Shield 2.5 SOL
$ shield 2.5

✓ Successfully shielded 2.5 SOL
ZUMI Proof: 0x0fcd...
Transaction: https://solscan.io/tx/...
```

### unshield - Unshield to Public

**Syntax:**
```bash
$ unshield <amount>
```

**Examples:**
```bash
# Unshield 1.0 SOL
$ unshield 1.0

✓ Successfully unshielded 1.0 SOL
Public Balance: 11.5 SOL
```

### transfer - Private Transfer

**Syntax:**
```bash
$ transfer <recipient_address> <amount>
```

**Examples:**
```bash
# Send 1.5 SOL privately
$ transfer 0ZUMI_abc123... 1.5

✓ Private transfer completed
ZUMI Proof: 0x3f2e...
Recipient will see funds in ~30 seconds
```

### mixer - Use Privacy Mixer

**Syntax:**
```bash
$ mixer <amount> [delay_minutes]
```

**Examples:**
```bash
# Mix 3.0 SOL with 30 min delay
$ mixer 3.0 30

⏳ Mixing 3.0 SOL...
Estimated completion: 30 minutes
Mixer ID: MIX_a7b8c9d0
```

### bridge - Cross-Chain Bridge

**Syntax:**
```bash
$ bridge <amount> <target_chain>
```

**Examples:**
```bash
# Bridge 2.0 SOL to Ethereum
$ bridge 2.0 ethereum

⏳ Bridging 2.0 SOL to Ethereum...
Estimated time: 5-10 minutes
Bridge ID: BRG_1a2b3c4d
```

### tx - View Transactions

**Syntax:**
```bash
$ tx [limit]
```

**Examples:**
```bash
# View last 5 transactions
$ tx 5

Recent Transactions:
1. Shield    2.5 SOL   [✓ Completed] 2min ago
2. Transfer  1.0 SOL   [✓ Completed] 5min ago
3. Mixer     3.0 SOL   [⏳ Processing] 10min ago
4. Bridge    2.0 SOL   [✓ Completed] 1hr ago
5. Unshield  0.5 SOL   [✓ Completed] 2hr ago
```

### stats - Privacy Analytics

**Syntax:**
```bash
$ stats
```

**Output:**
```
Privacy Analytics:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Transactions:    25
Shielded Amount:       45.5 SOL
Mixed Amount:          12.0 SOL  
Bridged Amount:        8.5 SOL

Privacy Score:         █████████░ 95/100

⚡ Excellent Privacy Level!
```

### clear - Clear Terminal

**Syntax:**
```bash
$ clear
```

Clears the terminal screen.

### exit - Exit Dashboard

**Syntax:**
```bash
$ exit
```

Exits the CLI dashboard and returns to landing page.

## Command Options

Many commands support additional options:

```bash
# Verbose output
$ transfer <to> <amt> --verbose

# Skip confirmation
$ shield 2.0 --yes

# Custom gas
$ bridge 1.0 ethereum --gas 0.001
```

## Error Handling

### Insufficient Balance
```bash
$ shield 100

✗ Error: Insufficient public balance
Available: 10.5 SOL
Required: 100 SOL + gas
```

### Invalid Address
```bash
$ transfer invalid_address 1.0

✗ Error: Invalid recipient address
Please check the address format
```

### Network Error
```bash
$ balance

✗ Error: Unable to connect to Solana network
Check your internet connection
```

## Tips & Tricks

### 1. Command Aliases

Create shortcuts for common operations:
```bash
# Check balance quickly
$ b  (alias for balance)

# View recent transactions
$ t  (alias for tx)
```

### 2. Batch Operations

Chain multiple commands:
```bash
# Shield then mix
$ shield 5.0 && mixer 5.0
```

### 3. Command History

Navigate previous commands:
- ↑ (Up): Previous command
- ↓ (Down): Next command

### 4. Copy-Paste Support

Copy addresses and hashes:
```bash
# Copy ZUMI proof hash
$ tx 1 --copy-proof
```

## Next Steps

- [Shielding Tokens](../privacy-operations/shielding.md)
- [Private Transfers](../privacy-operations/private-transfers.md)
- [Privacy Mixer](../privacy-operations/mixer.md)

---

**Previous:** [CLI Dashboard Overview](./dashboard-overview.md) | **Next:** [Shielding Tokens](../privacy-operations/shielding.md)