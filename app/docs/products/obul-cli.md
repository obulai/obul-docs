---
title: Obul CLI
description: Terminal tool for power users — coming Q3 2025
sidebar_position: 1
status: coming-soon
---

:::status Coming Soon — Q3 2025
:::

The command line is still the fastest way to get things done. Obul CLI brings the dashboard to your terminal.

## What It Is

A unified CLI for managing Obul resources, monitoring transactions, and integrating payments without leaving your shell.

```bash
# Install globally
npm install -g @obul/cli

# Or use with npx
npx @obul/cli <command>
```

## What's Coming

### Resource Management

```bash
# API Keys
obul keys list
obul keys create --name "production" --permissions write
obul keys revoke obul_live_xxx

# Services
obul services list
obul services create --name "my-api" --url "https://api.example.com"
```

### Transaction Monitoring

```bash
# Real-time stream
obul transactions tail

# Query and export
obul transactions list --since "1h" --status success
obul transactions export --format csv --since "7d"
```

### Payment Operations

```bash
# Check balance and history
obul balance
obul payments list

# Context switching
obul context use production
obul context use staging
```

## Use Cases We're Building For

**CI/CD Integration:**
```yaml
# .github/workflows/deploy.yml
- name: Deploy with Obul
  run: |
    obul login --token ${{ secrets.OBUL_TOKEN }}
    obul services update my-api --version ${{ github.sha }}
```

**Local Development:**
```bash
# Start local proxy
obul proxy --port 8080 --target http://localhost:3000

# Watch transactions in real-time
obul transactions tail --format json | jq '.amount'
```

**Automation:**
```bash
#!/bin/bash
# backup-transactions.sh

DATE=$(date +%Y-%m-%d)
obul transactions export \
  --format csv \
  --since "$DATE" \
  --output "transactions-$DATE.csv"
```

## Installation (When Available)

| Platform | Method |
|----------|--------|
| macOS | `brew install obul` |
| Linux | `curl -sSL https://obul.ai/install.sh \| bash` |
| Windows | `winget install Obul.CLI` |
| npm | `npm install -g @obul/cli` |

## Get Early Access

Be the first to try it:

[Join the Waitlist](https://obul.ai/cli-waitlist)

## Feedback

Have feature requests? Let us know:

- Email: [cli-feedback@obul.ai](mailto:cli-feedback@obul.ai)
- Discord: #cli-discussion
