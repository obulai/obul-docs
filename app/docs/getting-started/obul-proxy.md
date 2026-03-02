---
title: Obul Proxy
description: How to use the Obul Proxy to access x402-enabled APIs
sidebar_position: 3
---

## Base URL

```
Production:   https://proxy.obul.ai
Health Check: https://proxy.obul.ai/healthz
```

## URL Structure

```
https://proxy.obul.ai/proxy/https/api.example.com/v1/data
\_____________________/ \____/ \____________________/ \_/
       Base URL          Scheme       Target Host      Path
```

- **Base URL**: `https://proxy.obul.ai` (Obul's proxy)
- **Path**: `/proxy/{scheme}/{host}{path}`
- **Scheme**: `https` or `http`
- **Host**: The target API domain
- **Path**: Full path including query parameters

## Authentication

All requests need your API key in the `X-Obul-Api-Key` header:

```http
X-Obul-Api-Key: obul_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Making Requests

### Basic GET Request

```bash
curl -H "X-Obul-Api-Key: ${OBUL_API_KEY}" \
  "https://proxy.obul.ai/proxy/https/httpbin.org/get"
```

### POST Request with JSON

```bash
curl -X POST \
  -H "X-Obul-Api-Key: ${OBUL_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}' \
  "https://proxy.obul.ai/proxy/https/httpbin.org/post"
```

:::tip No Request Changes Needed!

When using Obul, you don't need to change your existing request parameters or add any special handling. Just prefix your target URL with Obul's proxy — we handle the x402 payment negotiation automatically.
:::

## How It Works

When you make a request through the Obul Proxy:

1. **Authentication** — We validate your API key
2. **Discovery** — We contact the target service and learn its x402 requirements
3. **Payment** — We generate and attach the payment proof automatically
4. **Forwarding** — Your request is forwarded with the proof attached
5. **Response** — The service responds, you get the data

You never handle crypto, wallets, or x402 directly.

## Error Codes

### HTTP Status

| Code | Meaning | Description |
|------|---------|-------------|
| `200` | OK | Success |
| `400` | Bad Request | Invalid format |
| `401` | Unauthorized | Invalid/missing API key |
| `402` | Payment Required | Payment needed (x402) |
| `403` | Forbidden | Key lacks permission |
| `404` | Not Found | Endpoint doesn't exist |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Server Error | Internal error |
| `502` | Bad Gateway | Target API error |
| `503` | Service Unavailable | Obul temporarily down |

### Common Errors

| Error Code | Cause | Solution |
|------------|-------|----------|
| `invalid_api_key` | Wrong/revoked key | Check dashboard |
| `insufficient_balance` | Wallet underfunded | Add funds |
| `rate_limit_exceeded` | Too many requests | Wait or upgrade |
| `payment_failed` | Transaction error | Check wallet, retry |
| `endpoint_not_found` | Wrong URL | Verify path |

## Rate Limits

| Plan | Requests/min | Burst |
|------|--------------|-------|
| Free | 100 | 10 |
| Pro | 10,000 | 100 |
| Enterprise | Custom | Custom |

## Code Examples

### Python

```python
import requests
import os

OBUL_API_KEY = os.environ["OBUL_API_KEY"]
OBUL_BASE_URL = "https://proxy.obul.ai/proxy/https"

def call_service(endpoint, method="GET", data=None):
    url = f"{OBUL_BASE_URL}/{endpoint}"
    headers = {
        "X-Obul-Api-Key": OBUL_API_KEY,
        "Content-Type": "application/json"
    }

    response = requests.request(
        method=method,
        url=url,
        headers=headers,
        json=data
    )
    return response.json()

# Usage
result = call_service("api.example.com/compute", method="POST", data={"input": "test"})
```

### Node.js

```javascript
const OBUL_API_KEY = process.env.OBUL_API_KEY;
const OBUL_BASE = 'https://proxy.obul.ai/proxy/https';

async function obulRequest(endpoint, options = {}) {
  const url = `${OBUL_BASE}/${endpoint}`;

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      'X-Obul-Api-Key': OBUL_API_KEY,
      'Content-Type': 'application/json',
      ...options.headers
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  return response.json();
}

// Usage
const result = await obulRequest('api.example.com/data', {
  method: 'POST',
  body: { query: 'example' }
});
```

## Health Check

Check if the proxy is operational:

```bash
curl https://proxy.obul.ai/healthz
```

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2025-02-24T15:45:00Z"
}
```

## Next Steps

- Explore the [API Marketplace](/resources/marketplace) to find services
- Learn about [Discovery](/resources/discovery) to find new APIs
- Check out [Claude Plugins](/resources/claude-plugins) for AI integration