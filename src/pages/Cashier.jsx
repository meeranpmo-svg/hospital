import { useState } from 'react';
import { Wallet, Banknote, CreditCard, Smartphone, ArrowRightLeft, Printer, CheckCircle2 } from 'lucide-react';
import { loadState, saveState, uid } from '../data/storage';
import { INSURANCE_COMPANIES, HOSPITAL } from '../data/seed';

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function Cashier() {
  const [method, setMethod] = useState('cash');
  const [upiRef, setUpiRef] = useState('');
  const [receiptFor, setReceiptFor] = useState(null);
  const [, force] = useState(0);
  const refresh = () => force(x => x + 1);

  const state = loadState();
  const today = new Date().toISOString().slice(0, 10);
  const outstanding = state.bills.filter(b => b.status === 'pending');
  const todaysPayments = state.payments?.filter(p => p.date === today) || [];

  const collect = (bill) => {
    const s = loadState();
    const b = s.bills.find(x => x.id === bill.id);
    if (b) b.status = 'paid';
    s.payments = s.payments || [];
    const payment = {
      id: uid('pay'), billId: bill.id, patientId: bill.patientId,
      amount: bill.patientPays, method, upiRef: method === 'upi' ? upiRef : null,
      date: today, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      receiptNo: `RCP/${new Date().toISOString().slice(0,7).replace('-','/')}/${String((s.payments?.length || 0) + 1).padStart(5,'0')}`,
    };
    s.payments.push(payment);
    saveState(s);
    setReceiptFor({ ...payment, bill });
    setUpiRef('');
    refresh();
  };

  const totalsByMethod = todaysPayments.reduce((acc, p) => {
    acc[p.method] = (acc[p.method] || 0) + p.amount;
    return acc;
  }, {});
  const grandTotal = todaysPayments.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><Wallet size={24}/></div>
          <div>
            <h1 className="text-2xl font-bold">Cashier · Payment Collection</h1>
            <p className="text-white/90 text-sm">Cash · UPI · Card · NEFT · Auto-generate receipt · Daily cash report</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Stat label="Today's Total" value={inr(grandTotal)} color="cyan" />
        <Stat label="Cash"          value={inr(totalsByMethod.cash || 0)}    color="emerald" />
        <Stat label="UPI"           value={inr(totalsByMethod.upi || 0)}     color="purple" />
        <Stat label="Card"          value={inr(totalsByMethod.card || 0)}    color="blue" />
        <Stat label="NEFT / Transfer" value={inr(totalsByMethod.transfer || 0)} color="amber" />
      </div>

      <div className="card">
        <h3 className="font-semibold text-slate-800 mb-3">Outstanding Bills</h3>
        <div className="flex gap-2 mb-4 flex-wrap items-center">
          <span className="text-sm text-slate-500 self-center">Payment Method:</span>
          {[
            { k: 'cash',     l: 'Cash',         icon: Banknote },
            { k: 'upi',      l: 'UPI',          icon: Smartphone },
            { k: 'card',     l: 'Card',         icon: CreditCard },
            { k: 'transfer', l: 'NEFT/RTGS',    icon: ArrowRightLeft },
          ].map(m => (
            <button key={m.k} onClick={() => setMethod(m.k)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 ${method === m.k ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
              <m.icon size={14}/> {m.l}
            </button>
          ))}
          {method === 'upi' && (
            <input className="input ml-auto max-w-xs text-sm" value={upiRef} onChange={e => setUpiRef(e.target.value)} placeholder="UPI Transaction Ref (e.g. 412345678901)" />
          )}
        </div>

        {outstanding.length === 0 ? <div className="text-slate-500 text-center py-6">No outstanding bills</div> :
          <div className="space-y-2">
            {outstanding.map(b => {
              const p = state.patients.find(x => x.id === b.patientId);
              const c = INSURANCE_COMPANIES.find(x => x.key === p?.insurance?.company);
              return (
                <div key={b.id} className="p-4 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <div className="font-medium">{p?.name}</div>
                    <div className="text-xs text-slate-500">{p?.mrn} · {b.invoiceNo || b.id} · {c?.name || 'Self-Pay'} · {b.date}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Patient Pays</div>
                      <div className="font-bold text-amber-700">{inr(b.patientPays)}</div>
                    </div>
                    <button onClick={() => collect(b)} disabled={method === 'upi' && !upiRef} className="btn bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-50">
                      <CheckCircle2 size={16}/> Collect
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        }
      </div>

      <div className="card">
        <h3 className="font-semibold text-slate-800 mb-3">Daily Cash Report — {today}</h3>
        {todaysPayments.length === 0 ? <div className="text-slate-500 text-sm">No payments collected today yet</div> :
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-200">
                <th className="text-left py-2 px-3">Time</th>
                <th className="text-left py-2 px-3">Receipt No.</th>
                <th className="text-left py-2 px-3">Patient</th>
                <th className="text-left py-2 px-3">Method</th>
                <th className="text-left py-2 px-3">Reference</th>
                <th className="text-right py-2 px-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {todaysPayments.map(p => {
                const pt = state.patients.find(x => x.id === p.patientId);
                return (
                  <tr key={p.id} className="border-b border-slate-100">
                    <td className="py-2 px-3 text-sm">{p.time}</td>
                    <td className="py-2 px-3 font-mono text-xs">{p.receiptNo || p.id}</td>
                    <td className="py-2 px-3 font-medium">{pt?.name}</td>
                    <td className="py-2 px-3 capitalize">{p.method}</td>
                    <td className="py-2 px-3 text-xs text-slate-600 font-mono">{p.upiRef || '—'}</td>
                    <td className="py-2 px-3 text-right font-semibold">{inr(p.amount)}</td>
                  </tr>
                );
              })}
              <tr className="bg-slate-50 font-bold">
                <td colSpan={5} className="py-2 px-3 text-right">Total:</td>
                <td className="py-2 px-3 text-right">{inr(grandTotal)}</td>
              </tr>
            </tbody>
          </table>
        }
      </div>

      {receiptFor && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 print:p-0 print:bg-white">
          <div className="bg-white rounded-xl max-w-md w-full p-6 print:max-w-full print:rounded-none">
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <h3 className="text-xl font-bold">Payment Receipt</h3>
              <div className="text-xs text-slate-500 mt-1 font-mono">{receiptFor.receiptNo}</div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 text-center text-sm">
              <div className="font-bold text-slate-800">{HOSPITAL.name}</div>
              <div className="text-xs text-slate-600">{HOSPITAL.address}</div>
              <div className="text-xs text-slate-700 font-mono mt-1">GSTIN: {HOSPITAL.gstin}</div>
            </div>
            <div className="mt-4 p-4 bg-slate-50 rounded-lg text-sm space-y-1.5">
              <Row k="Patient" v={state.patients.find(x => x.id === receiptFor.patientId)?.name} />
              <Row k="Date / Time" v={`${receiptFor.date} · ${receiptFor.time}`} />
              <Row k="Payment Method" v={receiptFor.method.toUpperCase()} />
              {receiptFor.upiRef && <Row k="UPI Ref" v={receiptFor.upiRef} mono />}
              <Row k="Amount" v={inr(receiptFor.amount)} bold />
            </div>
            <div className="mt-4 text-xs text-center text-slate-500">
              Thank you for choosing {HOSPITAL.name}. Wishing you good health.
            </div>
            <div className="mt-4 flex gap-2 print:hidden">
              <button onClick={() => window.print()} className="btn btn-ghost flex-1 justify-center"><Printer size={16}/> Print</button>
              <button onClick={() => setReceiptFor(null)} className="btn bg-cyan-600 text-white hover:bg-cyan-700 flex-1 justify-center">Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, color }) {
  const map = {
    cyan:    'from-cyan-500    to-blue-600',
    emerald: 'from-emerald-500 to-teal-600',
    blue:    'from-blue-500    to-indigo-600',
    purple:  'from-purple-500  to-pink-600',
    amber:   'from-amber-500   to-orange-600',
  };
  return (
    <div className="card relative overflow-hidden">
      <div className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${map[color]}`} />
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  );
}

function Row({ k, v, bold, mono }) {
  return <div className="flex justify-between"><span className="text-slate-500">{k}</span><span className={`${bold ? 'font-bold' : 'font-medium'} ${mono ? 'font-mono text-xs' : ''}`}>{v}</span></div>;
}
