---
title: Claude Plugins
description: Obul plugins for Claude Code
sidebar_position: 3
---

# Claude Plugins

Official Obul plugins for Claude Code provide curated skills backed by x402 services. Install once, access 50+ APIs with natural language commands.

## What is Obul for Claude?

Obul is the universal API gateway for the agent economy. These plugins bring that power directly into Claude Code — no context switching, no API management, just natural language commands.

**Key benefits:**
- One `OBUL_API_KEY` for all services
- Pay-per-use with consolidated billing
- No wallet setup, no crypto, no gas fees
- Scoped keys with spending caps

## Plugin Categories

| Category | Plugin | Skills |
|----------|--------|--------|
| 🔗 Infrastructure | obul-core | obul-proxy, pinata, cnvrting |
| 🔥 Web Scraping | obul-scrape | firecrawl, browserbase, zyte, minifetch, x402engine-web |
| 🔍 Web Search | obul-search | firecrawl-search, exa |
| 🐦 Social Media | obul-social | x-search, neynar, reddit |
| 💰 Blockchain/DeFi | obul-crypto | coingecko, heyelsa, zapper, slamai, silverback, blocksec, x402engine-chain, ordiscan |
| 🎨 Media | obul-media | freepik, x402engine-image, x402engine-audio, dtelecom, aibeats, genbase |
| 🛡️ Security & Risk | obul-security | orac, blackswan |
| 👤 Lead Enrichment | obul-leads | stableenrich |

## Installation

Add the Obul plugin marketplace to Claude Code:

```bash
claude plugin marketplace add https://github.com/obulai/obul-plugin.git
```

Install all plugins:

```bash
claude plugin install obul-core obul-scrape obul-search obul-social obul-crypto obul-media obul-security obul-leads
```

Or install individually:

```bash
claude plugin install obul-scrape
claude plugin install obul-search
# etc.
```

## Available Commands

### Web Scraping (obul-scrape)

| Command | Description | Cost |
|---------|-------------|------|
| `/obul-scrape:scrape <url>` | Scrape a webpage | $0.001 |
| `/obul-scrape:screenshot <url>` | Screenshot a webpage | $0.01 |

### Web Search (obul-search)

| Command | Description | Cost |
|---------|-------------|------|
| `/obul-search:search <query>` | Search the web | $0.002 |

### Social Media (obul-social)

| Command | Description | Cost |
|---------|-------------|------|
| `/obul-social:x-search <query>` | Search X/Twitter | $0.001 |
| `/obul-social:farcaster <query>` | Search Farcaster | $0.01 |

### Crypto (obul-crypto)

| Command | Description | Cost |
|---------|-------------|------|
| `/obul-crypto:price <coin>` | Get crypto prices | $0.01 |
| `/obul-crypto:wallet <address>` | Look up wallet info | $0.001 |

### Media (obul-media)

| Command | Description | Cost |
|---------|-------------|------|
| `/obul-media:imagine <prompt>` | Generate an image | $0.015+ |
| `/obul-media:transcribe <file>` | Transcribe audio or generate speech | $0.01+ |

### Security (obul-security)

| Command | Description | Cost |
|---------|-------------|------|
| `/obul-security:audit <target>` | Security analysis | $0.005+ |

### Leads (obul-leads)

| Command | Description | Cost |
|---------|-------------|------|
| `/obul-leads:enrich <query>` | People/company enrichment | $0.02+ |

### Core (obul-core)

| Command | Description | Cost |
|---------|-------------|------|
| `/obul-core:proxy <url>` | Proxy any request to an x402 endpoint | Varies |

## Example Usage

Scrape a website:
```
/obul-scrape:scrape https://example.com
```

Search the web:
```
/obul-search:search "latest AI developments"
```

Generate an image:
```
/obul-media:imagine "a futuristic city at sunset"
```

Get crypto price:
```
/obul-crypto:price bitcoin
```

## Setup

1. Sign up at [my.obul.ai](https://my.obul.ai)
2. Set your API key:
   ```bash
   export OBUL_API_KEY="your-key-here"
   ```
3. Install plugins (see above)
4. Start using commands in Claude Code

## Resources

- [Obul Dashboard](https://my.obul.ai) — manage keys, view usage, set spending caps
- [x402 Protocol](https://www.x402.org/) — the payment protocol powering Obul
- [Writing a New Skill](https://github.com/dpbmaverick98/Agent_Army_Skills/blob/main/Agent_Army_Skills_Obul/how-to-write-obul-skills.md) — guide for contributors