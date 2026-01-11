#!/bin/bash
# GitHub Actions Self-Hosted Runner Installation Script for macOS ARM64
# Supports: Single repository OR entire organization
# Machine: M1 Max MacBook Pro

set -e

# === Configuration ===
RUNNER_VERSION="2.331.0"
# Runner directory will be set based on scope selection
RUNNER_DIR=""
# URL will be set based on scope selection  
TARGET_URL=""
# Default values (can be overridden)
DEFAULT_ORG="mihai-codes"
DEFAULT_REPO="chindris-mihai-alexandru/mihai.codes"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     GitHub Actions Self-Hosted Runner Setup                ║${NC}"
echo -e "${BLUE}║     Machine: macOS ARM64 (Apple Silicon M1 Max)            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# === Scope Selection ===
echo -e "${YELLOW}[1/8] Select runner scope...${NC}"
echo ""
echo -e "  ${BLUE}1)${NC} Organization (recommended) - Runner serves ALL repos in org"
echo -e "  ${BLUE}2)${NC} Single Repository - Runner serves only one repo"
echo ""
read -p "Choose scope [1/2] (default: 1): " SCOPE_CHOICE
SCOPE_CHOICE=${SCOPE_CHOICE:-1}

if [ "$SCOPE_CHOICE" = "1" ]; then
    RUNNER_SCOPE="org"
    echo ""
    read -p "Enter GitHub organization name (default: $DEFAULT_ORG): " ORG_NAME
    ORG_NAME=${ORG_NAME:-$DEFAULT_ORG}
    TARGET_URL="https://github.com/$ORG_NAME"
    RUNNER_DIR="${HOME}/actions-runner-${ORG_NAME}"
    RUNNER_NAME="mac-m1max-${ORG_NAME}"
    echo -e "  ${GREEN}✓${NC} Scope: Organization ($ORG_NAME)"
else
    RUNNER_SCOPE="repo"
    echo ""
    read -p "Enter repository (owner/repo, default: $DEFAULT_REPO): " REPO_PATH
    REPO_PATH=${REPO_PATH:-$DEFAULT_REPO}
    TARGET_URL="https://github.com/$REPO_PATH"
    REPO_NAME=$(echo "$REPO_PATH" | cut -d'/' -f2)
    RUNNER_DIR="${HOME}/actions-runner-${REPO_NAME}"
    RUNNER_NAME="mac-m1max-${REPO_NAME}"
    echo -e "  ${GREEN}✓${NC} Scope: Repository ($REPO_PATH)"
fi
echo ""

# === Pre-flight Checks ===
echo -e "${YELLOW}[2/8] Pre-flight checks...${NC}"

# Check architecture
ARCH=$(uname -m)
if [ "$ARCH" != "arm64" ]; then
    echo -e "${RED}Error: This script is for ARM64 (Apple Silicon) only.${NC}"
    echo -e "Detected architecture: $ARCH"
    exit 1
fi
echo -e "  ${GREEN}✓${NC} Architecture: arm64 (Apple Silicon)"

# Check macOS version
MACOS_VERSION=$(sw_vers -productVersion)
echo -e "  ${GREEN}✓${NC} macOS Version: $MACOS_VERSION"

# Check for Homebrew (for Node.js if needed)
if command -v brew &> /dev/null; then
    echo -e "  ${GREEN}✓${NC} Homebrew: installed"
else
    echo -e "  ${YELLOW}⚠${NC} Homebrew: not installed (optional, but recommended)"
fi

# Check for Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "  ${GREEN}✓${NC} Node.js: $NODE_VERSION"
else
    echo -e "  ${RED}✗${NC} Node.js: not installed"
    echo -e "  ${YELLOW}Run: brew install node${NC}"
fi

echo ""

# === Create Runner Directory ===
echo -e "${YELLOW}[3/8] Creating runner directory...${NC}"
if [ -d "$RUNNER_DIR" ]; then
    echo -e "  ${YELLOW}⚠${NC} Directory exists: $RUNNER_DIR"
    read -p "  Remove existing directory and continue? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Stop service if running
        if [ -f "$RUNNER_DIR/svc.sh" ]; then
            echo -e "  Stopping existing service..."
            cd "$RUNNER_DIR" && ./svc.sh stop 2>/dev/null || true
            ./svc.sh uninstall 2>/dev/null || true
        fi
        rm -rf "$RUNNER_DIR"
    else
        echo -e "${RED}Aborted.${NC}"
        exit 1
    fi
fi

mkdir -p "$RUNNER_DIR"
cd "$RUNNER_DIR"
echo -e "  ${GREEN}✓${NC} Created: $RUNNER_DIR"
echo ""

# === Download Runner ===
echo -e "${YELLOW}[4/8] Downloading GitHub Actions Runner v${RUNNER_VERSION}...${NC}"
RUNNER_TAR="actions-runner-osx-arm64-${RUNNER_VERSION}.tar.gz"
RUNNER_URL="https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/${RUNNER_TAR}"

if [ -f "$RUNNER_TAR" ]; then
    echo -e "  ${YELLOW}⚠${NC} Using cached: $RUNNER_TAR"
else
    curl -o "$RUNNER_TAR" -L "$RUNNER_URL"
    echo -e "  ${GREEN}✓${NC} Downloaded: $RUNNER_TAR"
fi
echo ""

# === Verify Checksum (optional but recommended) ===
echo -e "${YELLOW}[5/8] Extracting runner...${NC}"
tar xzf "./$RUNNER_TAR"
echo -e "  ${GREEN}✓${NC} Extracted runner files"
echo ""

# === Get Registration Token ===
echo -e "${YELLOW}[6/8] Configuration required...${NC}"
echo ""
if [ "$RUNNER_SCOPE" = "org" ]; then
    echo -e "${BLUE}To register this runner, you need a registration token from GitHub:${NC}"
    echo ""
    echo -e "  1. Go to: ${GREEN}https://github.com/organizations/$ORG_NAME/settings/actions/runners${NC}"
    echo -e "  2. Click: ${GREEN}'New self-hosted runner'${NC}"
    echo -e "  3. Copy the ${GREEN}token${NC} from the configure step"
else
    echo -e "${BLUE}To register this runner, you need a registration token from GitHub:${NC}"
    echo ""
    echo -e "  1. Go to: ${GREEN}$TARGET_URL/settings/actions/runners${NC}"
    echo -e "  2. Click: ${GREEN}'New self-hosted runner'${NC}"
    echo -e "  3. Copy the ${GREEN}token${NC} from the configure step"
fi
echo ""
read -p "Paste your registration token: " RUNNER_TOKEN

if [ -z "$RUNNER_TOKEN" ]; then
    echo -e "${RED}Error: Token is required.${NC}"
    exit 1
fi

echo ""

# === Configure Runner ===
echo -e "${YELLOW}[7/8] Configuring runner...${NC}"

./config.sh \
    --url "$TARGET_URL" \
    --token "$RUNNER_TOKEN" \
    --name "$RUNNER_NAME" \
    --labels "self-hosted,macOS,ARM64,m1-max" \
    --work "_work" \
    --replace

echo ""
echo -e "  ${GREEN}✓${NC} Runner configured: $RUNNER_NAME"
echo -e "  ${GREEN}✓${NC} Labels: self-hosted, macOS, ARM64, m1-max"
if [ "$RUNNER_SCOPE" = "org" ]; then
    echo -e "  ${GREEN}✓${NC} Scope: Organization ($ORG_NAME) - serves all repos"
else
    echo -e "  ${GREEN}✓${NC} Scope: Repository ($REPO_PATH)"
fi
echo ""

# === Install as Service ===
echo -e "${YELLOW}[8/8] Installing as launchd service...${NC}"
echo ""
echo -e "This will install the runner as a launchd service that:"
echo -e "  • Starts automatically on login"
echo -e "  • Runs in the background"
echo -e "  • Restarts if it crashes"
echo ""
read -p "Install as service? (Y/n): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    ./svc.sh install
    ./svc.sh start
    echo ""
    echo -e "  ${GREEN}✓${NC} Service installed and started"
    
    # Verify service status
    echo ""
    echo -e "${BLUE}Service Status:${NC}"
    ./svc.sh status
else
    echo ""
    echo -e "${YELLOW}Skipped service installation.${NC}"
    echo -e "To run manually: ${GREEN}cd $RUNNER_DIR && ./run.sh${NC}"
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                  Setup Complete!                           ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Runner Location: ${BLUE}$RUNNER_DIR${NC}"
echo -e "Runner Name:     ${BLUE}$RUNNER_NAME${NC}"
echo -e "Labels:          ${BLUE}self-hosted, macOS, ARM64, m1-max${NC}"
if [ "$RUNNER_SCOPE" = "org" ]; then
    echo -e "Scope:           ${BLUE}Organization ($ORG_NAME)${NC}"
    echo -e "Serves:          ${BLUE}All repositories in the organization${NC}"
else
    echo -e "Scope:           ${BLUE}Repository ($REPO_PATH)${NC}"
fi
echo ""
echo -e "${YELLOW}Useful Commands:${NC}"
echo -e "  Start:   ${GREEN}cd $RUNNER_DIR && ./svc.sh start${NC}"
echo -e "  Stop:    ${GREEN}cd $RUNNER_DIR && ./svc.sh stop${NC}"
echo -e "  Status:  ${GREEN}cd $RUNNER_DIR && ./svc.sh status${NC}"
echo -e "  Logs:    ${GREEN}cd $RUNNER_DIR && cat _diag/Runner_*.log | tail -50${NC}"
echo ""
echo -e "${YELLOW}To use in workflows:${NC}"
echo -e "  ${GREEN}runs-on: [self-hosted, macOS, ARM64]${NC}"
echo ""
echo -e "${YELLOW}Note:${NC} GitHub reversed the planned self-hosted runner charges (Dec 2025)."
echo -e "Self-hosted runners remain FREE. See README.md for latest pricing updates."
echo ""
