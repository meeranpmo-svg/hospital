import { useState } from 'react';
import { Receipt, Plus, Trash2, FileText, Printer, X } from 'lucide-react';
import PatientSearch from '../components/PatientSearch';
import { loadState, saveState, uid } from '../data/storage';
import { INSURANCE_COMPANIES, HOSPITAL } from '../data/seed';

// Common service catalogue with HSN/SAC + GST rate.
// Per Notification 12/2017, healthcare services by clinical establishments are GST-EXEMPT.
// Medicines (HSN 3004) attract 5% or 12% GST. Equipment varies.
const CATALOGUE = [
  { desc: 'Consultation — OPD',           sacOrHsn: '999312', gstRate: 0 },
  { desc: 'Consultation — Specialist',    sacOrHsn: '999312', gstRate: 0 },
  { desc: 'Consultation — Casualty/ER',   sacOrHsn: '999312', gstRate: 0 },
  { desc: 'Lab Test — Pathology',         sacOrHsn: '9993',   gstRate: 0 },
  { desc: 'Lab Test — Radiology',         sacOrHsn: '9993',   gstRate: 0 },
  { desc: 'ECG',                          sacOrHsn: '9993',   gstRate: 0 },
  { desc: 'Day-Care Procedure',           sacOrHsn: '999316', gstRate: 0 },
  { desc: 'Surgery / OT Charges',         sacOrHsn: '999316', gstRate: 0 },
  { desc: 'Inpatient Room — General',     sacOrHsn: '999319', gstRate: 0 },
  { desc: 'Inpatient Room — A/C / Pvt',   sacOrHsn: '999319', gstRate: 0 },
  { desc: 'Medicine (Schedule I)',        sacOrHsn: '3004',   gstRate: 5 },
  { desc: 'Medicine (Other)',             sacOrHsn: '3004',   gstRate: 12 },
  { desc: 'Surgical Consumables',         sacOrHsn: '9018',   gstRate: 12 },
];

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function Billing() {
  const [patient, setPatient] = useState(null);
  const [patientGstin, setPatientGstin] = useState('');
  const [items, setItems] = useState([{ desc: 'Consultation — OPD', sacOrHsn: '999312', qty: 1, rate: 500, gstRate: 0 }]);
  const [coverage, setCoverage] = useState(80);
  const [interState, setInterState] = useState(false);
  const [viewBill, setViewBill] = useState(null);
  const [, force] = useState(0);
  const refresh = () => force(x => x + 1);

  const state = loadState();

  const setItem = (i, k, v) => setItems(items.map((x, idx) => idx === i ? { ...x, [k]: v } : x));
  const addItem = () => setItems([...items, { desc: '', sacOrHsn: '999312', qty: 1, rate: 0, gstRate: 0 }]);
  const remItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  const pickCatalogue = (i, descKey) => {
    const c = CATALOGUE.find(x => x.desc === descKey);
    if (c) setItems(items.map((x, idx) => idx === i ? { ...x, desc: c.desc, sacOrHsn: c.sacOrHsn, gstRate: c.gstRate } : x));
  };

  // Calc per-line + totals
  const enriched = items.map(it => {
    const amount = Number(it.qty || 0) * Number(it.rate || 0);
    const taxBase = amount;
    const cgst = interState ? 0 : (taxBase * it.gstRate) / 200;  // split half-half
    const sgst = interState ? 0 : (taxBase * it.gstRate) / 200;
    const igst = interState ? (taxBase * it.gstRate) / 100 : 0;
    return { ...it, amount, cgst, sgst, igst, total: amount + cgst + sgst + igst };
  });

  const subtotal  = enriched.reduce((s, it) => s + it.amount, 0);
  const totalCgst = enriched.reduce((s, it) => s + it.cgst, 0);
  const totalSgst = enriched.reduce((s, it) => s + it.sgst, 0);
  const totalIgst = enriched.reduce((s, it) => s + it.igst, 0);
  const grandTotal = subtotal + totalCgst + totalSgst + totalIgst;
  const insCov = (grandTotal * coverage) / 100;
  const patientPays = grandTotal - insCov;

  const allExempt = enriched.every(it => it.gstRate === 0);
  const invoiceType = allExempt ? 'bill_of_supply' : 'tax_invoice';

  const generate = () => {
    if (!patient || items.every(x => !x.desc)) return alert('Add patient and items');
    const s = loadState();
    const month = new Date().toISOString().slice(0, 7).replace('-', '/');
    const invoiceNo = `JH/${month}/${String(s.bills.length + 1).padStart(5, '0')}`;
    s.bills.push({
      id: uid('b'), patientId: patient.id,
      date: new Date().toISOString().slice(0, 10),
      invoiceNo, invoiceType,
      placeOfSupply: interState ? 'Out-of-state' : `${HOSPITAL.stateCode}-${HOSPITAL.state}`,
      patientGstin: patientGstin || null,
      items: enriched.map(it => ({ desc: it.desc, sacOrHsn: it.sacOrHsn, qty: Number(it.qty), rate: Number(it.rate), amount: it.amount, gstRate: it.gstRate, cgst: it.cgst, sgst: it.sgst, igst: it.igst, total: it.total })),
      subtotal, totalCgst, totalSgst, totalIgst, total: grandTotal,
      insuranceCovered: insCov, patientPays, status: 'pending',
    });
    saveState(s);
    setItems([{ desc: 'Consultation — OPD', sacOrHsn: '999312', qty: 1, rate: 500, gstRate: 0 }]);
    setPatientGstin('');
    refresh();
    alert(`${invoiceType === 'tax_invoice' ? 'Tax Invoice' : 'Bill of Supply'} generated: ${invoiceNo}`);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-rose-600 to-orange-600 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><Receipt size={24}/></div>
          <div>
            <h1 className="text-2xl font-bold">Billing</h1>
            <p className="text-white/90 text-sm">GST-compliant Tax Invoice / Bill of Supply · HSN/SAC · CGST + SGST / IGST split</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1"><PatientSearch onSelect={setPatient} /></div>

        <div className="lg:col-span-2 card">
          <h3 className="font-semibold text-slate-800 mb-3">Generate Bill</h3>
          {patient && (
            <div className="p-3 rounded-lg bg-slate-50 mb-4 flex justify-between flex-wrap gap-2">
              <div>
                <div className="font-medium">{patient.name}</div>
                <div className="text-xs text-slate-500">{patient.mrn} · {INSURANCE_COMPANIES.find(c => c.key === patient.insurance?.company)?.name || 'Self-Pay'}</div>
              </div>
              {patient.abha && <div className="text-xs text-slate-600">ABHA: <span className="font-mono">{patient.abha}</span></div>}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="label text-xs">Patient GSTIN (only for corporate / B2B)</label>
              <input className="input font-mono text-sm" value={patientGstin} onChange={e => setPatientGstin(e.target.value)} placeholder="15-digit GSTIN (optional)" maxLength={15} />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={interState} onChange={e => setInterState(e.target.checked)} className="w-4 h-4" />
                <span className="text-sm">Inter-state supply (use IGST instead of CGST+SGST)</span>
              </label>
            </div>
          </div>

          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b">
                  <th className="text-left py-2 px-2">Description</th>
                  <th className="text-left py-2 px-2 w-20">HSN/SAC</th>
                  <th className="text-right py-2 px-2 w-16">Qty</th>
                  <th className="text-right py-2 px-2 w-20">Rate ₹</th>
                  <th className="text-right py-2 px-2 w-16">GST%</th>
                  <th className="text-right py-2 px-2 w-24">Total ₹</th>
                  <th className="w-8"></th>
                </tr>
              </thead>
              <tbody>
                {enriched.map((it, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-1 px-2">
                      <input list={`cat-${i}`} className="input" value={it.desc} onChange={e => { setItem(i, 'desc', e.target.value); pickCatalogue(i, e.target.value); }} placeholder="Service / item name" />
                      <datalist id={`cat-${i}`}>
                        {CATALOGUE.map((c, k) => <option key={k} value={c.desc} />)}
                      </datalist>
                    </td>
                    <td className="py-1 px-2"><input className="input font-mono text-xs" value={it.sacOrHsn} onChange={e => setItem(i, 'sacOrHsn', e.target.value)} /></td>
                    <td className="py-1 px-2"><input type="number" min="1" className="input text-right" value={it.qty} onChange={e => setItem(i, 'qty', e.target.value)} /></td>
                    <td className="py-1 px-2"><input type="number" min="0" step="0.01" className="input text-right" value={it.rate} onChange={e => setItem(i, 'rate', e.target.value)} /></td>
                    <td className="py-1 px-2"><select className="input text-right" value={it.gstRate} onChange={e => setItem(i, 'gstRate', Number(e.target.value))}>
                      {[0, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                    </select></td>
                    <td className="py-1 px-2 text-right font-medium">{inr(it.total)}</td>
                    <td className="py-1 px-2"><button onClick={() => remItem(i)} className="p-1 text-rose-500 hover:bg-rose-50 rounded"><Trash2 size={14}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={addItem} className="btn btn-ghost text-sm mt-2"><Plus size={14}/> Add Line</button>

          <div className="mt-4 p-4 rounded-lg bg-slate-50 space-y-1.5 text-sm">
            <div className="flex justify-between"><span>Subtotal (taxable + exempt)</span><b>{inr(subtotal)}</b></div>
            {!interState && (totalCgst > 0 || totalSgst > 0) && (
              <>
                <div className="flex justify-between"><span>CGST</span><b>{inr(totalCgst)}</b></div>
                <div className="flex justify-between"><span>SGST ({HOSPITAL.state})</span><b>{inr(totalSgst)}</b></div>
              </>
            )}
            {interState && totalIgst > 0 && (
              <div className="flex justify-between"><span>IGST</span><b>{inr(totalIgst)}</b></div>
            )}
            <div className="flex justify-between text-base pt-1 border-t border-slate-200"><span>Total</span><b>{inr(grandTotal)}</b></div>
            <div className="text-xs text-slate-500">
              Document type: <b className="capitalize text-slate-700">{invoiceType.replace('_', ' ')}</b>
              {allExempt && ' — all items GST-exempt (healthcare services)'}
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-teal-50 border border-teal-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">Insurance / TPA coverage:</span>
              <input type="number" className="input max-w-[100px]" value={coverage} onChange={e => setCoverage(Number(e.target.value))} />
              <span className="text-sm">%</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm mt-2">
              <div><div className="text-slate-500 text-xs">Total</div><div className="font-bold">{inr(grandTotal)}</div></div>
              <div><div className="text-slate-500 text-xs">Insurance</div><div className="font-bold text-emerald-700">{inr(insCov)}</div></div>
              <div><div className="text-slate-500 text-xs">Patient Pays</div><div className="font-bold text-amber-700">{inr(patientPays)}</div></div>
            </div>
          </div>

          <button onClick={generate} className="btn bg-rose-600 text-white hover:bg-rose-700 mt-4"><FileText size={16}/> Generate {invoiceType === 'tax_invoice' ? 'Tax Invoice' : 'Bill of Supply'}</button>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-slate-800 mb-3">All Bills</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-200">
                <th className="text-left py-2 px-3">Invoice No.</th>
                <th className="text-left py-2 px-3">Date</th>
                <th className="text-left py-2 px-3">Patient</th>
                <th className="text-left py-2 px-3">Type</th>
                <th className="text-right py-2 px-3">Total</th>
                <th className="text-right py-2 px-3">Insurance</th>
                <th className="text-right py-2 px-3">Patient</th>
                <th className="text-left py-2 px-3">Status</th>
                <th className="text-right py-2 px-3"></th>
              </tr>
            </thead>
            <tbody>
              {state.bills.slice().reverse().map(b => {
                const p = state.patients.find(x => x.id === b.patientId);
                return (
                  <tr key={b.id} className="border-b border-slate-100">
                    <td className="py-2 px-3 font-mono text-xs">{b.invoiceNo || b.id}</td>
                    <td className="py-2 px-3 text-sm">{b.date}</td>
                    <td className="py-2 px-3 font-medium">{p?.name}</td>
                    <td className="py-2 px-3"><span className="badge badge-neutral text-xs">{(b.invoiceType || 'tax_invoice').replace('_', ' ')}</span></td>
                    <td className="py-2 px-3 text-right">{inr(b.total)}</td>
                    <td className="py-2 px-3 text-right text-emerald-700">{inr(b.insuranceCovered)}</td>
                    <td className="py-2 px-3 text-right text-amber-700">{inr(b.patientPays)}</td>
                    <td className="py-2 px-3"><span className={`badge ${b.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>{b.status}</span></td>
                    <td className="py-2 px-3 text-right"><button onClick={() => setViewBill(b)} className="btn btn-ghost text-xs">View</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {viewBill && <InvoiceView bill={viewBill} patient={state.patients.find(p => p.id === viewBill.patientId)} onClose={() => setViewBill(null)} />}
    </div>
  );
}

function InvoiceView({ bill, patient, onClose }) {
  const insurer = INSURANCE_COMPANIES.find(c => c.key === patient?.insurance?.company);
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 print:p-0 print:bg-white">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[95vh] overflow-y-auto print:max-w-full print:max-h-full print:rounded-none">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between print:hidden">
          <h3 className="font-semibold">{(bill.invoiceType || 'tax_invoice') === 'tax_invoice' ? 'Tax Invoice' : 'Bill of Supply'} · {bill.invoiceNo || bill.id}</h3>
          <div className="flex gap-2">
            <button onClick={() => window.print()} className="btn btn-ghost text-sm"><Printer size={14}/> Print</button>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
          </div>
        </div>

        <div className="p-6 print:p-8">
          <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-slate-800">
            <div>
              <div className="text-2xl font-bold text-slate-800">{HOSPITAL.name}</div>
              <div className="text-xs text-slate-600 mt-1">{HOSPITAL.address}</div>
              <div className="text-xs text-slate-600">Phone: {HOSPITAL.phone} · Email: {HOSPITAL.email}</div>
              <div className="text-xs text-slate-700 font-mono mt-1">GSTIN: {HOSPITAL.gstin} · PAN: {HOSPITAL.pan}</div>
              <div className="text-xs text-slate-600">MoH Reg: {HOSPITAL.mohRegNo} · Drug Lic: {HOSPITAL.drugLicense}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-rose-700">{(bill.invoiceType || 'tax_invoice') === 'tax_invoice' ? 'TAX INVOICE' : 'BILL OF SUPPLY'}</div>
              <div className="text-xs text-slate-600 mt-1">(Original for Recipient)</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Bill To</div>
              <div className="font-semibold">{patient?.name}</div>
              <div className="text-xs text-slate-600">MRN: {patient?.mrn}</div>
              <div className="text-xs text-slate-600">{patient?.area}, {HOSPITAL.state}</div>
              <div className="text-xs text-slate-600">Mobile: {patient?.phone}</div>
              {bill.patientGstin && <div className="text-xs text-slate-700 font-mono">GSTIN: {bill.patientGstin}</div>}
              {patient?.abha && <div className="text-xs text-slate-600">ABHA: <span className="font-mono">{patient.abha}</span></div>}
            </div>
            <div className="text-right text-sm">
              <Row k="Invoice No." v={bill.invoiceNo || bill.id} mono />
              <Row k="Date" v={bill.date} />
              <Row k="Place of Supply" v={bill.placeOfSupply || `${HOSPITAL.stateCode}-${HOSPITAL.state}`} />
              {insurer && <Row k="Insurer / TPA" v={insurer.name} />}
            </div>
          </div>

          <table className="w-full text-sm border border-slate-300">
            <thead className="bg-slate-100">
              <tr className="text-xs text-slate-700">
                <th className="text-left py-2 px-2 border-r border-slate-300">#</th>
                <th className="text-left py-2 px-2 border-r border-slate-300">Particulars</th>
                <th className="text-left py-2 px-2 border-r border-slate-300">HSN/SAC</th>
                <th className="text-right py-2 px-2 border-r border-slate-300">Qty</th>
                <th className="text-right py-2 px-2 border-r border-slate-300">Rate</th>
                <th className="text-right py-2 px-2 border-r border-slate-300">Amount</th>
                <th className="text-right py-2 px-2 border-r border-slate-300">GST%</th>
                <th className="text-right py-2 px-2 border-r border-slate-300">CGST</th>
                <th className="text-right py-2 px-2 border-r border-slate-300">SGST</th>
                <th className="text-right py-2 px-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.items.map((it, i) => (
                <tr key={i} className="border-t border-slate-200">
                  <td className="py-2 px-2 border-r border-slate-200">{i + 1}</td>
                  <td className="py-2 px-2 border-r border-slate-200">{it.desc}</td>
                  <td className="py-2 px-2 border-r border-slate-200 font-mono text-xs">{it.sacOrHsn}</td>
                  <td className="py-2 px-2 text-right border-r border-slate-200">{it.qty}</td>
                  <td className="py-2 px-2 text-right border-r border-slate-200">{Number(it.rate).toFixed(2)}</td>
                  <td className="py-2 px-2 text-right border-r border-slate-200">{Number(it.amount).toFixed(2)}</td>
                  <td className="py-2 px-2 text-right border-r border-slate-200">{it.gstRate}%</td>
                  <td className="py-2 px-2 text-right border-r border-slate-200">{Number(it.cgst).toFixed(2)}</td>
                  <td className="py-2 px-2 text-right border-r border-slate-200">{Number(it.sgst).toFixed(2)}</td>
                  <td className="py-2 px-2 text-right font-medium">{Number(it.total).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 text-sm">
              <tr><td colSpan={9} className="text-right py-1 px-2 font-medium">Subtotal:</td><td className="text-right py-1 px-2 font-medium">{Number(bill.subtotal).toFixed(2)}</td></tr>
              {(bill.totalCgst > 0) && <tr><td colSpan={9} className="text-right py-1 px-2">CGST:</td><td className="text-right py-1 px-2">{Number(bill.totalCgst).toFixed(2)}</td></tr>}
              {(bill.totalSgst > 0) && <tr><td colSpan={9} className="text-right py-1 px-2">SGST ({HOSPITAL.state}):</td><td className="text-right py-1 px-2">{Number(bill.totalSgst).toFixed(2)}</td></tr>}
              {(bill.totalIgst > 0) && <tr><td colSpan={9} className="text-right py-1 px-2">IGST:</td><td className="text-right py-1 px-2">{Number(bill.totalIgst).toFixed(2)}</td></tr>}
              <tr className="border-t-2 border-slate-800"><td colSpan={9} className="text-right py-2 px-2 font-bold text-base">GRAND TOTAL (₹):</td><td className="text-right py-2 px-2 font-bold text-base">{Number(bill.total).toFixed(2)}</td></tr>
            </tfoot>
          </table>

          <div className="mt-4 text-xs text-slate-600 italic">
            Amount in words: {numberToWordsINR(bill.total)} Only
          </div>

          {(bill.invoiceType || 'tax_invoice') === 'bill_of_supply' && (
            <div className="mt-3 p-2 rounded bg-amber-50 border border-amber-200 text-xs text-amber-800">
              ℹ️ This is a Bill of Supply — all items are GST-exempt healthcare services (Notification 12/2017, SAC 9993xx).
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
            <div>
              <div className="text-xs text-slate-500 mb-1">Terms & Conditions:</div>
              <ul className="text-xs text-slate-600 list-disc pl-5 space-y-0.5">
                <li>Payment due immediately unless covered by insurance/TPA</li>
                <li>Disputes subject to Chennai jurisdiction only</li>
                <li>Subject to e-invoicing if B2B and turnover threshold applies</li>
              </ul>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500 mb-12">For {HOSPITAL.name}</div>
              <div className="border-t border-slate-400 pt-1 text-xs">Authorised Signatory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, mono }) {
  return <div className="flex justify-end gap-2"><span className="text-slate-500">{k}:</span><span className={`font-medium ${mono ? 'font-mono text-xs' : ''}`}>{v}</span></div>;
}

// Simple Indian-style number-to-words for invoice display
function numberToWordsINR(num) {
  if (num == null) return 'Zero Rupees';
  const n = Math.floor(Number(num));
  const paise = Math.round((Number(num) - n) * 100);
  const ones = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
  const tens = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  const two = (x) => x < 20 ? ones[x] : tens[Math.floor(x/10)] + (x % 10 ? ' ' + ones[x % 10] : '');
  const three = (x) => x >= 100 ? ones[Math.floor(x/100)] + ' Hundred' + (x % 100 ? ' ' + two(x % 100) : '') : two(x);
  if (n === 0) return 'Zero Rupees' + (paise ? ` and ${two(paise)} Paise` : '');
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rem = n % 1000;
  let words = '';
  if (crore) words += two(crore) + ' Crore ';
  if (lakh) words += two(lakh) + ' Lakh ';
  if (thousand) words += two(thousand) + ' Thousand ';
  if (rem) words += three(rem);
  words = words.trim() + ' Rupees';
  if (paise) words += ` and ${two(paise)} Paise`;
  return words;
}
