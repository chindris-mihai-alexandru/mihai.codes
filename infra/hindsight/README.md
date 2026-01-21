# Hindsight Memory Server Deployment

This directory contains the Fly.io configuration for deploying Hindsight as the memory backend for mihai.codes.

## Prerequisites

1. **Fly.io account**: Sign up at https://fly.io (no credit card required for free tier)
2. **Fly CLI**: Install with `brew install flyctl` or `curl -L https://fly.io/install.sh | sh`
3. **Groq API key**: Get one free at https://console.groq.com

## Deployment Steps

### 1. Authenticate with Fly.io

```bash
flyctl auth login
```

### 2. Deploy Hindsight

```bash
cd infra/hindsight

# Create the app and volume
flyctl launch --copy-config --no-deploy

# Create persistent volume for PostgreSQL data
flyctl volumes create hindsight_data --size 1 --region ams

# Set your Groq API key as a secret
flyctl secrets set HINDSIGHT_API_LLM_API_KEY=gsk_your_groq_api_key_here

# Deploy
flyctl deploy
```

### 3. Verify Deployment

```bash
# Check status
flyctl status

# View logs
flyctl logs

# Open the app (should show API info)
flyctl apps open
```

Your Hindsight instance will be available at: `https://hindsight-mihai.fly.dev`

## Configuration

| Setting | Value | Notes |
|---------|-------|-------|
| Region | `ams` (Amsterdam) | Low latency for EU |
| Memory | 512MB | Sufficient for personal use |
| Storage | 1GB volume | For embedded PostgreSQL |
| LLM Provider | Groq | Fast, free tier available |
| Auto-stop | Enabled | Saves resources when idle |

## Updating

```bash
cd infra/hindsight
flyctl deploy
```

## Monitoring

```bash
# View logs
flyctl logs -f

# Check metrics
flyctl status
```

## Cost

Free tier includes:
- 3 shared VMs with 256MB each (we use 512MB = uses 2 VM slots)
- 3GB persistent storage
- Shared IPv4, dedicated IPv6

For a personal blog, this should stay within free tier limits.
