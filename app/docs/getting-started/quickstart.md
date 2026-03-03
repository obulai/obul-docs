---
title: Quickstart
description: Access 100+ APIs and Skills with One API Key.
sidebar_position: 1
---

Obul is the **universal API gateway for the agent economy**. One `OBUL_API_KEY`, consolidated billing, and a catalog of 100+ APIs your agent can discover and use on demand.

Get started in under 5 minutes.

## Prerequisites

- `curl` or your preferred HTTP client
- (Optional) Python 3.8+ or Node.js 16+

## Step 1: Install the API Finder

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
| `node skills/obul-api-finder/scripts/install.js <skill-name>` | Install a skill to`~/.claude/skills/` |

### Step 2: Find What You Need

Search the catalog:

```bash
$ node skills/obul-api-finder/scripts/search.js "timezone"
[
  {
    "name": "chronos",
    "category": "utilities",
    "skill": "obul-chronos",
    "description": "Timezone conversion and current time service"
  }
]
```

Or browse by category:

```bash
$ node skills/obul-api-finder/scripts/list.js "utilities"
```

Available categories:

- `infrastructure`
- `web-scraping`
- `web-search`
- `social-media`
- `blockchain-defi`
- `image-audio-video`
- `security-risk`
- `lead-enrichment`
- `weather-data`

## Step 3: Get an Obul API Key

When your agent (or you) tries to use an API, you'll need an `OBUL_API_KEY`. If you don't have one:

### Create an Account

Go to [my.obul.ai](https://my.obul.ai/) and sign up with email or GitHub.

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
export OBUL_API_KEY="obul_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

:::tip
Note: While the user generates API key go ahead and ask them if you can continue to step 4 of installed required skill.
:::

## Step 4: Install and Use the API

Fetch the skill details to see requirements:

```bash
$ node skills/obul-api-finder/scripts/fetch.js obul-chronos
Name: obul-chronos
Description: Timezone conversion and current time service
Pricing: $0.005 per request
Requires: OBUL_API_KEY
```

Install it:

```bash
$ node skills/obul-api-finder/scripts/install.js obul-chronos
✓ Installed obul-chronos to ~/.claude/skills/obul-chronos
```

Now use it:

### Using curl

```bash
# Get current time in Tokyo
curl -H "X-Obul-Api-Key: $OBUL_API_KEY" \
  "https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/chronos/api/now?timezone=Asia/Tokyo"

# Convert a meeting time
curl -X POST \
  -H "X-Obul-Api-Key: $OBUL_API_KEY" \
  -H "Content-Type: application/json" \
  "https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/chronos/api/convert" \
  -d '{"datetime":"2026-03-15T09:00:00","fromTimezone":"America/New_York","toTimezone":"Asia/Tokyo"}'
```

### Using Claude Code (with the skill)

```markdown
/obul-chronos:now Asia/Tokyo
/obul-chronos:convert 2026-03-15T09:00:00 America/New_York Asia/Tokyo
```

## What Your Agent Can Do Now

With the API Finder installed, your agent can:

1. Search for APIs by describing what it needs ("timezone", "find email", "scrape website")
2. Fetch skill documentation to understand pricing and requirements
3. Prompt you for an Obul API key if not configured
4. Install skills automatically to `~/.claude/skills/`
5. Execute API calls through Obul's proxy

No more hunting through documentation. Your agent discovers capabilities on demand.

Each API discovered via `search.js`, installed with `install.js`, and called through Obul's unified proxy.

## What's Happening Under the Hood

When your agent makes a request:

1. **Discovery** — Obul contacts the target service and learns its x402 requirements
2. **Payment Proof** — Obul generates and attaches payment proof automatically
3. **Forwarding** — Request is forwarded with proof attached
4. **Response** — Service responds, your agent gets the data
5. **Tracking** — Charge is metered to your account

Your agent never sees the x402 complexity. It's just HTTP.

Need help? [support@obul.ai](mailto:support@obul.ai)
