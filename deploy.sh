#!/usr/bin/env bash
# Re-deploy the Hospital ERP on the VPS.
# Run from the repo root after `git pull`:
#   ./deploy.sh
#
# Or all-in-one:
#   git pull && ./deploy.sh
set -euo pipefail

cd "$(dirname "$0")"

if [ ! -f .env ]; then
    echo "✗ .env file not found. Copy .env.example → .env and edit it first."
    exit 1
fi

echo "→ Pulling latest from origin/main..."
git pull --ff-only origin main

echo "→ Rebuilding and restarting containers..."
docker compose -f docker-compose.prod.yml up -d --build

echo "→ Pruning dangling images..."
docker image prune -f >/dev/null

echo ""
echo "✓ Deploy complete."
docker compose -f docker-compose.prod.yml ps
