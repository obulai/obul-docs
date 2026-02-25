---
title: What is x402?
description: The HTTP 402 Payment Required protocol — why developers love it and how Obul completes the picture
sidebar_position: 2
---

# What is x402?

x402 is the **HTTP 402 Payment Required** protocol. It's the standard that makes APIs natively payable — and it's why developers are finally excited about monetizing infrastructure.

## Why Developers Love x402

### The Old Way (Painful)

Want to charge for your API?

1. Set up a company
2. Integrate Stripe
3. Build user management
4. Handle KYC/AML compliance
5. Build billing dashboards
6. Manage invoices and dunning
7. Deal with chargebacks

**Months of work** before you can charge your first dollar.

### The x402 Way (Simple)

```http
HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "x402-version": 1,
  "x402-facilitator": "obul",
  "x402-payment": {
    "scheme": "exact",
    "required-amount": "1000000",
    "token": "0x..."
  }
}
```

Your API returns a 402. The client pays. The request goes through.

**No KYC. No user management. No billing infrastructure.**

## What This Means for API Providers

| Before x402 | With x402 |
|-------------|-----------|
| Months to monetize | Minutes to monetize |
| KYC/AML compliance | No identity required |
| User management system | Just wallet addresses |
| Invoice handling | Instant settlement |
| Geographic restrictions | Global by default |
| Minimum charges (~$0.50) | Microtransactions ($0.001) |

**You build the API. x402 handles the money.**

## What This Means for API Consumers

| Before x402 | With x402 |
|-------------|-----------|
| Monthly subscriptions | Pay per use |
| Credit cards required | Crypto payments |
| Account signup friction | Just send payment |
| Overage fees | Transparent pricing |
| Vendor lock-in | Open standard |

**Use infrastructure like you use electricity — pay for what you consume.**

## The Current Gap (And How Obul Solves It)

x402 is great, but there's a catch: **you still need to manage crypto.**

- Set up wallets
- Hold tokens
- Monitor gas prices
- Handle private keys

This is where Obul comes in.

### Obul Solves the Crypto Leg

```
┌─────────────────────────────────────────────────────────┐
│  Without Obul                    With Obul              │
│                                                         │
│  Your App                        Your App               │
│     │                               │                   │
│     ▼                               ▼                   │
│  ┌─────────┐                   ┌─────────┐             │
│  │ Wallet  │─── x402 ───▶      │  Obul   │─── x402 ──▶│
│  │ Manager │   (complex)       │  Proxy  │   (simple) │
│  └─────────┘                   └─────────┘             │
│     ▲                               ▲                   │
│     │                               │                   │
│  Private Keys                  Credit Card              │
│  Gas Management                Dashboard                │
│  Token Balances                Spend Limits             │
└─────────────────────────────────────────────────────────┘
```

**Obul is the bridge:**
- You pay us with a credit card (fiat)
- We handle the crypto/x402 part
- You get simple HTTP requests

## The Full Picture (Coming Soon)

Today, Obul solves the **consumer side** — making it easy to call x402 APIs without managing crypto.

Soon, **Obul Gateway** will solve the **provider side** too:

```
Your API ──▶ Obul Gateway ──▶ x402 payments
                │
                └── No setup, no KYC, just deploy
```

With Gateway, you'll be able to:
- Deploy your API
- Get instant x402 monetization
- No company required
- No Stripe integration
- Just an endpoint that pays for itself

**True end-to-end: Build API → Deploy → Get paid. No infrastructure in between.**

## The 70M+ Transaction Economy

The x402 ecosystem is already massive:

| Metric | Value |
|--------|-------|
| Monthly transactions | 70M+ |
| Active services | 1,000+ |
| Average transaction | $0.02 |
| Settlement time | ~3 seconds |

Services include:
- **Compute** — Serverless GPU/CPU
- **Data** — On-chain feeds, search indexes
- **Reasoning** — LLM inference, specialized models
- **Storage** — Decentralized databases
- **Identity** — Reputation, credentials

## How x402 Works

### The Payment Flow

```
1. Client Request
   │
   ▼
2. Server Responds 402
   │   └── "Payment required: 0.001 ETH"
   ▼
3. Client Signs Payment
   │   └── Creates signed payment payload
   ▼
4. Client Retries with Payment
   │   └── X-Payment: <signed_payload>
   ▼
5. Server Verifies & Responds
   └── "Payment accepted. Here's your data."
```

No redirects. No OAuth. Just HTTP with payment.

### Key Components

| Component | Description |
|-----------|-------------|
| **Facilitator** | Service that processes payments (Obul, Coinbase, etc.) |
| **Scheme** | Payment model: `exact`, `stream`, `subscription` |
| **Network** | Blockchain for settlement (Base, Ethereum, etc.) |
| **Token** | ERC-20 token or native asset for payment |

## The Future

x402 is evolving:

- **Streaming payments** — Pay per second of compute
- **Subscriptions** — Recurring access without Stripe
- **Multi-chain** — Ethereum, Base, Polygon, Solana
- **IETF standard** — Formal spec in progress

**The vision:** Every API call is a payment. Every payment is an API call. No distinction.

## Learn More

- [Obul vs x402](./obul-vs-x402) — When to use Obul vs building direct
- [Quickstart](../getting-started/quickstart) — Make your first x402 call
