---
title: Claude Plugins
description: Polymer Pay plugins for Claude Code
sidebar_position: 3
---

Official Polymer Pay plugins for Claude Code provide curated skills backed by x402 services. Install once, access 50+ APIs with natural language commands.

## What is Polymer Pay for Claude?

Polymer Pay is the universal API gateway for the agent economy. These plugins bring that power directly into Claude Code — no context switching, no API management, just natural language commands.

**Key benefits:**
- One `POLYMER_PAY_API_KEY` for all services
- Pay-per-use with consolidated billing
- No wallet setup, no crypto, no gas fees
- Scoped keys with spending caps

## Plugin Categories

| Category | Plugin | Skills |
|----------|--------|--------|
| 🔗 Infrastructure | polymer-pay-core | polymer-pay-proxy, pinata, cnvrting |
| 🔥 Web Scraping | polymer-pay-scrape | firecrawl, browserbase, zyte, minifetch, x402engine-web |
| 🔍 Web Search | polymer-pay-search | firecrawl-search, exa |
| 🐦 Social Media | polymer-pay-social | x-search, neynar, reddit |
| 💰 Blockchain/DeFi | polymer-pay-crypto | coingecko, heyelsa, zapper, slamai, silverback, blocksec, x402engine-chain, ordiscan |
| 🎨 Media | polymer-pay-media | freepik, x402engine-image, x402engine-audio, dtelecom, aibeats, genbase |
| 🛡️ Security & Risk | polymer-pay-security | orac, blackswan |
| 👤 Lead Enrichment | polymer-pay-leads | stableenrich |

## Installation

Add the Polymer Pay plugin marketplace to Claude Code:

```bash
claude plugin marketplace add https://github.com/polymerdao/pay-plugin.git
```

Install all plugins:

```bash
claude plugin install polymer-pay-core polymer-pay-scrape polymer-pay-search polymer-pay-social polymer-pay-crypto polymer-pay-media polymer-pay-security polymer-pay-leads
```

Or install individually:

```bash
claude plugin install polymer-pay-scrape
claude plugin install polymer-pay-search
# etc.
```

## Available Commands

### Web Scraping (polymer-pay-scrape)

| Command | Description | Cost |
|---------|-------------|------|
| `/polymer-pay-scrape:scrape <url>` | Scrape a webpage | $0.001 |
| `/polymer-pay-scrape:screenshot <url>` | Screenshot a webpage | $0.01 |

### Web Search (polymer-pay-search)

| Command | Description | Cost |
|---------|-------------|------|
| `/polymer-pay-search:search <query>` | Search the web | $0.002 |

### Social Media (polymer-pay-social)

| Command | Description | Cost |
|---------|-------------|------|
| `/polymer-pay-social:x-search <query>` | Search X/Twitter | $0.001 |
| `/polymer-pay-social:farcaster <query>` | Search Farcaster | $0.01 |

### Crypto (polymer-pay-crypto)

| Command | Description | Cost |
|---------|-------------|------|
| `/polymer-pay-crypto:price <coin>` | Get crypto prices | $0.01 |
| `/polymer-pay-crypto:wallet <address>` | Look up wallet info | $0.001 |

### Media (polymer-pay-media)

| Command | Description | Cost |
|---------|-------------|------|
| `/polymer-pay-media:imagine <prompt>` | Generate an image | $0.015+ |
| `/polymer-pay-media:transcribe <file>` | Transcribe audio or generate speech | $0.01+ |

### Security (polymer-pay-security)

| Command | Description | Cost |
|---------|-------------|------|
| `/polymer-pay-security:audit <target>` | Security analysis | $0.005+ |

### Leads (polymer-pay-leads)

| Command | Description | Cost |
|---------|-------------|------|
| `/polymer-pay-leads:enrich <query>` | People/company enrichment | $0.02+ |

### Core (polymer-pay-core)

| Command | Description | Cost |
|---------|-------------|------|
| `/polymer-pay-core:proxy <url>` | Proxy any request to an x402 endpoint | Varies |

## Example Usage

Scrape a website:
```
/polymer-pay-scrape:scrape https://example.com
```

Search the web:
```
/polymer-pay-search:search "latest AI developments"
```

Generate an image:
```
/polymer-pay-media:imagine "a futuristic city at sunset"
```

Get crypto price:
```
/polymer-pay-crypto:price bitcoin
```

## Setup

1. Sign up at [my.pay.polymerlabs.org/dashboard/api-keys](https://my.pay.polymerlabs.org/dashboard/api-keys)
2. Set your API key:
   ```bash
   export POLYMER_PAY_API_KEY="your-key-here"
   ```
3. Install plugins (see above)
4. Start using commands in Claude Code

## Resources

- [Polymer Pay Dashboard](https://my.pay.polymerlabs.org/dashboard/api-keys) — manage keys, view usage, set spending caps
- [x402 Protocol](https://www.x402.org/) — the payment protocol powering Polymer Pay
- [Writing a New Skill](https://github.com/dpbmaverick98/Agent_Army_Skills/blob/main/Agent_Army_Skills_Obul/how-to-write-obul-skills.md) — guide for contributors
