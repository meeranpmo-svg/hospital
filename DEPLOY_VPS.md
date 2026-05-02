# Deploying Hospital ERP to a VPS

Pick the path that matches your setup:

- **Option A — VPS already runs Nginx Proxy Manager (NPM) or Traefik.** ← recommended if true
  Just expose the app container on a free host port and add a proxy host in your existing reverse proxy. Skip to **Option A** below.

- **Option B — Bare VPS, no reverse proxy yet.**
  Use the bundled Caddy stack (`docker-compose.prod.yml`) — handles HTTPS automatically. See **Option B** further down.

---

# Option A — Behind Nginx Proxy Manager

End state: NPM forwards `https://your-subdomain.com` → `http://172.17.0.1:8086` (the Hospital ERP container). NPM handles HTTPS via Let's Encrypt; the app container only speaks plain HTTP internally.

## A1. SSH in

```bash
ssh root@82.112.237.91
```

## A2. Install Docker (skip if already installed)

```bash
docker --version || curl -fsSL https://get.docker.com | sh
apt install -y git
docker compose version
```

## A3. Clone the repo

```bash
cd /opt
git clone https://github.com/meeranpmo-svg/hospital.git
cd hospital
```

## A4. Set the host port

```bash
echo "HOST_PORT=8086" > .env
```

(Or copy the full template: `cp .env.example .env && nano .env`. The only line that matters for the NPM path is `HOST_PORT`.)

## A5. Build and start

```bash
docker compose up -d --build
```

First run takes 2–4 minutes (Node + Nginx Alpine + npm ci + vite build).

Verify it's listening:

```bash
docker compose ps                        # should show hospital-erp Up
curl -I http://localhost:8086             # should return HTTP 200 + nginx
```

## A6. Add the proxy host in NPM

In the NPM dashboard (the screenshot you shared):

1. Click **"Add Proxy Host"** (top right)
2. **Details** tab:
   - **Domain Names:** pick a subdomain — e.g. `hospital.srv1568872.hstgr.cloud` or `truebalance.srv1568872.hstgr.cloud` or `82-112-237-91.nip.io` style
   - **Scheme:** `http`
   - **Forward Hostname / IP:** `172.17.0.1` (matches your other apps — that's the Docker bridge gateway)
   - **Forward Port:** `8086`
   - **Cache Assets:** ✅ on
   - **Block Common Exploits:** ✅ on
   - **Websockets Support:** ✅ on (harmless)
3. **SSL** tab:
   - **SSL Certificate:** `Request a new SSL Certificate`
   - **Force SSL:** ✅ on
   - **HTTP/2 Support:** ✅ on
   - **Email:** your email
   - Tick "I agree to the Let's Encrypt Terms"
4. Click **Save**

NPM provisions the cert in 30–60 seconds. New row appears with green "Online" status.

## A7. Open your site

`https://hospital.srv1568872.hstgr.cloud` (or whichever subdomain you chose). True Balance login should appear.

Login as `admin@hospital.com` / `Admin@123`.

## A8. Future updates

After pushing code from your laptop, on the VPS:

```bash
cd /opt/hospital && ./deploy.sh
```

Pulls latest from GitHub, rebuilds, restarts. ~30 seconds for incremental builds. NPM keeps proxying — nothing to change there.

---

# Option B — Bare VPS, use bundled Caddy

Use this if you do NOT already have a reverse proxy running.

```bash
ssh root@82.112.237.91
docker --version || curl -fsSL https://get.docker.com | sh
apt install -y git
ufw allow 22/tcp && ufw allow 80/tcp && ufw allow 443/tcp && ufw --force enable

cd /opt
git clone https://github.com/meeranpmo-svg/hospital.git
cd hospital
cp .env.example .env
nano .env
# Set:
#   SITE_ADDRESS=hospital.yourdomain.com   (or :80 for HTTP-only on the IP)
#   ACME_EMAIL=you@yourdomain.com

docker compose -f docker-compose.prod.yml up -d --build
```

Caddy auto-fetches the Let's Encrypt cert in ~30 seconds and serves on 80 + 443.

For full Option B detail (firewall, troubleshooting, etc.) see the **Troubleshooting** section below.

---

# Future updates from your laptop

1. Edit code locally
2. `git push` from your machine
3. SSH in: `ssh root@82.112.237.91`
4. `cd /opt/hospital && ./deploy.sh`

`deploy.sh` works for both Options A and B (it just rebuilds whatever compose file is currently in use — defaults to `docker-compose.prod.yml`; for Option A you may want to edit `deploy.sh` to drop the `-f docker-compose.prod.yml` flag, or replace it with the basic compose).

---

# Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `bind: address already in use` on port 8086 | Another app already grabbed that port | Pick a different free port: `echo HOST_PORT=8087 > .env && docker compose up -d` |
| Container starts but NPM still shows offline | NPM can't reach `172.17.0.1:8086` | From inside the NPM container, test: `docker exec -it <npm-container> wget -qO- http://172.17.0.1:8086 \| head`. If that fails, your hospital-erp container isn't actually bound to `0.0.0.0:8086`. Check `docker compose ps` and `ss -tlnp \| grep 8086`. |
| HTTPS handshake fails after adding proxy host in NPM | DNS A record for the subdomain isn't pointing to your VPS yet, or Let's Encrypt rate limited | `dig hospital.srv1568872.hstgr.cloud +short` from your laptop should return `82.112.237.91`. Hostinger's `srvXXXX.hstgr.cloud` subdomains usually resolve automatically. |
| Site loads but assets 404 | App was built with wrong base path | The bundled `docker-compose.yml` builds with `base: './'` (relative paths) — works at any URL. If you customized this, check `vite.config.js`. |
| Container restart loop | npm install or build error | `docker compose logs hospital-erp` |
| Need to nuke everything and start over | — | `docker compose down -v && docker compose up -d --build` |

---

# Server hygiene (one-time, optional)

```bash
# Auto-update OS security patches
apt install -y unattended-upgrades
dpkg-reconfigure --priority=low unattended-upgrades

# Set timezone (KSA = Asia/Riyadh)
timedatectl set-timezone Asia/Riyadh
```
