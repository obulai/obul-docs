---
title: Dashboard Guide
description: Manage API keys, track spending, and control your x402 access
sidebar_position: 2
---

The Obul Dashboard at [my.obul.ai](https://my.obul.ai) is your control center for accessing the x402 economy.

## Overview

<img src="./images/dashboard-overview.png" alt="Dashboard Overview" style="border: 1px solid #D2B26B; border-radius: 8px;" />

The Overview page shows:

| Metric | Description |
|--------|-------------|
| **Recent Spend** | Total spent in USD |
| **Recent API Calls** | Total call count |
| **Usage Trend** | Bar chart of spend and count |
| **Recent Calls** | Latest API calls with status |


## API Keys

Navigate to **API Keys** to manage your access to the x402 ecosystem.

<img src="./images/dashboard-apikeys.png" alt="Dashboard Overview" style="border: 1px solid #D2B26B; border-radius: 8px;" />

### Creating a Key

1. Click **Create New Key**
2. Enter a name (e.g., "Production Agent")
3. Set spend limits (recommended):
   - Daily limit: $5-10 for testing
   - Monthly limit: $50-100 for production
4. (Optional) Set rate limits
5. Click **Create**

### Rotating Keys

If you suspect a key is compromised:

1. Create a new key
2. Update your agent to use the new key
3. Revoke the old key

### Revoking Keys

1. Find the key in your list
2. Click → **Delette**
3. Confirm

Deleted keys stop working immediately. All pending requests fail.

## Billing

<img src="./images/dashboard-billing.png" alt="Dashboard Overview" style="border: 1px solid #D2B26B; border-radius: 8px;" />


### Setting Up Payment

1. Click **Add Payment Method**
2. Enter your card details
3. (Optional) If you've used Stripe before, you can simply link your existing card
4. After usage, check your outstanding amount in the section below. This will be billed in your next cycle.

:::info
You won't be charged yet — usage is metered and billed at the end of each month (pay-as-you-go).
:::


### Spending Limits

Protect yourself from unexpected charges:

| Limit | Purpose |
|-------|---------|
| **Monthly** | Cap total spend per key |
| **Per-request** | Limit individual call costs |

When a limit is hit, requests stop. The key returns a "spend limit exceeded" error.

:::info
We currently enforce a $20 monthly usage limit give beta release. In order to increase this hard limit please reach out to our team.
:::
