import { useTranslation } from 'react-i18next';
import { BarChart3, TrendingUp, AlertCircle, FileText } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { loadState } from '../data/storage';
import { INSURANCE_COMPANIES } from '../data/seed';

export default function Finance() {
  const { t } = useTranslation();
  const state = loadState();

  const totalRevenue   = state.bills.reduce((s, b) => s + b.total, 0);
  const insuredRevenue = state.bills.reduce((s, b) => s + b.insuranceCovered, 0);
  const patientRevenue = state.bills.reduce((s, b) => s + b.patientPays, 0);
  const outstanding    = state.bills.filter(b => b.status === 'pending').reduce((s, b) => s + b.patientPays, 0);

  const monthly = [
    { m: 'Nov', revenue: 142000, claims: 88000 },
    { m: 'Dec', revenue: 156000, claims: 102000 },
    { m: 'Jan', revenue: 168000, claims: 110000 },
    { m: 'Feb', revenue: 174000, claims: 115000 },
    { m: 'Mar', revenue: 188000, claims: 122000 },
    { m: 'Apr', revenue: totalRevenue || 195000, claims: insuredRevenue || 130000 },
  ];

  const insurerData = state.bills.reduce((acc, b) => {
    const p = state.patients.find(x => x.id === b.patientId);
    const c = p?.insurance?.company || 'self';
    acc[c] = (acc[c] || 0) + b.insuranceCovered;
    return acc;
  }, {});
  const insurerChart = Object.entries(insurerData).map(([k, v]) => ({
    name: INSURANCE_COMPANIES.find(c => c.key === k)?.name || 'Self-Pay',
    value: v,
  }));
  const COLORS = ['#0d9488', '#3b82f6', '#a855f7', '#f97316', '#ec4899', '#10b981'];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-yellow-700 to-amber-700 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><BarChart3 size={24}/></div>
          <div>
            <h1 className="text-2xl font-bold">{t('nav.finance')}</h1>
            <p className="text-white/90 text-sm">Revenue analytics · Outstanding · Insurance claims</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Total Revenue"        value={`${totalRevenue.toLocaleString()} SAR`}   color="emerald" />
        <Stat label="Insurance Covered"    value={`${insuredRevenue.toLocaleString()} SAR`} color="teal" />
        <Stat label="Patient Co-pay"       value={`${patientRevenue.toLocaleString()} SAR`} color="amber" />
        <Stat label="Outstanding"          value={`${outstanding.toLocaleString()} SAR`}    color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-2">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><TrendingUp size={16} className="text-emerald-600"/> Revenue vs. Insurance Claims (6 months)</h3>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="m" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
                <Line type="monotone" dataKey="claims"  stroke="#0d9488" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-3">Claims by Insurer</h3>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={insurerChart} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={(d) => d.name}>
                  {insurerChart.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><AlertCircle size={16} className="text-rose-600"/> Outstanding Bills</h3>
        <table className="w-full">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-slate-200">
              <th className="ltr:text-left rtl:text-right py-2 px-3">Date</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Patient</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Total</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Patient Owes</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Aging</th>
            </tr>
          </thead>
          <tbody>
            {state.bills.filter(b => b.status === 'pending').map(b => {
              const p = state.patients.find(x => x.id === b.patientId);
              return (
                <tr key={b.id} className="border-b border-slate-100">
                  <td className="py-2 px-3 text-sm">{b.date}</td>
                  <td className="py-2 px-3 font-medium">{p?.name}</td>
                  <td className="py-2 px-3">{b.total} SAR</td>
                  <td className="py-2 px-3 text-amber-700 font-semibold">{b.patientPays} SAR</td>
                  <td className="py-2 px-3"><span className="badge badge-warning">0-30 days</span></td>
                </tr>
              );
            })}
            {state.bills.filter(b => b.status === 'pending').length === 0 && (
              <tr><td colSpan={5} className="text-center py-6 text-slate-500">No outstanding bills</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><FileText size={16}/> Insurance Claims Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {INSURANCE_COMPANIES.map(c => {
            const sum = state.bills.reduce((s, b) => {
              const p = state.patients.find(x => x.id === b.patientId);
              if (p?.insurance?.company === c.key) return s + b.insuranceCovered;
              return s;
            }, 0);
            return (
              <div key={c.key} className="p-3 rounded-lg bg-teal-50 border border-teal-200">
                <div className="font-medium text-teal-800">{c.name}</div>
                <div className="text-xs text-slate-500" dir="rtl">{c.nameAr}</div>
                <div className="text-2xl font-bold text-teal-700 mt-1">{sum.toLocaleString()} SAR</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  const map = {
    emerald: 'from-emerald-500 to-teal-600',
    teal:    'from-teal-500    to-cyan-600',
    amber:   'from-amber-500   to-orange-600',
    rose:    'from-rose-500    to-pink-600',
  };
  return (
    <div className="card relative overflow-hidden">
      <div className={`absolute inset-y-0 ltr:left-0 rtl:right-0 w-1 bg-gradient-to-b ${map[color]}`} />
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  );
}
