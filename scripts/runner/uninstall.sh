#!/bin/bash
# GitHub Actions Self-Hosted Runner Uninstall Script
# For: mihai.codes project

set -e

RUNNER_DIR="${HOME}/actions-runner-mihai-codes"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}GitHub Actions Runner Uninstall for mihai.codes${NC}"
echo ""

if [ ! -d "$RUNNER_DIR" ]; then
    echo -e "${YELLOW}Runner directory not found: $RUNNER_DIR${NC}"
    exit 0
fi

cd "$RUNNER_DIR"

# Stop and uninstall service
if [ -f "./svc.sh" ]; then
    echo -e "${YELLOW}[1/3] Stopping service...${NC}"
    ./svc.sh stop 2>/dev/null || true
    
    echo -e "${YELLOW}[2/3] Uninstalling service...${NC}"
    ./svc.sh uninstall 2>/dev/null || true
fi

# Get removal token
echo ""
echo -e "${YELLOW}[3/3] To completely remove the runner from GitHub:${NC}"
echo ""
echo -e "  1. Go to your repo: Settings → Actions → Runners"
echo -e "  2. Click on the runner"
echo -e "  3. Click 'Remove' and copy the removal token"
echo ""
read -p "Enter removal token (or press Enter to skip): " REMOVAL_TOKEN

if [ -n "$REMOVAL_TOKEN" ]; then
    ./config.sh remove --token "$REMOVAL_TOKEN"
    echo -e "${GREEN}✓${NC} Runner removed from GitHub"
fi

# Remove directory
echo ""
read -p "Delete runner directory ($RUNNER_DIR)? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf "$RUNNER_DIR"
    echo -e "${GREEN}✓${NC} Directory removed"
fi

echo ""
echo -e "${GREEN}Uninstall complete.${NC}"
