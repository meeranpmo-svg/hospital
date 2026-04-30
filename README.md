# Hospital ERP — Hospital Information System (HIS)

Bilingual (Arabic + English) Hospital Information System built with React + Vite + Tailwind CSS. Uses `localStorage` for data — no backend required (Supabase will be added later).

## Features

- 10 user roles: admin, doctor, chief_doctor, nurse, receptionist, pharmacist, lab_tech, finance, cashier, insurance_approval
- Modules: Dashboard, Patient Registration, Appointments, Queue & Tokens, Doctor Dashboard, Patient File, Pharmacy, Lab, Insurance/CCHI, Billing, Cashier, Finance, Nurse Station, Chief Dashboard, Users
- Bilingual UI (AR / EN) with full RTL support
- Simulated AI Clinical Assistant with allergy cross-check
- Simulated CCHI eligibility & pre-authorization
- Realistic Saudi seed data (20 patients, 10 doctors, 5 insurers)

## Run locally (Node)

```bash
npm install
npm run dev
```

Open http://localhost:5173 (Vite will pick another port if 5173 is in use).

## Run with Docker

```bash
docker-compose up --build
# Then open http://localhost:3000
```

The image is a multi-stage build: stage 1 compiles the Vite bundle, stage 2 serves it via Nginx with an SPA fallback so React Router works on hard refreshes.

To stop:

```bash
docker-compose down
```

## Demo accounts

All passwords: `Admin@123`

| Role | Email |
|---|---|
| admin | admin@hospital.com |
| doctor | doctor@hospital.com |
| chief_doctor | chief@hospital.com |
| nurse | nurse@hospital.com |
| receptionist | reception@hospital.com |
| pharmacist | pharmacist@hospital.com |
| lab_tech | lab@hospital.com |
| finance | finance@hospital.com |
| cashier | cashier@hospital.com |
| insurance_approval | insurance@hospital.com |

## Project structure

```
src/
  components/     Layout, Sidebar, TopBar, PatientSearch, TokenDisplay, AIAssistant
  pages/          Login, Dashboard, PatientRegistration, Appointments, Queue,
                  DoctorDashboard, PatientFile, Pharmacy, Lab, Insurance,
                  Billing, Cashier, Finance, NurseStation, ChiefDashboard, Users
  data/           seed.js, storage.js
  i18n/           en.json, ar.json, index.js
  App.jsx, main.jsx
```

## Tech

React 19 · Vite · Tailwind CSS 3 · React Router · react-i18next · lucide-react · Recharts
