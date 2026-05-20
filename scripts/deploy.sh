#!/usr/bin/env bash
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log()  { printf "${GREEN}[Deploy]${NC} %s\n" "$1"; }
warn() { printf "${YELLOW}[Warn]${NC}  %s\n" "$1"; }
err()  { printf "${RED}[Error]${NC} %s\n" "$1"  >&2; }
info() { printf "${CYAN}[Info]${NC}  %s\n" "$1"; }

usage() {
    cat <<EOF
Usage: $(basename "$0") <vps-host> [branch]

Deploy this repo to a VPS via git push + post-receive hook.

Arguments:
  vps-host     SSH destination, e.g. root@34.56.78.90 or deploy@yourdomain.com
  branch       Git branch to push (default: main)

Example:
  $(basename "$0") root@34.56.78.90
  $(basename "$0") deploy@learnify.yourdomain.com feature/my-branch

Prerequisites on VPS:
  - Docker + Docker Compose installed
  - Git remote 'vps' configured on this machine
  - /opt/learnify/ directory created on VPS (see DEPLOY_DIR below)

Run once on VPS to set up the remote:
  git remote add vps root@34.56.78.90:/opt/learnify
EOF
    exit 1
}

(( "$#" >= 1 )) || usage
VPS_HOST="$1"
BRANCH="${2:-main}"
DEPLOY_DIR="/opt/learnify"

log "Starting deployment to ${VPS_HOST}:${DEPLOY_DIR}"

if ! git remote get-url vps &>/dev/null; then
    err "Remote 'vps' not found. Run 'make vps-init' first."
    exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
    warn "You have uncommitted changes:"
    warn "Staged:    $(git diff --cached --stat | tail -1)"
    warn "Unstaged:  $(git diff --stat | tail -1)"
    read -rp "Continue anyway? [y/N] " confirm
    [[ "$confirm" =~ ^[Yy]$ ]] || exit 0
fi

info "Pushing branch '${BRANCH}' to 'vps' remote..."
git push vps "${BRANCH}:staging"

log "Push complete. Monitor with:"
log "  ssh ${VPS_HOST} 'docker compose -f ${DEPLOY_DIR}/docker-compose.yml logs -f --tail=50'"