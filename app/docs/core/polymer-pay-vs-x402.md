---
title: Polymer Pay vs x402
description: When to use Polymer Pay, when to build raw x402, and how to migrate between them
sidebar_position: 4
---

**x402** is a protocol standard.  
**Polymer Pay** is a service built on x402.

Think of it like HTTP and NGINX:
- HTTP is the protocol
- NGINX is a server that implements HTTP

Similarly:
- x402 is the payment protocol
- Polymer Pay is a facilitator that implements x402

## When you Use Raw x402

What you'll build:
- Wallet infrastructure
- USDC on-ramp procedure
- Transaction signing service
- Payment verification logic
- Retry and error handling
- Monitoring and alerting
- Analytics dashboard

**Timeline:** 2-3 weeks for initial implementation, ongoing maintenance forever.

## What you get with Polymer Pay

✅ Faster Shipping

✅ Managed infrastructure  

✅ Production reliability  

**What you get:**

```
Polymer Pay Stack:
├── Managed proxy layer
├── Automatic x402 handling
├── Production security
├── Real-time dashboard
└── Easy card checkout
```

**Timeline:** 5 minutes to first payment.

## The Decision Matrix

| Factor | Raw x402 | Polymer Pay |
|--------|----------|------|
| **Setup Time** | 2-3 weeks | 5 minutes |
| **Infrastructure** | Self-hosted | Fully managed |
| **Key Management** | Your responsibility | Handled by Polymer Pay |
| **Transaction Monitoring** | Build yourself | Included |
| **Error Handling** | Custom implementation | Built-in |
| **Rate Limiting** | Build yourself | Configurable |
| **Analytics** | Build yourself | Dashboard included |
| **Support** | Community | Dedicated |

## Migration: Raw x402 → Polymer Pay

Moving to Polymer Pay is straightforward:

1. **Create Polymer Pay account** — 2 minutes
2. **Generate API key** — 1 minute
3. **Update request headers** — Change endpoint URL, add `X-Polymer-Pay-Api-Key`
4. **Test in staging** — Verify everything works
5. **Production cutover** — Gradual rollout

**Total effort:** 5 minutes  

## Our Recommendation

**For 95% of teams: Start with Polymer Pay.**

You'll ship faster, avoid infrastructure headaches, and can always migrate to raw x402 if you need to.

**For the 5%** with specific requirements — custom facilitators, unique compliance needs, or building facilitator services — raw x402 gives you maximum flexibility.

**The Bottom Line: x402 is the future of machine-to-machine payments. Polymer Pay is the fastest way to get there.**
