---
title: What is x402?
description: The HTTP 402 Payment Required protocol — why developers love it and how Polymer Pay completes the picture
sidebar_position: 2
---

x402 is the **HTTP 402 Payment Required** protocol. It's the standard that makes APIs natively payable — and it's why developers are finally excited about monetizing infrastructure.

## Why Developers Love x402

### The Old Way (Painful)

Want to charge for your API?

1. Set up a company
2. Integrate Stripe (requires KYB)
3. Build user management 
4. Handle KYC/AML compliance
5. Build billing dashboards
6. Manage invoices and dunning
7. Deal with chargebacks

**Months of work and Millions in LLM tokens spent** before you can charge your first dollar. 

### The x402 Way (Simple)

```
1. Client Request
   │
   ▼
2. Server Responds 402
   │   └── "Payment required: 0.05 USDC"
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

- No redirects. 
- No OAuth. 
- No KYC. 
- No user management. 
- No billing infrastructure.

**Just HTTP with payment.**


## What This Means for API Providers

| Before x402 | With x402 |
|-------------|-----------|
| Months to monetize | Minutes to monetize |
| KYC/AML compliance | No identity required |
| User management system | Just wallet addresses |
| Invoice handling | Instant settlement |
| Geographic restrictions | Global by default |
| Minimum charges (~$5) | Microtransactions ($0.001) |

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

## The Current Gap (And How Polymer Pay Solves It)

x402 is great, but there's a catch: **you still need to manage crypto.**

- Set up wallets
- On-ramp USDC (hold crypto)
- Monitor balance on different chains
- Manage secure signing with private keys
- Install x402 libs in every framework you use
- Handle updating x402 payment protocol

This is where Polymer Pay comes in.

### Polymer Pay Solves the Crypto Leg

```
┌─────────────────────────────────────────────────────────┐
│  Without Polymer Pay                    With Polymer Pay              │
│                                                         │
│  Your App                        Your App               │
│     │                               │                   │
│     ▼                               ▼                   │
│  ┌─────────┐                   ┌─────────┐              │
│  │ Wallet  │─── x402 ───▶      │ Polymer │─── http ──▶  │
│  │ Manager │   (complex)       │  Pay    │   (simple)   │
│  └─────────┘                   └─────────┘              │
│     ▲                               ▲                   │
│     │                               │                   │
│  Private Keys                  Credit Card              │
│  x402 Management               Dashboard                │
│  Token Balances                Spend Limits             │
└─────────────────────────────────────────────────────────┘
```

**Polymer Pay is the bridge:**
- You pay us with a credit card (fiat)
- We handle the crypto/x402 part
- You get simple HTTP requests

## The Full Picture (Coming Soon)

Today, Polymer Pay solves the **consumer side** — making it easy to call x402 APIs without managing crypto.

Soon, **Polymer Pay Gateway** will solve the **provider side** too:

```
Your API ──▶ Polymer Pay Gateway ──▶ x402 payments
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


**The vision:** Every API call is a payment. Every payment is an API call. No distinction.
