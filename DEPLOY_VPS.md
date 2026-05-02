# Deploying Hospital ERP to a VPS

End state: your VPS serves the True Balance Hospital ERP on **port 80** (and **443** for HTTPS once you add a domain). Updates are `git pull && ./deploy.sh`.

Stack: Docker Compose runs two containers — the existing **Nginx + Vite build** container (`hospital-erp`) and a **Caddy reverse proxy** in front for TLS, gzip, and security headers.

---

## 0. Before you start — what you need

- A VPS with **Ubuntu 22 / 24 LTS** (or Debian 12). Other distros work too, install commands differ.
- **Root SSH access** (or a sudo user).
- **Public IP** of the VPS. (You're using `82.112.237.91`.)
- **Optional but strongly recommended:** a domain name with an A record pointing to your VPS IP. Without a domain you only get HTTP (no HTTPS). Adding a domain later takes 30 seconds.

---

## 1. SSH in

From your laptop:

```bash
ssh root@82.112.237.91
```

Everything below runs **on the VPS**, not on your laptop.

---

## 2. Install Docker (one-time, ~2 min)

Ubuntu / Debian:

```bash
# Update package index
apt update && apt upgrade -y

# Install Docker (official one-liner script)
curl -fsSL https://get.docker.com | sh

# Verify
docker --version
docker compose version

# Install git if not present
apt install -y git
```

---

## 3. Open firewall ports 80 + 443

If `ufw` is enabled (default on most VPS images):

```bash
ufw allow 22/tcp   # keep SSH open!
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS
ufw --force enable
ufw status
```

If `ufw` is NOT installed and there's a **provider-level firewall** (Hostinger, DO, Hetzner all have one in their web dashboard), open **80**, **443**, and keep **22** open in that dashboard instead. Cloud firewalls override OS firewalls.

---

## 4. Clone the repo

```bash
cd /opt
git clone https://github.com/meeranpmo-svg/hospital.git
cd hospital
```

---

## 5. Configure the environment

```bash
cp .env.example .env
nano .env
```

Edit two lines:

| If you have... | Set... |
|---|---|
| **No domain yet** | `SITE_ADDRESS=:80` (default — leave as-is). Site will be reachable at `http://82.112.237.91`. |
| **A domain** (e.g. `hospital.truebalance.sa`) | `SITE_ADDRESS=hospital.truebalance.sa` and `ACME_EMAIL=you@truebalance.sa`. Caddy auto-fetches a Let's Encrypt cert on first launch. **The DNS A record must already point to `82.112.237.91`** before launching, or cert provisioning fails. |

Save (Ctrl+O, Enter, Ctrl+X).

---

## 6. Launch the stack

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

First time takes 2–4 minutes (downloads Node Alpine, Nginx Alpine, Caddy Alpine, runs `npm ci` + `npm run build`).

Watch the logs to confirm:

```bash
docker compose -f docker-compose.prod.yml logs -f
```

You should see:
- `hospital-erp` Nginx serving on port 80 internally
- `hospital-caddy` listening on `:80` (and `:443` if domain configured)
- If using a domain: a Let's Encrypt certificate handshake line

Press **Ctrl+C** to exit logs (containers keep running in background).

---

## 7. Open your site

- **No domain:** http://82.112.237.91
- **With domain:** https://your-domain (note `https`, Caddy redirects automatically)

You should see the **True Balance** login page.

---

## 8. Future updates (after pushing code from your laptop)

On the VPS:

```bash
cd /opt/hospital
./deploy.sh
```

That's it — pulls latest from GitHub, rebuilds, restarts. Total ~30 seconds for incremental builds.

---

## 9. Adding HTTPS later (if you started without a domain)

1. Buy / point a domain at `82.112.237.91` (DNS A record)
2. Wait for DNS propagation (`dig your-domain` should show your VPS IP)
3. On the VPS:
   ```bash
   cd /opt/hospital
   nano .env   # change SITE_ADDRESS to your domain, set ACME_EMAIL
   docker compose -f docker-compose.prod.yml up -d
   ```
4. Caddy fetches the cert on next request. Done.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `bind: address already in use` on port 80 | Another web server (default Apache/Nginx) is running | `systemctl stop apache2 nginx; systemctl disable apache2 nginx` |
| Can reach site from VPS but not from internet | Firewall blocks 80/443 | Check `ufw status` and your cloud provider's firewall dashboard |
| HTTPS handshake fails / "your connection isn't private" | DNS not pointing to VPS yet, or rate limited by Let's Encrypt | `dig your-domain` to confirm A record. Use staging CA first by uncommenting the `acme_ca` line in `Caddyfile`. |
| `docker: command not found` | Docker install failed | Re-run step 2 |
| Container restarts in a loop | Build error | `docker compose -f docker-compose.prod.yml logs hospital-erp` |
| Need to start over | Wipe volumes too | `docker compose -f docker-compose.prod.yml down -v` |

---

## Server hygiene (one-time setup, optional but recommended)

```bash
# Auto-update OS security patches
apt install -y unattended-upgrades
dpkg-reconfigure --priority=low unattended-upgrades

# Disable root SSH password login (use SSH keys only) — only after you confirm key login works:
# nano /etc/ssh/sshd_config  →  set `PasswordAuthentication no`  →  systemctl restart sshd

# Set timezone (KSA = Asia/Riyadh)
timedatectl set-timezone Asia/Riyadh
```
