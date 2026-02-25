---
title: Quickstart
description: Access the x402 economy in under 5 minutes — one API key, no wallet setup
sidebar_position: 1
---

# Quickstart

Access the x402 agent economy in under 5 minutes.

## Prerequisites

- A free Obul account
- `curl` or your preferred HTTP client
- (Optional) Python 3.8+ or Node.js 16+

## Step 1: Create an Account

Go to [my.obul.ai](https://my.obul.ai) and sign up with email or GitHub.

## Step 2: Add a Payment Method

1. In the dashboard, go to **Billing**
2. Click **Add Payment Method**  
3. Connect your card

No wallet setup. No bridging. Just a credit card.

## Step 3: Generate an API Key

1. Navigate to **API Keys**
2. Click **Create New Key**
3. Name it (e.g., "My First Agent")
4. Set a spend limit (optional but recommended)
5. Copy the key — **you won't see it again**

```bash
# Your key looks like this
obul_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Step 4: Make Your First Request

### Using curl

```bash
curl -H "X-Obul-Key: obul_live_xxx" \
  https://proxy.obul.ai/https/api.example.com/v1/endpoint
```

### Using Python

```python
import requests

url = "https://proxy.obul.ai/https/api.example.com/v1/endpoint"
headers = {
    "X-Obul-Key": "obul_live_xxx"
}

response = requests.get(url, headers=headers)
print(response.json())
```

### Using Node.js

```javascript
const fetch = require('node-fetch');

const url = 'https://proxy.obul.ai/https/api.example.com/v1/endpoint';
const headers = {
  'X-Obul-Key': 'obul_live_xxx'
};

fetch(url, { headers })
  .then(res => res.json())
  .then(data => console.log(data));
```

## Step 5: Check Your Dashboard

Go to **Transactions** in your dashboard. You'll see:

- The API call you just made
- The amount charged (e.g., $0.02)
- The target service
- Status (success/failed)

## What's Happening Under the Hood

When you make a request through Obul:

1. **Discovery** — Obul contacts the target service and learns its x402 requirements
2. **Payment Proof** — Obul generates and attaches the payment proof automatically
3. **Forwarding** — Your request is forwarded with the proof attached
4. **Response** — The service responds, you get the data
5. **Tracking** — We deduct the charge from your account balance

You never see the x402 complexity. It's just HTTP.

## Scoped Keys for Multiple Agents

Building multiple agents? Create a key for each:

```bash
# Agent 1: Data analysis
curl -H "X-Obul-Key: obul_live_agent1_xxx" \
  https://proxy.obul.ai/https/data-api.com/v1/query

# Agent 2: Compute tasks  
curl -H "X-Obul-Key: obul_live_agent2_xxx" \
  https://proxy.obul.ai/https/compute-api.com/v1/run
```

Each key has its own:
- Spend limits
- Rate limits
- Transaction history
- Kill switch

## Setting Spend Limits

Protect yourself from runaway agents:

1. Go to **API Keys**
2. Click on a key
3. Set **Daily Spend Limit** (e.g., $5)
4. Set **Monthly Spend Limit** (e.g., $50)

If an agent hits its limit, requests stop. No surprise bills.

## What's Next?

- [Dashboard Guide](./dashboard) — Manage keys, track spending, set limits
- [API Reference](../reference/api) — Full technical documentation
- [FAQ](../faq) — Common questions

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| "Invalid API key" | Wrong/revoked key | Check dashboard, regenerate |
| "Insufficient balance" | Account needs funds | Add payment method in Billing |
| "Rate limit exceeded" | Too many requests | Check key limits or upgrade plan |
| "Spend limit reached" | Daily/monthly cap hit | Increase limit or wait for reset |

Need help? [support@obul.ai](mailto:support@obul.ai) or [Discord](https://discord.gg/obul)
