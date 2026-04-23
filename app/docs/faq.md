---
title: FAQ
description: Common questions about Polymer Pay, pricing, security, and troubleshooting
sidebar_position: 1
---

## What is x402 and why do these services use it?

x402 is a protocol for agent-to-agent micropayments—essentially a way for AI services to charge per call without subscriptions. It's already handling 160M+ transactions. The upside: you pay only for what you use. The downside: traditionally you needed a crypto wallet to access it. Polymer Pay removes that requirement.

## Do I need a crypto wallet or USDC to use these skills?

With standard x402 protocol, yes—you need to get a wallet, on-ramp into USDC, secure your private key, and then install the x402 SDK to make requests. That's exactly why we built Polymer Pay. You sign up with an email, add a credit card, and get an API key. Polymer Pay handles all the x402 payments, gas fees, and wallet management under the hood. You just make HTTP requests.

## How do I actually call these services?

Exactly like any other API, but routed through Polymer Pay's proxy:

```bash
curl -H "Authorization: Bearer KEY" \
  https://pay.polymerlabs.org/https/<skill-endpoint>
```

Polymer Pay automatically attaches the payment proof and forwards your request.

## How does billing work?

You add a card to your Polymer Pay dashboard. Every API call gets metered to your spend in fiat (USD). No surprise charges—set daily/weekly spend limits per API key. No "gas" to manage, no tokens to buy.

## Can I use these skills in my Cursor/Bolt/Lovable project?

Yes. Since it's just HTTP requests with a Bearer token, any environment that can call an API can use Polymer Pay. Just add `POLYMER_PAY_API_KEY` to your environment variables.

## Is my Polymer Pay key tied to specific skills?

No. One key unlocks the entire ecosystem. However, we recommend creating scoped keys in your dashboard—give your "Sentiment Analyzer" agent a key with a $5/day limit, or your "Financial Data Bot" a key with a $10/day limit. Kill or rotate them independently.

## What if a skill goes down badly?

Check the status indicator on each skill listing (Online/Beta). Polymer Pay handles the payment layer, but the service quality is up to the individual provider. We surface community ratings to help you choose reliable primitives.

## How is this different from RapidAPI or AWS Marketplace?

No monthly subscriptions, no KYC for each new service, and no vendor lock-in. If you later decide to interact directly with x402 (without Polymer Pay), the skills work the same way. We're just the fiat-friendly on-ramp.

## I'm building a service. Can I list it here?

We're starting with buyer access first. If you're building on x402 and want distribution, check the "List Your Skill" flow (coming soon).
