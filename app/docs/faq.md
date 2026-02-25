---
title: FAQ
description: Common questions about Obul, pricing, security, and troubleshooting
sidebar_position: 1
---

# Frequently Asked Questions

## General

### What is Obul?

Obul is a proxy layer that lets you access the x402 agent economy with nothing more than an API key. We handle payment proofs, gas management, and protocol negotiation automatically.

### What is x402?

x402 is the HTTP 402 Payment Required standard. It's how agents pay for API calls in a machine-to-machine economy. 70M+ transactions have already happened on x402.

### Do I need to know about crypto or wallets?

No. You get an API key, add a credit card, and make HTTP requests. Obul handles all the x402 complexity.

## Pricing

### How much does Obul cost?

**1% of transaction volume.** No monthly fees, no setup costs.

| Volume | Monthly Cost |
|--------|--------------|
| $1,000 | $10 |
| $10,000 | $100 |
| $100,000 | $1,000 |

### What am I actually paying for?

When you call an x402 service through Obul, you pay:
1. The service's fee (e.g., $0.02 for a compute call)
2. 1% to Obul (e.g., $0.0002)
3. Network gas fees (usually pennies)

### Do I need to hold crypto?

No. You add USD to your account with a credit card. We handle converting to the required tokens behind the scenes.

### What networks are supported?

| Network | Status |
|---------|--------|
| Base | ✅ Live |
| Base Sepolia | ✅ Live (testnet) |
| Ethereum | 🚧 Q2 2025 |
| Polygon | 🚧 Q2 2025 |

## Security

### Is Obul secure?

Yes. Security measures include:

- **Scoped API keys** — Each key has limited permissions
- **Spend limits** — Cap daily/monthly spending per key
- **Instant revocation** — Kill compromised keys immediately
- **Encrypted at rest** — All data encrypted
- **Audit logging** — Every action logged

### What if my API key is leaked?

1. Go to **API Keys** in your dashboard
2. Find the compromised key
3. Click **Revoke**
4. The key stops working immediately

If you had spend limits set, your exposure is capped.

### Can I require 2FA?

Yes. Enable in **Settings** → **Security** → **Two-Factor Authentication**.

## Using Obul

### How do I call an x402 service?

```bash
curl -H "X-Obul-Key: $OBUL_API_KEY" \
  https://proxy.obul.ai/https/api.target-service.com/v1/endpoint
```

Obul discovers the x402 requirements, attaches the payment proof, and forwards your request.

### What services can I access?

Any service that supports x402. This includes:
- Compute APIs
- Data feeds
- Search services
- Reasoning engines
- Storage

The ecosystem is growing daily.

### Can I set spending limits?

Yes. Per-key limits for:
- Daily spend
- Monthly spend
- Per-request cost

When a limit is hit, requests stop.

### What happens if I run out of balance?

Requests return a "insufficient balance" error. Set up auto-reload in **Billing** to avoid this.

## Migration

### Can I migrate from another provider?

Yes. If you're currently managing your own x402 wallet:

1. Create Obul account
2. Generate API keys
3. Replace your wallet-based calls with Obul proxy calls
4. Gradual cutover

**Time:** Usually 1-2 days depending on complexity.

### Can I export my data?

Yes. Go to **Transactions**, apply filters, click **Export**, choose CSV/JSON.

### Is there vendor lock-in?

No. x402 is an open standard. You can:
- Use Obul
- Manage your own wallet
- Switch to another x402 facilitator

Your code changes minimally (just the `X-Obul-Key` header).

## Troubleshooting

### "Invalid API key"

**Causes:**
- Key copied incorrectly
- Key revoked
- Using test key in production (or vice versa)

**Fix:**
1. Verify key in dashboard
2. Generate new key if needed
3. Check prefix (`obul_live_` vs `obul_test_`)

### "Insufficient balance"

**Causes:**
- Account needs funds
- Auto-reload failed

**Fix:**
1. Go to **Billing** → **Add Funds**
2. Check payment method is valid

### "Rate limit exceeded"

**Causes:**
- Too many requests
- Key's rate limit hit

**Fix:**
1. Check key settings
2. Implement exponential backoff
3. Contact support for higher limits

### "Spend limit reached"

**Causes:**
- Daily or monthly cap hit

**Fix:**
1. Wait for limit reset
2. Or increase limit in key settings

### Webhook not receiving events

**Checklist:**
- [ ] URL accessible from internet
- [ ] SSL certificate valid
- [ ] Endpoint returns 200
- [ ] Firewall allows Obul IPs

**Test:**
```bash
curl -X POST https://your-webhook-url \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

## Getting Help

### Support Channels

| Channel | Response | Best For |
|---------|----------|----------|
| Email | < 24 hours | Complex issues |
| Discord | < 1 hour | Quick questions |
| Status Page | Real-time | Outages |

### Email Support

**[support@obul.ai](mailto:support@obul.ai)**

Include:
- API key (last 4 chars only)
- Error message
- Timestamp
- Request ID (if available)

### Discord

[join discord.gg/obul](https://discord.gg/obul) for community support, announcements, and dev discussions.

## Account Management

### How do I delete my account?

1. Ensure all balances settled
2. Go to **Settings** → **Account**
3. Click **Delete Account**
4. Confirm

**Note:** Irreversible.

### Can I have multiple accounts?

Yes, but each needs a unique email. Consider using team features instead.

### How do I change my email?

1. Go to **Settings** → **Profile**
2. Click **Change Email**
3. Verify new email

## Still Have Questions?

- 📧 [support@obul.ai](mailto:support@obul.ai)
- 💬 [Discord](https://discord.gg/obul)
- 🐦 [@obulai](https://twitter.com/obulai)
