---
title: What is Polymer Pay?
description: One API key to access the entire x402 agent economy 
sidebar_position: 1
---

### **One API key. The entire x402 economy. Zero wallets.**

Polymer Pay is a proxy layer that lets you call any x402-enabled service with nothing more than an API key. We handle the wallet management, user balances, and x402 protocol negotiation automatically.

## The Problem We Solve

You're building an agent in Cursor or Bolt. You want to compose it with real infrastructure — compute, search, data APIs. You discover the best services run on x402 (70M+ monthly transactions already happening).

Then you hit the wall:

- Set up a wallet
- Manage private keys  
- Figure out which network to bridge to
- Monitor balance so your agent doesn't error out mid-task
- Worry about spending caps and security

Three weeks later, your agent is still not shipped. Another one for the graveyard.

## Our Solution

```bash
curl -H "X-Polymer-Pay-Api-Key: $POLYMER_PAY_API_KEY" \
  https://pay.polymerlabs.org/proxy/https/api.target-service.com/v1/analyze
```

That's it. Polymer Pay discovers the x402 requirements, attaches the payment proof, and forwards your request. You get the response. We track the charge in your dashboard. Your agent keeps running.

## What You Get

| Feature | What It Means |
|---------|---------------|
| **One API Key** | Access the entire x402 ecosystem |
| **Zero Wallet Management** | No keys, no chains, no bridging |
| **Scoped Keys** | Per-agent keys with spend limits |
| **Fiat Dashboard** | Track spending in dollars, not crypto |
| **Kill Switches** | Revoke keys instantly if something goes wrong |

## How It Works

```
Your Agent          Polymer Pay Proxy          x402 Service
    │                   │                   │
    │─── HTTP Request ─▶│                   │
    │  (with API key)   │                   │
    │                   │─── Discover x402 ─▶│
    │                   │◀── Requirements ──│
    │                   │                   │
    │                   │─── Attach Proof ─▶│
    │                   │◀──── Response ────│
    │◀── Response ──────│                   │
```

1. Your agent sends a request to Polymer Pay with your API key
2. Polymer Pay discovers the x402 payment requirements from the target service
3. Polymer Pay attaches the payment proof automatically
4. The service responds, your agent gets the data
5. We track the $0.02 (or whatever) in your dashboard

## Built for Agent Builders

The future is agents composing with specialized services. A reasoning agent calls a compute API. A trading bot subscribes to data feeds. A coding agent spins up serverless functions.

These agents need to pay without human intervention. Without wallet setup. Without becoming crypto engineers.

**With Polymer Pay, you can:**

- Spin up 12 different agent workflows, each with scoped keys
- Set $5/day spend limits per agent
- Never worry about one going rogue and draining funds
- Access the 70M+ transaction x402 economy with HTTP requests

