---
title: API Reference
description: Complete reference for the Obul Proxy API
sidebar_position: 1
---

## Base URL

```
Production:   https://proxy.obul.ai
Health Check: https://proxy.obul.ai/healthz
```

## Understanding the URL Structure

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

### Examples

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

## Authentication

All requests need your API key in the `X-Obul-Api-Key` header:

```http
X-Obul-Api-Key: obul_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Headers

### Required

| Header | Value | Description |
|--------|-------|-------------|
| `X-Obul-Api-Key` | `obul_live_xxx` | Your API key |
| `Content-Type` | `application/json` | Request format |


## Endpoints

### Health Check

```http
GET https://proxy.obul.ai/healthz
```

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2025-02-24T15:45:00Z"
}
```

### Proxy to Any Service

Call any x402-enabled API through Obul:

```bash
# Call httpbin.org
curl -H "X-Obul-Api-Key: ${OBUL_API_KEY}" \
  "https://proxy.obul.ai/proxy/https/httpbin.org/get"

# Call any other service
curl -H "X-Obul-Api-Key: ${OBUL_API_KEY}" \
  "https://proxy.obul.ai/proxy/https/api.example.com/v1/your-endpoint"
```

Just prepend `https://proxy.obul.ai/proxy/` to any target URL — that's it!

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

### Error Format

```json
{
  "error": {
    "code": "invalid_api_key",
    "message": "The provided API key is invalid",
    "details": {
      "key": "obul_live_xxx",
      "reason": "Key has been revoked"
    }
  }
}
```

### Common Errors

| Error Code | Cause | Solution |
|------------|-------|----------|
| `invalid_api_key` | Wrong/revoked key | Check dashboard |
| `insufficient_balance` | Wallet underfunded | Add funds |
| `rate_limit_exceeded` | Too many requests | Wait or upgrade |
| `payment_failed` | Transaction error | Check wallet, retry |
| `endpoint_not_found` | Wrong URL | Verify path |

## Rate Limits

### Default Limits

| Plan | Requests/min | Burst |
|------|--------------|-------|
| Free | 100 | 10 |
| Pro | 10,000 | 100 |
| Enterprise | Custom | Custom |


## Using in Your Code

### cURL Template

```bash
# GET request
curl -H "X-Obul-Api-Key: ${OBUL_API_KEY}" \
     "https://proxy.obul.ai/proxy/https/TARGET_HOST/PATH"

# POST request with JSON
curl -X POST \
     -H "X-Obul-Api-Key: ${OBUL_API_KEY}" \
     -H "Content-Type: application/json" \
     -d '{"key": "value"}' \
     "https://proxy.obul.ai/proxy/https/TARGET_HOST/PATH"
```


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

