---
title: Quickstart
description: Access the x402 economy in under 5 minutes — one API key, no wallet setup
sidebar_position: 1
---

# Quickstart

Obul is the **universal API gateway for the agent economy**. It proxies requests to x402-enabled APIs and handles payment automatically — no crypto wallet, no USDC, no gas fees. One `OBUL_API_KEY`, consolidated billing, scoped keys with spending caps. Pay-per-use access to any supported service.

Get started in under 5 minutes.

## Prerequisites

- A Obul account
- `curl` or your preferred HTTP client
- (Optional) Python 3.8+ or Node.js 16+

## Step 1: Create an Account

Go to [my.obul.ai](https://my.obul.ai) and sign up with email or GitHub.

## Step 2: Add a Payment Method

1. In the dashboard, go to **Billing**
2. Click **Add Payment Method**  
3. Connect your card for pay-as-you-go billing.

No wallet setup. No bridging. Just a credit card.

:::info
To activate API keys you must add a payment method. You won't be charged yet — usage is metered and billed at the end of each month (pay-as-you-go).
:::

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
curl -H "X-Obul-Api-Key: obul_live_xxx" \
  "https://gateway.obul.ai/gateway/https/api.example.com/v1/endpoint"
```

### Using Python

```python
import requests

url = "https://gateway.obul.ai/gateway/https/api.example.com/v1/endpoint"
headers = {
    "X-Obul-Api-Key": "obul_live_xxx"
}

response = requests.get(url, headers=headers)
print(response.json())
```

### Using Node.js

```javascript
const fetch = require('node-fetch');

const url = 'https://gateway.obul.ai/gateway/https/api.example.com/v1/endpoint';
const headers = {
  'X-Obul-Api-Key': 'obul_live_xxx'
};

fetch(url, { headers })
  .then(res => res.json())
  .then(data => console.log(data));
```

## Step 5: Check Your Dashboard

Go to **Transactions** in your dashboard. You'll see:

- The API call you just made
- The amount charged (e.g., $0.02)
- Status (success/failed)

## What's Happening Under the Hood

When you make a request through Obul:

1. **Discovery** — Obul contacts the target service and learns its x402 requirements
2. **Payment Proof** — Obul generates and attaches the payment proof automatically
3. **Forwarding** — Your request is forwarded with the proof attached
4. **Response** — The service responds, you get the data
5. **Tracking** — We meter the charge to your account spend

You never see the x402 complexity. It's just HTTP.

## Next Steps

- Learn more about the [Obul Gateway](/getting-started/obul-gateway)
- Explore the [API Marketplace](/resources/marketplace)
- Check out our [Demos](/demos/showcase)

Need help? [support@obul.ai](mailto:support@obul.ai)