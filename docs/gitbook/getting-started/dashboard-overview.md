# CLI Dashboard Overview

Comprehensive guide to the ZUMI CLI interface.

## Dashboard Layout

The CLI dashboard mimics a terminal interface for a hacker-style experience:



Welcome to ZUMI CASH Privacy Terminal
Wallet: 7xKXt...aLQ8k

Type 'help' for available commands

$ _
```

## Main Components

### 1. Header Section

- **ASCII Logo**: ZUMI CASH branding
- **Version Info**: Current terminal version
- **Wallet Status**: Connected wallet address

### 2. Command Input

All interactions are command-based:

```bash
$ command [parameters]
```

### 3. Output Display

Command results displayed in terminal style with color coding:

- **Green**: Success messages
- **Red**: Error messages
- **Yellow**: Warnings
- **Cyan**: Information
- **White**: Default text

## Core Features

### Balance Display

View your balances instantly:

```bash
$ balance

Public Balance:  10.5 SOL
Shielded Balance: 5.2 SOL

Total: 15.7 SOL
```

### Transaction History

Check recent transactions:

```bash
$ tx

Recent Transactions:
1. Shield    2.5 SOL   [Completed] 2min ago
2. Transfer  1.0 SOL   [Completed] 5min ago
3. Mixer     3.0 SOL   [Processing] 10min ago
```

### Privacy Stats

View your privacy metrics:

```bash
$ stats

Privacy Analytics:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Transactions:    15
Shielded Amount:       45.5 SOL
Mixed Amount:          12.0 SOL
Privacy Score:         95/100

⚡ Excellent Privacy Level!
```

## Navigation

### Command History

Use arrow keys to navigate previous commands:

- **↑ (Up Arrow)**: Previous command
- **↓ (Down Arrow)**: Next command
- **Tab**: Auto-complete (coming soon)

### Clear Screen

```bash
$ clear
```

### Exit

```bash
$ exit
```

## Dashboard Sections

### 1. Balance Section
- Real-time balance updates
- Public vs Shielded separation
- Multiple token support

### 2. Transaction Section
- Create new transactions
- View pending transactions
- Transaction history

### 3. Privacy Section
- Privacy mixer
- Cross-chain bridge
- Analytics dashboard

### 4. Settings Section
- RPC configuration
- Privacy preferences
- Network selection

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + C` | Cancel current operation |
| `Ctrl + L` | Clear screen |
| `↑` / `↓` | Command history |
| `Enter` | Execute command |
| `Esc` | Exit current mode |

## Status Indicators

```
⚡ Processing  - Transaction in progress
✓ Completed   - Transaction successful
✗ Failed      - Transaction failed
⏳ Pending    - Awaiting confirmation
🔒 Private    - Shielded transaction
```

## Tips for Efficient Use

1. **Learn Basic Commands First**: Start with `help`, `balance`, and `tx`

2. **Use Command History**: Navigate previous commands with arrow keys

3. **Check Status Often**: Use `stats` to monitor privacy metrics

4. **Bookmark Commands**: Save frequently used commands

5. **Monitor Gas**: Always check gas before transactions

## Next Steps

- [Basic Commands](./basic-commands.md)
- [Shielding Tokens](../privacy-operations/shielding.md)
- [Private Transfers](../privacy-operations/private-transfers.md)

---

**Previous:** [Understanding Addresses](./understanding-addresses.md) | **Next:** [Basic Commands](./basic-commands.md)