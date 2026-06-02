# Ansha Smart HIS Systems

**Intelligent Hospital Information System**

Developed by **Smart Shield AI Company Private Limited**, India.

---

Modern, bilingual-ready Hospital Information System for Indian hospitals. Built with React + Vite + Tailwind CSS. Uses `localStorage` for the current build (Supabase backend on the roadmap).

This repository's live deployment is configured for **Jyothi Hospital, Chennai** as the customer. The platform itself (Ansha Smart HIS) is the same codebase — only the `HOSPITAL` constant in `src/data/seed.js` differs per customer.

## Live deployment

- **Vercel:** https://hospital-erp-lovat.vercel.app
- **GitHub:** https://github.com/meeranpmo-svg/hospital

## Modules (19 total)

- 🏠 Dashboard · 👤 Patient Registration (Aadhaar / PAN / ABHA) · 📅 Appointments · 🎫 Queue & Tokens
- 🩺 Doctor Workbench · 👑 Chief Dashboard · 💗 Nurse Station
- 💊 Pharmacy · 🧪 Laboratory · 🤖 Simulated AI Clinical Assistant
- 🏥 Insurance / TPA (Star, Niva Bupa, HDFC ERGO, PM-JAY, CGHS, ECHS, TPAs) · IRDAI compliance
- 💰 Billing (GST-compliant Tax Invoice / Bill of Supply with HSN/SAC, CGST+SGST or IGST)
- 💵 Cashier (Cash / UPI / Card / NEFT) · 📊 Finance Reports
- 🧮 Accounting (Chart of Accounts with Input/Output GST · TDS · EPF · ESI · Prof Tax · Journals · A/P · A/R)
- 🛒 Purchase Department (Vendors with GSTIN · CGST+SGST or IGST · Approval workflow)
- 📦 Supply Chain (Warehouses · SKUs · Stock movements · GRN)
- 👥 Human Resources (Employees · Attendance · Leave · Payroll with EPF/ESI/TDS · Recruitment pipeline · Documents with NMC/INC/PCI expiry tracking · Performance · Training)
- ⚙️ Settings (Standalone vs Microsoft 365 / Azure AD SSO toggle · About page)

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (defaults to 5173 if free, otherwise the next port). Use any seeded login — password `Admin@123`.

## Run with Docker

```bash
docker-compose up --build
# open http://localhost:3000
```

## Run in production (VPS)

Two deploy options — see [DEPLOY_VPS.md](DEPLOY_VPS.md):

- **Behind Nginx Proxy Manager / Traefik** — use `docker-compose.yml`, expose `HOST_PORT=8086`, add a proxy host in NPM
- **Standalone with bundled HTTPS** — use `docker-compose.prod.yml` (Caddy reverse proxy + auto Let's Encrypt)

## Deploy to Hostinger shared hosting

```bash
npm run build
# upload contents of dist/ (incl. .htaccess) to public_html/
```

See [DEPLOY_HOSTINGER.md](DEPLOY_HOSTINGER.md).

## Demo accounts (all password `Admin@123`)

| Role | Email |
|---|---|
| Admin | `admin@jyothihospital.in` |
| Doctor (Dr. Arjun Krishnan) | `doctor@jyothihospital.in` |
| Chief Medical Officer | `chief@jyothihospital.in` |
| Nurse (Sr. Mary Lakshmi) | `nurse@jyothihospital.in` |
| Receptionist | `reception@jyothihospital.in` |
| Pharmacist | `pharmacist@jyothihospital.in` |
| Lab Technician | `lab@jyothihospital.in` |
| Finance Officer | `finance@jyothihospital.in` |
| Accountant | `accountant@jyothihospital.in` |
| Cashier | `cashier@jyothihospital.in` |
| Insurance / TPA Coordinator | `tpa@jyothihospital.in` |
| Purchase Officer | `purchase@jyothihospital.in` |
| Inventory Manager | `inventory@jyothihospital.in` |
| HR Manager | `hr@jyothihospital.in` |

## Project structure

```
src/
  components/     Layout, Sidebar, TopBar, PatientSearch, TokenDisplay, AIAssistant
  pages/          Login, Dashboard, PatientRegistration, Appointments, Queue,
                  DoctorDashboard, PatientFile, Pharmacy, Lab, Insurance,
                  Billing, Cashier, Finance, NurseStation, ChiefDashboard,
                  Accounting, Purchase, SupplyChain, HR, Users, Settings
  data/           seed.js (PRODUCT + HOSPITAL + all seed data), storage.js
  i18n/           en.json, index.js
  App.jsx, main.jsx
```

## Tech

React 19 · Vite · Tailwind CSS 3 · React Router · react-i18next · lucide-react · Recharts

## Licence & attribution

© 2026 Smart Shield AI Company Private Limited, India. All rights reserved.

Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited without express written permission from Smart Shield AI Company Private Limited.

For licensing, deployment, or customization enquiries: **support@smartshieldai.in**

---

## To rebrand for a different hospital

Edit `src/data/seed.js` and update the `HOSPITAL` constant (name, address, GSTIN, etc.) — the rest of the app picks up the change automatically. Add `SEED_USERS` with the customer's email domain and `npm run build`.
