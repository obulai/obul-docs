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

## Authentication

All requests need your API key in the `X-Obul-Key` header:

```http
X-Obul-Key: obul_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Key Types

| Prefix | Environment | Rate Limit |
|--------|-------------|------------|
| `obul_live_` | Production | 10,000/min |
| `obul_test_` | Testing | 100/min |

## URL Structure

```
https://proxy.obul.ai/{version}/{service}/{endpoint}
```

| Component | Description | Example |
|-----------|-------------|---------|
| `version` | API version | `v1` |
| `service` | Target service | `demo`, `custom` |
| `endpoint` | Specific endpoint | `echo`, `chat` |

### Examples

```
https://proxy.obul.ai/v1/demo/echo
https://proxy.obul.ai/v1/custom/my-api/predict
```

## Headers

### Required

| Header | Value | Description |
|--------|-------|-------------|
| `X-Obul-Key` | `obul_live_xxx` | Your API key |
| `Content-Type` | `application/json` | Request format |

### Optional

| Header | Value | Description |
|--------|-------|-------------|
| `X-Payment-Address` | `0x...` | Wallet for payment |
| `X-Idempotency-Key` | `uuid` | Prevent duplicates |
| `X-Request-ID` | `uuid` | Trace requests |

## Endpoints

### Health Check

```http
GET /healthz
```

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2025-02-24T15:45:00Z"
}
```

### Demo Echo

Test endpoint that echoes your input.

```http
POST /v1/demo/echo
```

**Request:**
```json
{
  "prompt": "Hello, Obul!"
}
```

**Response:**
```json
{
  "result": "Hello, Obul!",
  "transaction": {
    "hash": "0x...",
    "amount": "0.001",
    "status": "confirmed"
  }
}
```

### Custom Proxy

Proxy to your own API.

```http
POST /v1/custom/{your-endpoint}
```

Configure in dashboard first.

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

### Rate Limit Headers

```http
X-RateLimit-Limit: 10000
X-RateLimit-Remaining: 9995
X-RateLimit-Reset: 1708790400
```

### Handling 429

```python
import time
import requests

def make_request_with_retry(url, headers, max_retries=3):
    for attempt in range(max_retries):
        response = requests.get(url, headers=headers)
        
        if response.status_code == 429:
            retry_after = int(response.headers.get('Retry-After', 60))
            time.sleep(retry_after)
            continue
            
        return response
    
    raise Exception("Max retries exceeded")
```

## x402 Payment Flow

When payment is required, you get a 402:

```http
HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "x402-version": 1,
  "x402-facilitator": "obul",
  "x402-payment": {
    "scheme": "exact",
    "network": "base-sepolia",
    "required-amount": "1000000000000000",
    "token": "0x0000000000000000000000000000000000000000",
    "pay-to": "0x..."
  }
}
```

### Completing Payment

1. Parse the 402 response
2. Sign payment with your wallet
3. Retry with `X-Payment` header:

```http
POST /v1/demo/echo
X-Obul-Key: obul_live_xxx
X-Payment: <signed-payload>

{"prompt": "Hello!"}
```

## SDK Examples

### Python

```python
import requests

class ObulClient:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://proxy.obul.ai"
    
    def request(self, method, endpoint, **kwargs):
        headers = {
            "X-Obul-Key": self.api_key,
            "Content-Type": "application/json"
        }
        headers.update(kwargs.pop("headers", {}))
        
        url = f"{self.base_url}{endpoint}"
        response = requests.request(method, url, headers=headers, **kwargs)
        
        if response.status_code == 402:
            payment_info = response.json()
            print(f"Payment required: {payment_info}")
            # Sign and retry...
        
        return response

# Usage
client = ObulClient("obul_live_xxx")
response = client.request("POST", "/v1/demo/echo", json={"prompt": "Hello!"})
print(response.json())
```

### Node.js

```javascript
class ObulClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://proxy.obul.ai';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'X-Obul-Key': this.apiKey,
      'Content-Type': 'application/json',
      ...options.headers
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 402) {
      const paymentInfo = await response.json();
      console.log('Payment required:', paymentInfo);
      // Handle payment...
    }

    return response;
  }
}

// Usage
const client = new ObulClient('obul_live_xxx');
const response = await client.request('/v1/demo/echo', {
  method: 'POST',
  body: JSON.stringify({ prompt: 'Hello!' })
});
const data = await response.json();
console.log(data);
```

### Go

```go
package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

type ObulClient struct {
    APIKey  string
    BaseURL string
}

func NewClient(apiKey string) *ObulClient {
    return &ObulClient{
        APIKey:  apiKey,
        BaseURL: "https://proxy.obul.ai",
    }
}

func (c *ObulClient) Request(method, endpoint string, body interface{}) (*http.Response, error) {
    url := c.BaseURL + endpoint
    jsonBody, _ := json.Marshal(body)
    req, _ := http.NewRequest(method, url, bytes.NewBuffer(jsonBody))
    
    req.Header.Set("X-Obul-Key", c.APIKey)
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    return client.Do(req)
}
```

## Webhooks

Configure webhooks in your dashboard for real-time events.

### Events

| Event | Description |
|-------|-------------|
| `payment.success` | Payment processed |
| `payment.failed` | Payment failed |
| `api_key.created` | New key created |
| `api_key.revoked` | Key revoked |

### Verification

```python
import hmac
import hashlib

def verify_webhook(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)
```

## Support

- Email: [support@obul.ai](mailto:support@obul.ai)
- Discord: [discord.gg/obul](https://discord.gg/obul)
- Status: [status.obul.ai](https://status.obul.ai)
