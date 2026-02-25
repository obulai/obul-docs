---
title: Obul vs x402
description: When to use Obul, when to build raw x402, and how to migrate between them
sidebar_position: 4
---

**x402** is a protocol standard.  
**Obul** is a service built on x402.

Think of it like HTTP and NGINX:
- HTTP is the protocol
- NGINX is a server that implements HTTP

Similarly:
- x402 is the payment protocol
- Obul is a facilitator that implements x402

## When to Use Raw x402

Build your own x402 integration if:

✅ You have dedicated blockchain engineering resources  
✅ You need complete control over the payment flow  
✅ You have specific compliance requirements  
✅ You're building a facilitator service yourself  

**What you'll build:**

```
Your Stack:
├── Wallet infrastructure
├── USDC on-ramp procedure
├── Transaction signing service
├── Payment verification logic
├── Retry and error handling
├── Monitoring and alerting
└── Analytics dashboard
```

**Timeline:** 2-3 weeks for initial implementation, ongoing maintenance forever.

## When to Use Obul

Choose Obul if:

✅ You want to ship fast  
✅ You don't have blockchain expertise  
✅ You prefer managed infrastructure  
✅ You need production reliability  

**What you get:**

```
Obul Stack:
├── Managed proxy layer
├── Automatic x402 handling
├── Production security
├── Real-time dashboard
└── Easy card checkout
```

**Timeline:** 5 minutes to first payment.

## The Decision Matrix

| Factor | Raw x402 | Obul |
|--------|----------|------|
| **Setup Time** | 2-3 weeks | 5 minutes |
| **Infrastructure** | Self-hosted | Fully managed |
| **Key Management** | Your responsibility | Handled by Obul |
| **Smart Contracts** | Deploy and maintain | Pre-deployed |
| **Transaction Monitoring** | Build yourself | Included |
| **Error Handling** | Custom implementation | Built-in |
| **Rate Limiting** | Build yourself | Configurable |
| **Analytics** | Build yourself | Dashboard included |
| **Support** | Community | Dedicated |

## Migration: Raw x402 → Obul

Moving to Obul is straightforward:

1. **Create Obul account** — 2 minutes
2. **Generate API key** — 1 minute
3. **Update request headers** — Change endpoint URL, add `X-Obul-Key`
4. **Test in staging** — Verify everything works
5. **Production cutover** — Gradual rollout

**Total effort:** 15 minutes  
**Risk:** Minimal — you can roll back instantly

## Migration: Obul → Raw x402

Obul uses the open x402 standard. You're never locked in.

If you outgrow Obul:

1. Export your transaction history
2. Build or adopt raw x402 infrastructure
3. Update your client code to use new facilitator
4. Gradual cutover

**No data hostage situation. No proprietary formats. Just open standards.**

## Our Recommendation

**For 95% of teams: Start with Obul.**

You'll ship faster, avoid infrastructure headaches, and can always migrate to raw x402 if you need to.

**For the 5%** with specific requirements — custom facilitators, unique compliance needs, or building facilitator services — raw x402 gives you maximum flexibility.

## The Bottom Line

x402 is the future of machine-to-machine payments. Obul is the fastest way to get there.

Start with Obul. Scale with x402.
