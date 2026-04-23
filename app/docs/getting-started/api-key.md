---
title: Get API Key
description: How to create and manage your Polymer Pay API keys
sidebar_position: 2
---

To use Polymer Pay, you need an API key. This guide walks you through creating and managing your keys.

<img src="./images/dashboard-apikeys.png" alt="Dashboard Overview" style="border: 1px solid #D2B26B; border-radius: 8px;" />

## Creating Your First API Key

### 1. Sign Up

Go to [my.pay.polymerlabs.org/dashboard/api-keys](https://my.pay.polymerlabs.org/dashboard/api-keys) and create an account using email or GitHub.

### 2. Add Payment Method

Before you can create API keys, you need to add a payment method:

1. Go to **Billing** in the dashboard
2. Click **Add Payment Method**
3. Enter your card details

:::info
You won't be charged immediately. Polymer Pay uses pay-as-you-go billing at the end of each month.
:::

### 3. Generate API Key

1. Navigate to **API Keys** in the sidebar
2. Click **Create New Key**
3. Give your key a descriptive name (e.g., "Production Agent", "Development Testing")
4. Click **Create**
5. **Copy the key immediately** — you won't see it again

```bash
# Example API key format
polymer_pay_live_139f82dc-aef7-4060-bbbf-c96e018e
```

## Managing API Keys

If a key is compromised:

1. Go to **API Keys** in dashboard
2. Find the key
3. Click **Delete** and confirm
4. Create a new key to replace it

:::warning
Revoked keys stop working immediately. Any agents using them will fail.
:::

## Using Your API Key

Include your API key in the `X-Polymer-Pay-Api-Key` header:

```bash
curl -H "X-Polymer-Pay-Api-Key: polymer_pay_live_xxx" \
  "https://pay.polymerlabs.org/proxy/https/api.example.com/v1/endpoint"
```

## Security Best Practices

1. **Never commit keys to git** — use environment variables
2. **Use scoped keys** — one key per agent/environment
3. **Set spend limits** — prevent runaway costs
4. **Rotate keys regularly** — especially for production
5. **Revoke unused keys** — clean up periodically

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid API key" | Check the key is copied correctly |
| "Payment required" | Add a payment method in billing |
| "Rate limit exceeded" | Wait or upgrade your plan |
| Key not working | Check if it was revoked |
