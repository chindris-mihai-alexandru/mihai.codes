# GitHub Actions Self-Hosted Runner Setup

Scripts to set up a GitHub Actions self-hosted runner on macOS ARM64 (Apple Silicon).

## Quick Start

```bash
cd /path/to/mihai-codes/scripts/runner
./install.sh
```

The installer will prompt you to choose:
1. **Organization scope** (recommended) - One runner serves all repos in your org
2. **Repository scope** - Runner serves only one specific repo

## Requirements

- macOS on Apple Silicon (M1/M2/M3/M4)
- Node.js 20+ installed (`brew install node`)
- GitHub account with admin access to org or repo

## Organization vs Repository Runners

| Feature | Organization | Repository |
|---------|-------------|------------|
| Serves | All repos in org | Single repo only |
| Setup | Once per org | Once per repo |
| Best for | Multiple related projects | Single isolated project |

**Recommendation**: Use organization-level for related projects like `mihai.codes` + `mihai-codes-studio`.

## Files Created

| Location | Purpose |
|----------|---------|
| `~/actions-runner-{name}/` | Runner installation |
| `~/Library/LaunchAgents/actions.runner.*.plist` | launchd service |
| `~/Library/Logs/actions.runner.*/` | Logs |

## Commands

| Action | Command |
|--------|---------|
| Start | `cd ~/actions-runner-{name} && ./svc.sh start` |
| Stop | `cd ~/actions-runner-{name} && ./svc.sh stop` |
| Status | `cd ~/actions-runner-{name} && ./svc.sh status` |
| Logs | `tail -f ~/Library/Logs/actions.runner.*/stdout.log` |
| Uninstall | `./uninstall.sh` |

## Workflow Usage

```yaml
jobs:
  build:
    runs-on: [self-hosted, macOS, ARM64]
```

## Cloud Burst Options for Heavy Jobs

If your M1 Max struggles with heavy builds, use cloud runners as overflow:

| Provider | Pricing | Best For | Setup |
|----------|---------|----------|-------|
| [BuildJet](https://buildjet.com) | $0.004-0.048/min | Fast Linux/ARM builds | 1-line change |
| [Namespace](https://namespace.so) | $0.007/min+ | macOS M4 Pro, large cache | 1-line change |
| [Blacksmith](https://blacksmith.sh) | $0.004/min+ | Migration wizard, Docker | 1-line change |
| [RunsOn](https://runs-on.com) | AWS pricing | Self-hosted in your AWS | Deploy to AWS |
| GitHub hosted | $0.008/min (Linux) | Quick jobs, no setup | Default |

### Hybrid Workflow Example

Use self-hosted for most jobs, cloud for heavy/parallel:

```yaml
jobs:
  quick-test:
    runs-on: [self-hosted, macOS, ARM64]
    steps:
      - uses: actions/checkout@v4
      - run: npm test

  heavy-build:
    runs-on: buildjet-4vcpu-ubuntu-2204
    steps:
      - uses: actions/checkout@v4
      - run: npm run build:production
```

## Pricing Updates (as of Dec 2025)

~~GitHub announced $0.002/min for self-hosted runners starting March 1, 2026.~~

**UPDATE (Dec 17, 2025)**: GitHub **REVERSED** this decision after community backlash. The pricing change has been **postponed indefinitely** while they "re-evaluate their approach."

**Current status**:
- ✅ Self-hosted runners: **FREE** (no change)
- ✅ GitHub-hosted (public repos): **FREE with unlimited minutes**
- ✅ GitHub-hosted prices **dropped 20-39%** as of Jan 1, 2026

For the latest, see: [GitHub Actions pricing update](https://resources.github.com/actions/2026-pricing-changes-for-github-actions/)

## Security Notes

- For public repos: Forks can run code on your machine via PRs
- Mitigation: Require approval for fork PRs, or use cloud runners for public repos
- Runner has full machine access - don't store secrets locally

## Troubleshooting

### Runner not picking up jobs

1. Check status: `./svc.sh status`
2. Check logs: `cat ~/actions-runner-{name}/_diag/Runner_*.log | tail -100`
3. Verify labels match: `[self-hosted, macOS, ARM64]`
4. For org runners: Check runner is visible in org settings

### Updating the runner

GitHub auto-updates runners. For manual update:

```bash
./svc.sh stop
curl -o actions-runner.tar.gz -L https://github.com/actions/runner/releases/latest/...
tar xzf actions-runner.tar.gz
./svc.sh start
```

## Creating a GitHub Organization

For org-level runners, create an organization first:

1. Go to https://github.com/organizations/plan
2. Choose "Free" plan (works for public repos)
3. Name suggestion: `mihai-codes` or `your-name-projects`
4. Transfer or fork your repos to the org
