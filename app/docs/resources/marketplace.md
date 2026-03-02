---
title: API Marketplace
description: Browse and access the Obul API Marketplace
sidebar_position: 2
---

# API Marketplace

The Obul API Marketplace provides pay-per-use access to 50+ APIs across web scraping, search, enrichment, social media, blockchain, and media generation.

## Available APIs by Category

### Web Scraping
Firecrawl, Browserbase, Zyte, Minifetch, Aviato, Fiber, Notte, Nyne, Olostep, Riveter, Scrapegraph, x402engine-web

### Web Search
Firecrawl Search, Exa, Jina, Parallel, Perplexity, Tavily, SearchAPI, Valyu, Sybil

### Lead Enrichment
StableEnrich, BrandDev, Coresignal, OpenMart, PredictLeads, SixtyFour, Tomba, Apollo, Hunter, Logo

### Social Media
Tweetx402, Neynar, Reddit, Scrape-Creators

### Blockchain/DeFi
CoinGecko, HeyElsa, Zapper, SlamAI, Silverback, Blocksec, Ordiscan, Dome, x402engine-chain

### Image/Audio/Video
FreePik, x402engine-image, x402engine-audio, DTelecom, AIBeats, Genbase, Nano-Banana, Nano-Banana-2, Tavus, Zai

### Security/Risk
Orac, BlackSwan

### Infrastructure
Proxy, Pinata, Cnvrting, DIDit, Textbelt, Chronos

### Weather
Precip

## Use Cases

### Run Your Entire GTM Workflow

Just ran a full prospect enrichment pipeline, without writing a single line of code:

- Found the prospect's email (Hunter)
- Pulled full LinkedIn profile + work history (Fiber)
- Enriched the company data (BrandDev)
- Found a phone number (Tomba)
- Ready to send an SMS (Textbelt)

That's 5 different APIs, stitched together in one conversation.

### Single API Examples

| Task | API | Cost |
|------|-----|------|
| Enrich a lead | Apollo, Coresignal | ~$0.02 |
| Scrape a website | Firecrawl, Browserbase | ~$0.001 |
| Check crypto prices | CoinGecko | ~$0.01 |
| Generate images | FreePik, Tavus | ~$0.015+ |
| Send SMS | Textbelt | Varies |

### Compound Workflows

**Lead Generation Engine:**
Search (Exa) → Enrich (Apollo) → Verify (Hunter) → Enrich Company (BrandDev)

**Market Research:**
Scrape (Firecrawl) → Analyze (Jina) → Visualize (FreePik)

**Crypto Portfolio Monitor:**
Price Data (CoinGecko) → Wallet Analysis (Zapper) → Alerts

**Content Pipeline:**
Search (Perplexity) → Scrape (Browserbase) → Transcribe (DTelecom)

**Security Audit:**
Scrape Contract (Ordiscan) → Analyze (Blocksec) → Report (Orac)

## How to Use

All marketplace APIs work the same way:

```bash
curl -H "X-Obul-Api-Key: $OBUL_API_KEY" \
  "https://proxy.obul.ai/proxy/https/{service}.x402endpoints.com/v1/endpoint"
```

No separate accounts. No API keys to manage. Just your `OBUL_API_KEY`.

## Claude Code Integration

These APIs work seamlessly in Claude Code — just add your `OBUL_API_KEY` and start building.

See [Claude Plugins](/resources/claude-plugins) for pre-built skills.