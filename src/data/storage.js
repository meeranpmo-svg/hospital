import {
  SEED_USERS, SEED_PATIENTS, SEED_APPOINTMENTS, DRUG_INVENTORY,
  SEED_PRESCRIPTIONS, SEED_LAB_ORDERS, SEED_VITALS, SEED_BILLS, SEED_NOTIFICATIONS,
  CHART_OF_ACCOUNTS, SEED_JOURNAL_ENTRIES,
  SEED_VENDORS, SEED_PURCHASE_ORDERS,
  SEED_WAREHOUSES, SEED_SUPPLY_ITEMS, SEED_STOCK_MOVEMENTS, SEED_GRNS,
  SEED_EMPLOYEES, SEED_ATTENDANCE, SEED_LEAVE_REQUESTS, SEED_PAYROLL,
  SEED_JOB_OPENINGS, SEED_APPLICANTS, SEED_HR_DOCUMENTS, SEED_PERFORMANCE_REVIEWS, SEED_TRAININGS,
} from './seed';

const KEY = 'hospital_erp_v3';

const initialState = () => ({
  users: SEED_USERS,
  patients: SEED_PATIENTS,
  appointments: SEED_APPOINTMENTS,
  drugs: DRUG_INVENTORY,
  prescriptions: SEED_PRESCRIPTIONS,
  labOrders: SEED_LAB_ORDERS,
  vitals: SEED_VITALS,
  bills: SEED_BILLS,
  notifications: SEED_NOTIFICATIONS,
  consultations: [],
  preAuths: [],
  payments: [],

  // Accounting
  accounts: CHART_OF_ACCOUNTS,
  journalEntries: SEED_JOURNAL_ENTRIES,

  // Purchase
  vendors: SEED_VENDORS,
  purchaseOrders: SEED_PURCHASE_ORDERS,

  // Supply Chain
  warehouses: SEED_WAREHOUSES,
  supplyItems: SEED_SUPPLY_ITEMS,
  stockMovements: SEED_STOCK_MOVEMENTS,
  grns: SEED_GRNS,

  // HR
  employees: SEED_EMPLOYEES,
  attendance: SEED_ATTENDANCE,
  leaveRequests: SEED_LEAVE_REQUESTS,
  payroll: SEED_PAYROLL,
  jobOpenings: SEED_JOB_OPENINGS,
  applicants: SEED_APPLICANTS,
  hrDocuments: SEED_HR_DOCUMENTS,
  performanceReviews: SEED_PERFORMANCE_REVIEWS,
  trainings: SEED_TRAININGS,
});

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const init = initialState();
      localStorage.setItem(KEY, JSON.stringify(init));
      return init;
    }
    return JSON.parse(raw);
  } catch (e) {
    const init = initialState();
    localStorage.setItem(KEY, JSON.stringify(init));
    return init;
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function resetState() {
  localStorage.removeItem(KEY);
  return loadState();
}

export function update(mutator) {
  const state = loadState();
  mutator(state);
  saveState(state);
  return state;
}

export const uid = (prefix = 'id') =>
  `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

// Auth
const SESSION_KEY = 'hospital_erp_session';
export function login(email, password) {
  const state = loadState();
  const user = state.users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, role: user.role, via: 'standalone' }));
    return user;
  }
  return null;
}
// Azure AD / Microsoft 365 mock SSO — picks user by email match (no password)
export function ssoLogin(email) {
  const state = loadState();
  const user = state.users.find(u => u.email === email);
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, role: user.role, via: 'azure_ad' }));
    return user;
  }
  return null;
}
export function currentUser() {
  try {
    const sess = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    if (!sess) return null;
    return loadState().users.find(u => u.id === sess.userId) || null;
  } catch { return null; }
}
export function authVia() {
  try {
    const sess = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    return sess?.via || null;
  } catch { return null; }
}
export function logout() { localStorage.removeItem(SESSION_KEY); }

// Auth provider configuration (standalone | azure_ad)
const AUTH_PROVIDER_KEY = 'hospital_auth_provider';
const AUTH_CONFIG_KEY   = 'hospital_auth_config';

export function getAuthProvider() {
  return localStorage.getItem(AUTH_PROVIDER_KEY) || 'standalone';
}
export function setAuthProvider(provider) {
  localStorage.setItem(AUTH_PROVIDER_KEY, provider);
}
export function getAuthConfig() {
  try { return JSON.parse(localStorage.getItem(AUTH_CONFIG_KEY) || '{}'); }
  catch { return {}; }
}
export function setAuthConfig(cfg) {
  localStorage.setItem(AUTH_CONFIG_KEY, JSON.stringify(cfg));
}
