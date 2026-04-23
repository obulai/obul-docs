---
title: Quickstart
description: Access 100+ APIs and Skills with One API Key.
sidebar_position: 1
---

Polymer Pay is the **universal API gateway for the agent economy**. One `POLYMER_PAY_API_KEY`, consolidated billing, and a catalog of 100+ APIs your agent can discover and use on demand.

Get started in under 5 minutes.

## Prerequisites

- `curl` or your preferred HTTP client
- (Optional) Python 3.8+ or Node.js 16+

## Step 1: Install the API Finder

Give your agent the ability to search, browse, and install any API in the Polymer Pay catalog.

```bash
curl -fsSL https://raw.githubusercontent.com/polymerdao/pay-apis/main/skills/polymer-pay-api-finder/install.sh | bash
```

This installs the API Finder skill with four scripts:

| **Command** | **What it does** |
| --- | --- |
| `node skills/polymer-pay-api-finder/scripts/search.js "keyword"` | Find APIs by use case |
| `node skills/polymer-pay-api-finder/scripts/list.js "category"` | Browse all APIs by category |
| `node skills/polymer-pay-api-finder/scripts/fetch.js <skill-name>` | Read skill docs and requirements |
| `node skills/polymer-pay-api-finder/scripts/install.js <skill-name>` | Install a skill to`~/.claude/skills/` |

### Step 2: Find What You Need

Search the catalog:

```bash
$ node skills/polymer-pay-api-finder/scripts/search.js "timezone"
[
  {
    "name": "chronos",
    "category": "utilities",
    "skill": "polymer-pay-chronos",
    "description": "Timezone conversion and current time service"
  }
]
```

Or browse by category:

```bash
$ node skills/polymer-pay-api-finder/scripts/list.js "infrastructure"
```

Available categories:

| Category | Examples |
|----------|----------|
| **infrastructure** | polymer-pay-proxy, pinata, cnvrt.ing, didit |
| **web-scraping** | firecrawl, browserbase, zyte, minifetch |
| **web-search** | perplexity, tavily, jina, exa |
| **social-media** | tweetx402, neynar, reddit |
| **blockchain-defi** | coingecko, zapper, heyelsa, dome |
| **image-audio-video** | freepik, genbase, tavus, aibeats |
| **security-risk** | orac, blackswan |
| **lead-enrichment** | apollo, hunter, stableenrich, coresignal |
| **weather-data** | precip |

## Step 3: Get a Polymer Pay API Key

When your agent (or you) tries to use an API, you'll need an `POLYMER_PAY_API_KEY`. If you don't have one:

### Create an Account

Go to [my.pay.polymerlabs.org/dashboard/api-keys](https://my.pay.polymerlabs.org/dashboard/api-keys) and sign up with email or GitHub.

### Add a Payment Method

1. In the dashboard, go to Billing → Add Payment Method
2. Connect your card for pay-as-you-go billing

:::info
A payment method is required to activate API keys. You won't be charged until you make requests — usage is metered and billed monthly.
:::

### Generate Your Key

1. Navigate to API Keys → Create New Key
2. Name it (e.g., "My Agent") and set a spend limit
3. Copy the key — you won't see it again

```bash
export POLYMER_PAY_API_KEY="polymer_pay_live_139f82dc-aef7-4060-bbbf-c96e018e"
```

:::tip
Note: While the user generates API key go ahead and ask them if you can continue to step 4 of installed required skill.
:::

## Step 4: Install and Use the API

Fetch the skill details to see requirements:

```bash
$ node skills/polymer-pay-api-finder/scripts/fetch.js polymer-pay-chronos
Name: polymer-pay-chronos
Description: Timezone conversion and current time service
Pricing: $0.005 per request
Requires: POLYMER_PAY_API_KEY
```

Install it:

```bash
$ node skills/polymer-pay-api-finder/scripts/install.js polymer-pay-chronos
✓ Installed polymer-pay-chronos to ~/.claude/skills/polymer-pay-chronos
```

Now use it:

### Using curl

```bash
# Get current time in Tokyo
curl -H "X-Polymer-Pay-Api-Key: $POLYMER_PAY_API_KEY" \
  "https://pay.polymerlabs.org/proxy/https/mavs-agent-army.fly.dev/api/chronos/api/now?timezone=Asia/Tokyo"

# Convert a meeting time
curl -X POST \
  -H "X-Polymer-Pay-Api-Key: $POLYMER_PAY_API_KEY" \
  -H "Content-Type: application/json" \
  "https://pay.polymerlabs.org/proxy/https/mavs-agent-army.fly.dev/api/chronos/api/convert" \
  -d '{"datetime":"2026-03-15T09:00:00","fromTimezone":"America/New_York","toTimezone":"Asia/Tokyo"}'
```

### Using Claude Code (with the skill)

```markdown
/polymer-pay-chronos:now Asia/Tokyo
/polymer-pay-chronos:convert 2026-03-15T09:00:00 America/New_York Asia/Tokyo
```

## What Your Agent Can Do Now

With the API Finder installed, your agent can:

1. Search for APIs by describing what it needs ("timezone", "find email", "scrape website")
2. Fetch skill documentation to understand pricing and requirements
3. Prompt you for a Polymer Pay API key if not configured
4. Install skills automatically to `~/.claude/skills/`
5. Execute API calls through Polymer Pay's proxy

No more hunting through documentation. Your agent discovers capabilities on demand.

Each API discovered via `search.js`, installed with `install.js`, and called through Polymer Pay's unified proxy.

## What's Happening Under the Hood

When your agent makes a request:

1. **Discovery** — Polymer Pay contacts the target service and learns its x402 requirements
2. **Payment Proof** — Polymer Pay generates and attaches payment proof automatically
3. **Forwarding** — Request is forwarded with proof attached
4. **Response** — Service responds, your agent gets the data
5. **Tracking** — Charge is metered to your account

Your agent never sees the x402 complexity. It's just HTTP.
