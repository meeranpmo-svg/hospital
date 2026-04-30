import {
  SEED_USERS, SEED_PATIENTS, SEED_APPOINTMENTS, DRUG_INVENTORY,
  SEED_PRESCRIPTIONS, SEED_LAB_ORDERS, SEED_VITALS, SEED_BILLS, SEED_NOTIFICATIONS,
} from './seed';

const KEY = 'hospital_erp_v1';

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
    localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, role: user.role }));
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
export function logout() { localStorage.removeItem(SESSION_KEY); }
