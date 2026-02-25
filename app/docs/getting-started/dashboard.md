---
title: Dashboard Guide
description: Manage API keys, track spending, and control your x402 access
sidebar_position: 2
---

# Dashboard Guide

The Obul Dashboard at [my.obul.ai](https://my.obul.ai) is your control center for accessing the x402 economy.

## Overview

The Overview page shows:

| Metric | Description |
|--------|-------------|
| **Account Balance** | Current available balance |
| **Monthly Spend** | Total spent this month |
| **Active Keys** | Number of API keys in use |
| **Recent Calls** | Latest API calls with status |

![Dashboard Overview](/images/dashboard-overview.png)

## API Keys

Navigate to **API Keys** to manage your access to the x402 ecosystem.

### Creating a Key

1. Click **Create New Key**
2. Enter a name (e.g., "Production Agent")
3. Set spend limits (recommended):
   - Daily limit: $5-10 for testing
   - Monthly limit: $50-100 for production
4. (Optional) Set rate limits
5. Click **Create**

**Important:** Copy your key immediately. We only show it once.

### Key Types

| Prefix | Environment | Use For |
|--------|-------------|---------|
| `obul_live_` | Production | Real API calls, real charges |
| `obul_test_` | Testing | Development, no charges |

### Spend Limits

Protect yourself from unexpected charges:

| Limit | Purpose |
|-------|---------|
| **Daily** | Prevent runaway agents from draining account |
| **Monthly** | Cap total spend per key |
| **Per-request** | Limit individual call costs |

When a limit is hit, requests stop. The key returns a "spend limit exceeded" error.

### Rotating Keys

If you suspect a key is compromised:

1. Create a new key
2. Update your agent to use the new key
3. Revoke the old key
4. Monitor for any unauthorized usage

### Revoking Keys

1. Find the key in your list
2. Click **...** → **Revoke**
3. Confirm

Revoked keys stop working immediately. All pending requests fail.

## Transaction Logs

The **Transactions** section shows every API call made through Obul.

| Field | Description |
|-------|-------------|
| **Time (UTC)** | When the request was made |
| **Service** | The x402 service called |
| **Endpoint** | Full URL of the request |
| **Status** | `success`, `pending`, or `failed` |
| **Amount** | Cost in USD |
| **Key Used** | Which API key made the call |

### Filtering

- **Date range** — Pick a time window
- **Status** — Success/failed/pending
- **Service** — Filter by specific API
- **Key** — Filter by API key
- **Amount** — Filter by cost

### Exporting

Export your transaction data for accounting:

1. Apply desired filters
2. Click **Export**
3. Choose format: CSV or JSON
4. Download

## Billing

Navigate to **Billing** to manage your account balance.

### Adding Funds

1. Go to **Billing** → **Add Funds**
2. Select amount ($10, $50, $100, or custom)
3. Pay with card

Funds are available immediately. No bridging. No gas tokens.

### Auto-Reload

Never run out of funds mid-workflow:

```
Auto-Reload Options:
├── Disabled — Manual top-ups only
├── Threshold — Reload when balance below $X
└── Scheduled — Reload $X every Y days
```

### Usage Alerts

Get notified when:
- Balance drops below $X
- Daily spend exceeds $X
- Monthly spend exceeds $X

Configure in **Billing** → **Alerts**.

## Team Access

### Adding Team Members

1. Go to **Settings** → **Team**
2. Click **Invite Member**
3. Enter email
4. Select role:
   - **Viewer** — View-only access
   - **Developer** — Create keys, view transactions
   - **Admin** — Full access including billing
5. Send invitation

### Role Permissions

| Permission | Viewer | Developer | Admin |
|------------|--------|-----------|-------|
| View transactions | ✅ | ✅ | ✅ |
| Create API keys | ❌ | ✅ | ✅ |
| Manage billing | ❌ | ❌ | ✅ |
| Manage team | ❌ | ❌ | ✅ |
| Delete account | ❌ | ❌ | ✅ |

### Activity Audit Log

View all team actions:
- Key created/deleted
- Settings changed
- Team members added/removed
- Billing events

## Settings

### Account

- **Profile** — Name, email, avatar
- **Security** — Password, 2FA
- **Notifications** — Email preferences

### API

- **Default timeout** — Request timeout (default: 30s)
- **Retry policy** — Automatic retries on failure
- **Webhook URL** — Receive event notifications

## Webhooks

Configure webhooks to receive real-time events.

### Supported Events

| Event | Description |
|-------|-------------|
| `payment.success` | API call completed successfully |
| `payment.failed` | API call failed |
| `key.created` | New API key created |
| `key.revoked` | API key revoked |
| `limit.approaching` | Spend limit approaching |
| `limit.exceeded` | Spend limit exceeded |

### Webhook Payload

```json
{
  "event": "payment.success",
  "timestamp": "2025-02-24T15:45:00Z",
  "data": {
    "transaction_id": "txn_xxx",
    "amount": "0.02",
    "currency": "USD",
    "api_key": "obul_live_xxx",
    "service": "compute-api.com"
  }
}
```

## Next Steps

- [API Reference](../reference/api) — Full technical documentation
- [FAQ](../faq) — Common questions
