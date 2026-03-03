---
title: Discovery
description: Discover Obul APIs and services
sidebar_position: 1
---

Obul provides a curated discovery layer for the x402 economy — find, evaluate, and integrate pay-per-use APIs without managing wallets or crypto.

:::info
Users can check out API Marketplace on obul.ai or by clicking on Discovery tab in their Dashboard.
:::

## Install the API Finder

Give your agent the ability to search, browse, and install any API in the Obul catalog.

```bash
curl -fsSL https://raw.githubusercontent.com/obulai/obul-apis/main/skills/obul-api-finder/install.sh | bash
```

This installs the API Finder skill with four scripts:

| **Command** | **What it does** |
| --- | --- |
| `node skills/obul-api-finder/scripts/search.js "keyword"` | Find APIs by use case |
| `node skills/obul-api-finder/scripts/list.js "category"` | Browse all APIs by category |
| `node skills/obul-api-finder/scripts/fetch.js <skill-name>` | Read skill docs and requirements |
| `node skills/obul-api-finder/scripts/install.js <skill-name>` | Install a skill to `~/.claude/skills/` |

## Browse by Category

| Category | Use Cases | Examples |
|----------|-----------|----------|
| **Infrastructure** | Proxy, authentication, file storage, media conversion, messaging | obul-proxy, pinata, cnvrt.ing, didit |
| **Web Scraping** | Extract data from any website reliably | firecrawl, browserbase, zyte, minifetch |
| **Web Search** | AI-powered web search, SERP results, deep research | perplexity, tavily, jina, exa |
| **Social Media** | Query X, Farcaster, Reddit programmatically | tweetx402, neynar, reddit |
| **Blockchain/DeFi** | Prices, wallet analysis, on-chain data | coingecko, zapper, heyelsa, dome |
| **Image/Audio/Video** | Generate images, audio, video with AI | freepik, genbase, tavus, aibeats |
| **Security/Risk** | Audit contracts, assess risk | orac, blackswan |
| **Lead Enrichment** | Find emails, phone numbers, company data | apollo, hunter, stableenrich, coresignal |
| **Weather Data** | Hyperlocal weather, forecasts, climate data | precip |


See the full catalog in the [API Marketplace Github](https://github.com/obulai/obul-apis).
