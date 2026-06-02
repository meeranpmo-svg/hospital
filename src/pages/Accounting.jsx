import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator, BookOpen, FileText, ArrowRightLeft, Plus, TrendingUp, TrendingDown, Trash2, Save } from 'lucide-react';
import { loadState, saveState, uid } from '../data/storage';

export default function Accounting() {
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState('coa');
  const [, force] = useState(0);
  const refresh = () => force(x => x + 1);

  const state = loadState();

  // Totals from CoA
  const totals = state.accounts.reduce((acc, a) => {
    acc[a.type] = (acc[a.type] || 0) + a.balance;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-amber-700 to-yellow-600 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><Calculator size={24}/></div>
          <div>
            <h1 className="text-2xl font-bold">Accounting</h1>
            <p className="text-white/90 text-sm">Chart of Accounts · Journals · A/P · A/R · General Ledger</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Stat label="Assets"      value={totals.Asset}     color="emerald" />
        <Stat label="Liabilities" value={totals.Liability} color="rose" />
        <Stat label="Equity"      value={totals.Equity}    color="blue" />
        <Stat label="Revenue"     value={totals.Revenue}   color="teal" />
        <Stat label="Expenses"    value={totals.Expense}   color="amber" />
      </div>

      <div className="flex gap-2 flex-wrap">
        {[
          {k:'coa',     l: 'Chart of Accounts', icon: BookOpen},
          {k:'journal', l: 'Journal Entries',   icon: FileText},
          {k:'ap',      l: 'Accounts Payable',  icon: TrendingDown},
          {k:'ar',      l: 'Accounts Receivable',icon: TrendingUp},
        ].map(b => (
          <button key={b.k} onClick={() => setTab(b.k)} className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${tab === b.k ? 'bg-amber-700 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
            <b.icon size={16}/> {b.l}
          </button>
        ))}
      </div>

      {tab === 'coa' && <ChartOfAccounts state={state} />}
      {tab === 'journal' && <Journal state={state} refresh={refresh} />}
      {tab === 'ap' && <AccountsPayable state={state} />}
      {tab === 'ar' && <AccountsReceivable state={state} />}
    </div>
  );
}

function ChartOfAccounts({ state }) {
  const { i18n } = useTranslation();
  const grouped = state.accounts.reduce((acc, a) => { (acc[a.type] = acc[a.type] || []).push(a); return acc; }, {});
  const order = ['Asset','Liability','Equity','Revenue','Expense'];
  const colors = { Asset:'emerald', Liability:'rose', Equity:'blue', Revenue:'teal', Expense:'amber' };
  return (
    <div className="space-y-4">
      {order.map(type => grouped[type] && (
        <div key={type} className="card">
          <h3 className={`font-semibold mb-3 text-${colors[type]}-700`}>{type}s</h3>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-200">
                <th className="ltr:text-left rtl:text-right py-2 px-3 w-24">Code</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">Account Name</th>
                <th className="ltr:text-right rtl:text-left py-2 px-3 w-40">Balance (₹)</th>
              </tr>
            </thead>
            <tbody>
              {grouped[type].map(a => (
                <tr key={a.code} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 px-3 font-mono text-sm">{a.code}</td>
                  <td className="py-2 px-3">
                    <div className="font-medium text-slate-800">{a.name}</div>
                    {i18n.language === 'ar' && <div className="text-xs text-slate-500" dir="rtl">{a.nameAr}</div>}
                  </td>
                  <td className={`py-2 px-3 ltr:text-right rtl:text-left font-semibold text-${colors[type]}-700`}>{a.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function Journal({ state, refresh }) {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [desc, setDesc] = useState('');
  const [lines, setLines] = useState([{ acct: '1000', dr: 0, cr: 0 }, { acct: '4000', dr: 0, cr: 0 }]);

  const totalDr = lines.reduce((s, l) => s + Number(l.dr || 0), 0);
  const totalCr = lines.reduce((s, l) => s + Number(l.cr || 0), 0);
  const balanced = totalDr === totalCr && totalDr > 0;

  const addLine = () => setLines([...lines, { acct: '1000', dr: 0, cr: 0 }]);
  const remLine = (i) => setLines(lines.filter((_, idx) => idx !== i));
  const setLine = (i, k, v) => setLines(lines.map((l, idx) => idx === i ? { ...l, [k]: v } : l));

  const post = () => {
    if (!balanced) return alert('Entry must be balanced (DR = CR)');
    if (!desc) return alert('Description required');
    const s = loadState();
    const ref = `JE-2026-${String(s.journalEntries.length + 1).padStart(3,'0')}`;
    s.journalEntries.push({
      id: uid('je'), date, ref, desc,
      lines: lines.map(l => ({ acct: l.acct, dr: Number(l.dr), cr: Number(l.cr) })),
      postedBy: 'u11',
    });
    // Apply to balances
    lines.forEach(l => {
      const acct = s.accounts.find(a => a.code === l.acct);
      if (!acct) return;
      const sign = (acct.type === 'Asset' || acct.type === 'Expense') ? 1 : -1;
      acct.balance += sign * (Number(l.dr) - Number(l.cr));
    });
    saveState(s);
    setShowForm(false);
    setDesc(''); setLines([{ acct: '1000', dr: 0, cr: 0 }, { acct: '4000', dr: 0, cr: 0 }]);
    refresh();
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-800">Journal Entries</h3>
        <button onClick={() => setShowForm(!showForm)} className="btn bg-amber-700 text-white hover:bg-amber-800"><Plus size={16}/> New Entry</button>
      </div>

      {showForm && (
        <div className="mb-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div><label className="label">Date</label><input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} /></div>
            <div className="md:col-span-2"><label className="label">Description</label><input className="input" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Cashier daily collection, drug purchase, ..."/></div>
          </div>
          <div className="space-y-2">
            {lines.map((l, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-6">
                  <select className="input" value={l.acct} onChange={e => setLine(i,'acct',e.target.value)}>
                    {state.accounts.map(a => <option key={a.code} value={a.code}>{a.code} - {a.name}</option>)}
                  </select>
                </div>
                <div className="col-span-2"><input type="number" className="input" placeholder="DR" value={l.dr || ''} onChange={e => setLine(i,'dr',e.target.value)} /></div>
                <div className="col-span-2"><input type="number" className="input" placeholder="CR" value={l.cr || ''} onChange={e => setLine(i,'cr',e.target.value)} /></div>
                <div className="col-span-2 flex"><button onClick={() => remLine(i)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 size={16}/></button></div>
              </div>
            ))}
          </div>
          <button onClick={addLine} className="btn btn-ghost text-sm mt-2"><Plus size={14}/> Add Line</button>

          <div className="mt-3 flex items-center justify-between p-3 rounded-lg bg-white">
            <div className="text-sm">Total DR: <b>{totalDr.toLocaleString()}</b> · Total CR: <b>{totalCr.toLocaleString()}</b></div>
            <div className={`text-sm font-semibold ${balanced ? 'text-emerald-700' : 'text-rose-700'}`}>{balanced ? '✓ Balanced' : '✗ Not balanced'}</div>
          </div>
          <button onClick={post} disabled={!balanced} className="btn bg-amber-700 text-white hover:bg-amber-800 mt-3 disabled:opacity-50"><Save size={16}/> Post Entry</button>
        </div>
      )}

      <table className="w-full">
        <thead>
          <tr className="text-xs text-slate-500 border-b border-slate-200">
            <th className="ltr:text-left rtl:text-right py-2 px-3">Date</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Reference</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Description</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Lines</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Amount</th>
          </tr>
        </thead>
        <tbody>
          {state.journalEntries.slice().reverse().map(je => {
            const total = je.lines.reduce((s, l) => s + l.dr, 0);
            return (
              <tr key={je.id} className="border-b border-slate-100 hover:bg-slate-50 align-top">
                <td className="py-3 px-3 text-sm">{je.date}</td>
                <td className="py-3 px-3 text-sm font-mono">{je.ref}</td>
                <td className="py-3 px-3 text-sm">{je.desc}</td>
                <td className="py-3 px-3 text-xs">
                  {je.lines.map((l, i) => {
                    const acct = state.accounts.find(a => a.code === l.acct);
                    return (
                      <div key={i} className="flex justify-between gap-3">
                        <span>{l.acct} - {acct?.name}</span>
                        <span className={l.dr > 0 ? 'text-emerald-700' : 'text-blue-700'}>{l.dr > 0 ? `Dr ${l.dr.toLocaleString()}` : `Cr ${l.cr.toLocaleString()}`}</span>
                      </div>
                    );
                  })}
                </td>
                <td className="py-3 px-3 ltr:text-right rtl:text-left font-semibold">{total.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function AccountsPayable({ state }) {
  const totalAP = state.vendors.reduce((s, v) => s + v.balance, 0);
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-800">Accounts Payable — Vendor Balances</h3>
        <div className="text-sm">Total: <b className="text-rose-700">{totalAP.toLocaleString()}</b></div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-xs text-slate-500 border-b border-slate-200">
            <th className="ltr:text-left rtl:text-right py-2 px-3">Vendor</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Category</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Payment Terms</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Outstanding</th>
          </tr>
        </thead>
        <tbody>
          {state.vendors.filter(v => v.balance > 0).map(v => (
            <tr key={v.id} className="border-b border-slate-100 hover:bg-slate-50">
              <td className="py-2 px-3"><div className="font-medium">{v.name}</div><div className="text-xs text-slate-500">{v.contact} · {v.phone}</div></td>
              <td className="py-2 px-3 text-sm">{v.category}</td>
              <td className="py-2 px-3 text-sm">{v.paymentTerms}</td>
              <td className="py-2 px-3 ltr:text-right rtl:text-left font-semibold text-rose-700">{v.balance.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AccountsReceivable({ state }) {
  const pending = state.bills.filter(b => b.status === 'pending');
  const totalAR = pending.reduce((s, b) => s + b.patientPays + b.insuranceCovered, 0);
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-800">Accounts Receivable — Outstanding Bills + Claims</h3>
        <div className="text-sm">Total: <b className="text-emerald-700">{totalAR.toLocaleString()}</b></div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-xs text-slate-500 border-b border-slate-200">
            <th className="ltr:text-left rtl:text-right py-2 px-3">Date</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Patient</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Insurance Pending</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Patient Pending</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Total</th>
          </tr>
        </thead>
        <tbody>
          {pending.map(b => {
            const p = state.patients.find(x => x.id === b.patientId);
            return (
              <tr key={b.id} className="border-b border-slate-100">
                <td className="py-2 px-3 text-sm">{b.date}</td>
                <td className="py-2 px-3 font-medium">{p?.name}</td>
                <td className="py-2 px-3 text-teal-700">{b.insuranceCovered.toLocaleString()}</td>
                <td className="py-2 px-3 text-amber-700">{b.patientPays.toLocaleString()}</td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left font-semibold">{(b.patientPays + b.insuranceCovered).toLocaleString()}</td>
              </tr>
            );
          })}
          {pending.length === 0 && <tr><td colSpan={5} className="text-center py-6 text-slate-500">No outstanding receivables</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function Stat({ label, value, color }) {
  const map = {
    emerald: 'from-emerald-500 to-teal-600',
    rose:    'from-rose-500    to-red-600',
    blue:    'from-blue-500    to-indigo-600',
    teal:    'from-teal-500    to-cyan-600',
    amber:   'from-amber-500   to-yellow-600',
  };
  return (
    <div className="card relative overflow-hidden">
      <div className={`absolute inset-y-0 ltr:left-0 rtl:right-0 w-1 bg-gradient-to-b ${map[color]}`} />
      <div className="text-lg font-bold">{(value || 0).toLocaleString()}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label} (₹)</div>
    </div>
  );
}
