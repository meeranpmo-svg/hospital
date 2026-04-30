# Deploying Hospital ERP to Hostinger

This guide walks through deploying the Hospital ERP build to Hostinger shared hosting (Apache + hPanel).

The build is a **static SPA** — it talks to no backend and stores everything in the browser's `localStorage`. So any cheap shared-hosting plan works; you just need to upload static files.

---

## What you upload

After running `npm run build`, the production-ready output sits in the `dist/` folder. Two pre-flight things are already done for you:

1. **`vite.config.js` uses `base: './'`** so every asset path in the build is relative. This means it works whether you deploy to the document root, a subdirectory, or a subdomain — no rebuild needed.
2. **`dist/.htaccess`** is included so Apache rewrites every unknown path back to `index.html`. Without this, hard-refreshing on `/doctor` or `/pharmacy` gives a 404 because React Router runs in the browser and Apache doesn't know those routes exist.

The `.htaccess`:

```apacheconf
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

> **Important:** `.htaccess` is a hidden file (leading dot). Make sure your FTP/file-manager view shows hidden files, otherwise you'll think you uploaded everything but the SPA fallback will be missing and routes will 404.

---

## Option A — Upload via hPanel File Manager (easiest)

1. Log in to **hPanel** at https://hpanel.hostinger.com
2. Pick the hosting plan / domain you want to deploy to
3. Open **Files → File Manager**
4. Navigate into **`public_html/`** (this is the document root for your primary domain)
   - If `public_html` already has a default `index.html` or any old files, **delete them first** so they don't shadow the new app
5. Click **Upload Files**
6. Upload **the contents** of the local `dist/` folder — *not the `dist` folder itself*. So `index.html`, the `assets/` folder, and the hidden `.htaccess` should land directly inside `public_html/`
7. After upload, confirm hPanel's File Manager shows hidden files. If you don't see `.htaccess`, click the gear/settings icon in the File Manager toolbar and enable **"Show hidden files"**, then re-upload `.htaccess` if missing
8. Visit your domain (e.g. `https://yourdomain.com`) — the login page should load

### Faster: upload the zip

Instead of dragging individual files, upload **`hostinger-deploy.zip`** (created in the project root) and use the File Manager's right-click → **Extract** option. Make sure you extract *into* `public_html/` and then delete the zip. Verify `.htaccess` survived the extraction.

---

## Option B — Upload via FTP

1. In hPanel, open **Files → FTP Accounts** and grab (or create) FTP credentials
2. Connect with FileZilla / WinSCP / Cyberduck
3. In your FTP client, **enable "Show hidden files"** (FileZilla: *Server → Force showing hidden files*)
4. Upload everything inside the local `dist/` folder into the remote `public_html/` directory
5. Verify `.htaccess` is on the server

---

## Deploying to a subdomain (e.g. `erp.yourdomain.com`)

1. In hPanel, go to **Domains → Subdomains** and create the subdomain (Hostinger will create a folder like `public_html/erp/` or a separate root)
2. Note the document root that hPanel shows for the subdomain
3. Upload the contents of `dist/` into **that** folder (same rule: contents, not the folder itself; include `.htaccess`)
4. Visit `https://erp.yourdomain.com`

Because `base: './'` produces relative asset paths, no rebuild is needed for subdomains or subdirectory deploys.

---

## Deploying to a subdirectory (e.g. `yourdomain.com/erp`)

1. Create a folder `public_html/erp/`
2. Upload the contents of `dist/` into `public_html/erp/`
3. Visit `https://yourdomain.com/erp/`

If the app loads but routes break, the `.htaccess` rewrite needs the subdirectory base. Edit `dist/.htaccess` to:

```apacheconf
Options -MultiViews
RewriteEngine On
RewriteBase /erp/
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

Re-upload `.htaccess`.

---

## Verifying the deployment

After upload, visit the site and check:

- **Login page renders** with the gradient hero and demo account cards
- **Sign in works** with `admin@hospital.com` / `Admin@123` (or any seeded role)
- **Hard-refresh on a deep route** like `/doctor` or `/pharmacy` reloads the app instead of showing a 404 — this confirms `.htaccess` is in place
- **Browser console** is clean (no 404s on `/assets/index-*.js` or `/assets/index-*.css`)
- **Language toggle** (top bar globe icon) flips the layout to RTL Arabic

---

## Re-deploying after code changes

Every time you change source code:

```bash
npm run build
```

This wipes `dist/` and rebuilds it. The `.htaccess` we added lives **inside** `dist/`, so it gets wiped too. Recreate it (or keep a copy at the project root and copy it back into `dist/` after each build), then re-upload.

A cleaner long-term setup is to move `.htaccess` into the project's `public/` folder — Vite copies everything in `public/` straight into `dist/` on each build, so it survives rebuilds automatically.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Blank white page, console shows 404s for JS/CSS | `base` is wrong for the deploy path | Verify `vite.config.js` has `base: './'`, rebuild, re-upload |
| Login page works but `/doctor` returns 404 on refresh | `.htaccess` missing or not uploaded | Re-upload `.htaccess`; ensure hidden files are visible |
| Hostinger shows the default placeholder page | `public_html/` still has Hostinger's `default.php` / `index.html` | Delete those files; your `index.html` must be the only one |
| Mixed-content warnings | Site loaded over HTTP | In hPanel → **SSL**, force HTTPS for the domain |
| Demo data resets on every visit | Expected — data lives in the visitor's `localStorage`. Each browser/device has its own data. Wire up Supabase later for shared data. |

---

## Files in this deploy

The `hostinger-deploy.zip` (project root) contains exactly what should land in `public_html/`:

```
index.html
.htaccess
assets/
  index-[hash].js
  index-[hash].css
vite.svg
```
