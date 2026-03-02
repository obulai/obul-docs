---
title: Key Control & Limits
description: Manage your API keys, set spending limits, and monitor usage in your dashboard
sidebar_position: 4
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
