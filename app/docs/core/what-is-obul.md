---
title: What is Obul?
description: One API key to access the entire x402 agent economy — no wallets, no gas, no complexity
sidebar_position: 1
---

# What is Obul?

**One API key. The entire x402 economy. Zero wallets.**

Obul is a proxy layer that lets you call any x402-enabled service with nothing more than an API key. We handle the payment proofs, gas management, and protocol negotiation automatically.

## The Problem We Solve

You're building an agent in Cursor or Bolt. You want to compose it with real infrastructure — compute, search, data APIs. You discover the best services run on x402 (70M+ agent-to-agent transactions already happening).

Then you hit the wall:

- Set up a wallet
- Manage private keys  
- Figure out which network to bridge to
- Monitor gas so your agent doesn't error out mid-task
- Worry about spending caps and security

Three weeks later, your agent is still not shipped. Another one for the graveyard.

## Our Solution

```bash
curl -H "X-Obul-Key: $OBUL_API_KEY" \
  https://proxy.obul.ai/https/api.target-service.com/v1/analyze
```

That's it. Obul discovers the x402 requirements, attaches the payment proof, and forwards your request. You get the response. We track the charge in your dashboard. Your agent keeps running.

## What You Get

| Feature | What It Means |
|---------|---------------|
| **One API Key** | Access the entire x402 ecosystem |
| **Zero Wallet Management** | No keys, no gas, no bridging |
| **Scoped Keys** | Per-agent keys with spend limits |
| **Fiat Dashboard** | Track spending in dollars, not ETH |
| **Kill Switches** | Revoke keys instantly if something goes wrong |

## How It Works

```
Your Agent          Obul Proxy          x402 Service
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

1. Your agent sends a request to Obul with your API key
2. Obul discovers the x402 payment requirements from the target service
3. Obul attaches the payment proof automatically
4. The service responds, your agent gets the data
5. We track the $0.02 (or whatever) in your dashboard

## Built for Agent Builders

The future is agents composing with specialized services. A reasoning agent calls a compute API. A trading bot subscribes to data feeds. A coding agent spins up serverless functions.

These agents need to pay without human intervention. Without wallet setup. Without becoming crypto engineers.

**With Obul, you can:**

- Spin up 12 different agent workflows, each with scoped keys
- Set $5/day spend limits per agent
- Never worry about one going rogue and draining funds
- Access the 70M+ transaction x402 economy with HTTP requests

## The 70M+ Transaction Economy

x402 is the HTTP 402 Payment Required standard. It's how agents pay agents. The ecosystem includes:

- Serverless compute
- Specialized reasoning APIs
- On-chain data feeds
- Memory and storage services

**Obul makes this economy accessible.** Not "crypto infrastructure" you need to learn — just APIs you can call with better tooling.

## Ready?

- [Learn about x402](./x402-primer) — The protocol powering the agent economy
- [Get started in 5 minutes](../getting-started/quickstart) — Your first x402 API call
