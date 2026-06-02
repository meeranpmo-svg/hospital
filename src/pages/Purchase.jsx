import { useState } from 'react';
import { ShoppingCart, Plus, Send, CheckCircle2, XCircle, Trash2, FileText, Eye, X } from 'lucide-react';
import { loadState, saveState, uid } from '../data/storage';
import { HOSPITAL } from '../data/seed';

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export default function Purchase() {
  const [tab, setTab] = useState('po');
  const [, force] = useState(0);
  const refresh = () => force(x => x + 1);

  const state = loadState();
  const totalPoValue = state.purchaseOrders.reduce((s, p) => s + (p.total || 0), 0);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-indigo-700 to-blue-700 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><ShoppingCart size={24}/></div>
          <div>
            <h1 className="text-2xl font-bold">Purchase Department</h1>
            <p className="text-white/90 text-sm">Vendors · Purchase Orders · GST-aware (CGST+SGST or IGST) · Approval workflow</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Total Vendors"      value={state.vendors.length}                                                color="indigo" />
        <Stat label="Open POs"           value={state.purchaseOrders.filter(p => p.status !== 'received').length}     color="blue" />
        <Stat label="Awaiting Approval"  value={state.purchaseOrders.filter(p => p.approval === 'pending').length}    color="amber" />
        <Stat label="PO Value"           value={inr(totalPoValue)}                                                    color="emerald" />
      </div>

      <div className="flex gap-2">
        <button onClick={() => setTab('po')}      className={`px-4 py-2 rounded-lg font-medium ${tab === 'po'      ? 'bg-indigo-700 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>Purchase Orders</button>
        <button onClick={() => setTab('vendors')} className={`px-4 py-2 rounded-lg font-medium ${tab === 'vendors' ? 'bg-indigo-700 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>Vendors</button>
        <button onClick={() => setTab('new')}     className={`px-4 py-2 rounded-lg font-medium ${tab === 'new'     ? 'bg-indigo-700 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>+ New PO</button>
      </div>

      {tab === 'po'      && <PurchaseOrders state={state} refresh={refresh} />}
      {tab === 'vendors' && <Vendors        state={state} />}
      {tab === 'new'     && <NewPO          state={state} refresh={refresh} setTab={setTab} />}
    </div>
  );
}

function PurchaseOrders({ state, refresh }) {
  const [view, setView] = useState(null);

  const setApproval = (id, approval) => {
    const s = loadState();
    const po = s.purchaseOrders.find(p => p.id === id);
    if (po) { po.approval = approval; if (approval === 'approved') po.status = 'sent'; }
    saveState(s); refresh();
  };

  const markReceived = (id) => {
    const s = loadState();
    const po = s.purchaseOrders.find(p => p.id === id);
    if (po) po.status = 'received';
    s.grns.push({
      id: uid('grn'), grnNo: `GRN/2026/05/${String(s.grns.length + 1).padStart(4,'0')}`,
      poId: po.id, date: new Date().toISOString().slice(0,10),
      vendorId: po.vendorId, receivedBy: 'u13', status: 'completed',
      items: po.items.map(it => ({ name: it.name, orderedQty: it.qty, receivedQty: it.qty })),
    });
    saveState(s); refresh();
  };

  return (
    <>
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-slate-200">
              <th className="text-left py-2 px-3">PO No.</th>
              <th className="text-left py-2 px-3">Date</th>
              <th className="text-left py-2 px-3">Vendor</th>
              <th className="text-right py-2 px-3">Subtotal</th>
              <th className="text-right py-2 px-3">Tax</th>
              <th className="text-right py-2 px-3">Total</th>
              <th className="text-left py-2 px-3">Approval</th>
              <th className="text-left py-2 px-3">Status</th>
              <th className="text-right py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.purchaseOrders.slice().reverse().map(po => {
              const v = state.vendors.find(x => x.id === po.vendorId);
              const tax = (po.cgst || 0) + (po.sgst || 0) + (po.igst || 0);
              const apClass = po.approval === 'approved' ? 'badge-success' : po.approval === 'rejected' ? 'badge-danger' : po.approval === 'pending' ? 'badge-warning' : 'badge-neutral';
              const stClass = po.status === 'received' ? 'badge-success' : po.status === 'sent' ? 'badge-info' : po.status === 'pending' ? 'badge-warning' : 'badge-neutral';
              return (
                <tr key={po.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 px-3 font-mono text-xs">{po.poNo}</td>
                  <td className="py-2 px-3 text-sm">{po.date}</td>
                  <td className="py-2 px-3 font-medium">{v?.name}</td>
                  <td className="py-2 px-3 text-right">{inr(po.subtotal)}</td>
                  <td className="py-2 px-3 text-right text-xs text-slate-600">{po.interState ? `IGST ${inr(po.igst)}` : `${inr((po.cgst || 0) + (po.sgst || 0))}`}</td>
                  <td className="py-2 px-3 text-right font-semibold">{inr(po.total)}</td>
                  <td className="py-2 px-3"><span className={`badge ${apClass} capitalize`}>{po.approval}</span></td>
                  <td className="py-2 px-3"><span className={`badge ${stClass} capitalize`}>{po.status}</span></td>
                  <td className="py-2 px-3 text-right">
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => setView(po)} className="p-1.5 hover:bg-slate-200 rounded" title="View"><Eye size={14}/></button>
                      {po.approval === 'pending' && <>
                        <button onClick={() => setApproval(po.id,'approved')} className="p-1.5 hover:bg-emerald-100 text-emerald-700 rounded" title="Approve"><CheckCircle2 size={14}/></button>
                        <button onClick={() => setApproval(po.id,'rejected')} className="p-1.5 hover:bg-rose-100 text-rose-700 rounded" title="Reject"><XCircle size={14}/></button>
                      </>}
                      {po.status === 'sent' && <button onClick={() => markReceived(po.id)} className="p-1.5 hover:bg-blue-100 text-blue-700 rounded" title="Mark Received"><FileText size={14}/></button>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {view && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">{view.poNo}</h3>
              <button onClick={() => setView(null)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
            </div>
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><div className="text-slate-500 text-xs">Vendor</div><div className="font-medium">{state.vendors.find(v => v.id === view.vendorId)?.name}</div></div>
                <div><div className="text-slate-500 text-xs">Date</div><div className="font-medium">{view.date}</div></div>
                <div><div className="text-slate-500 text-xs">Supply Type</div><div className="font-medium">{view.interState ? 'Inter-state (IGST)' : 'Intra-state (CGST+SGST)'}</div></div>
                <div><div className="text-slate-500 text-xs">Approval / Status</div><div className="font-medium capitalize">{view.approval} / {view.status}</div></div>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-500 border-b">
                    <th className="text-left py-2">Item</th>
                    <th className="text-right py-2 w-16">Qty</th>
                    <th className="text-right py-2 w-24">Unit ₹</th>
                    <th className="text-right py-2 w-28">Total ₹</th>
                  </tr>
                </thead>
                <tbody>
                  {view.items.map((it, i) => (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="py-2">{it.name}</td>
                      <td className="py-2 text-right">{it.qty}</td>
                      <td className="py-2 text-right">{Number(it.unitPrice).toLocaleString('en-IN')}</td>
                      <td className="py-2 text-right font-medium">{(it.qty * it.unitPrice).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-right text-sm space-y-0.5 pt-2 border-t">
                <div>Subtotal: <b>{inr(view.subtotal)}</b></div>
                {view.interState
                  ? <div>IGST: <b>{inr(view.igst)}</b></div>
                  : <>
                      <div>CGST: <b>{inr(view.cgst)}</b></div>
                      <div>SGST ({HOSPITAL.state}): <b>{inr(view.sgst)}</b></div>
                    </>}
                <div className="text-lg">Total: <b>{inr(view.total)}</b></div>
              </div>
              {view.notes && <div className="text-xs text-slate-600 p-2 bg-slate-50 rounded">"{view.notes}"</div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Vendors({ state }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-xs text-slate-500 border-b border-slate-200">
            <th className="text-left py-2 px-3">Vendor</th>
            <th className="text-left py-2 px-3">Category</th>
            <th className="text-left py-2 px-3">Contact</th>
            <th className="text-left py-2 px-3">GSTIN</th>
            <th className="text-left py-2 px-3">State</th>
            <th className="text-left py-2 px-3">Terms</th>
            <th className="text-right py-2 px-3">Outstanding</th>
          </tr>
        </thead>
        <tbody>
          {state.vendors.map(v => (
            <tr key={v.id} className="border-b border-slate-100 hover:bg-slate-50">
              <td className="py-2 px-3"><div className="font-medium">{v.name}</div><div className="text-xs text-slate-500">PAN: {v.pan}</div></td>
              <td className="py-2 px-3 text-sm"><span className="badge badge-info">{v.category}</span></td>
              <td className="py-2 px-3 text-sm">{v.contact}<div className="text-xs text-slate-500">{v.phone}</div></td>
              <td className="py-2 px-3 font-mono text-xs">{v.gstin}</td>
              <td className="py-2 px-3 text-sm">{v.state}</td>
              <td className="py-2 px-3 text-sm">{v.paymentTerms}</td>
              <td className="py-2 px-3 text-right font-semibold text-rose-700">{v.balance > 0 ? inr(v.balance) : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NewPO({ state, refresh, setTab }) {
  const [vendorId, setVendorId] = useState(state.vendors[0]?.id || '');
  const [items, setItems] = useState([{ name: '', qty: 1, unitPrice: 0 }]);
  const [notes, setNotes] = useState('');
  const [gstRate, setGstRate] = useState(12);

  const vendor = state.vendors.find(v => v.id === vendorId);
  const interState = vendor?.state !== HOSPITAL.state;

  const subtotal = items.reduce((s, i) => s + (Number(i.qty) || 0) * (Number(i.unitPrice) || 0), 0);
  const totalGstAmount = Math.round(subtotal * gstRate / 100);
  const cgst = interState ? 0 : totalGstAmount / 2;
  const sgst = interState ? 0 : totalGstAmount / 2;
  const igst = interState ? totalGstAmount : 0;
  const total = subtotal + totalGstAmount;

  const setItem = (i, k, v) => setItems(items.map((x, idx) => idx === i ? { ...x, [k]: v } : x));
  const addItem = () => setItems([...items, { name: '', qty: 1, unitPrice: 0 }]);
  const remItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  const submit = () => {
    if (items.every(x => !x.name)) return alert('Add items');
    const s = loadState();
    s.purchaseOrders.push({
      id: uid('po'),
      poNo: `PO/2026/05/${String(s.purchaseOrders.length + 1).padStart(4,'0')}`,
      vendorId, date: new Date().toISOString().slice(0,10),
      status: 'pending', approval: subtotal > 100000 ? 'pending' : 'approved',
      subtotal, cgst, sgst, igst, total, interState,
      items: items.filter(x => x.name).map(x => ({ name: x.name, qty: Number(x.qty), unitPrice: Number(x.unitPrice) })),
      requestedBy: 'u12', approvedBy: subtotal > 100000 ? null : 'u1', notes,
    });
    saveState(s);
    setTab('po'); refresh();
  };

  return (
    <div className="card">
      <h3 className="font-semibold text-slate-800 mb-4">New Purchase Order</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div><label className="label">Vendor</label>
          <select className="input" value={vendorId} onChange={e => setVendorId(e.target.value)}>
            {state.vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
          </select>
          {vendor && <div className="text-xs text-slate-500 mt-1">{vendor.state} → {HOSPITAL.state} · {interState ? '⚡ IGST applies' : 'CGST+SGST'}</div>}
        </div>
        <div><label className="label">GST Rate</label>
          <select className="input" value={gstRate} onChange={e => setGstRate(Number(e.target.value))}>
            {[0, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
          </select></div>
        <div><label className="label">Date</label><input type="date" className="input" value={new Date().toISOString().slice(0,10)} readOnly /></div>
      </div>

      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="grid grid-cols-12 gap-2">
            <input className="input col-span-7" placeholder="Item description" value={it.name} onChange={e => setItem(i,'name',e.target.value)} />
            <input type="number" className="input col-span-2" placeholder="Qty" value={it.qty} onChange={e => setItem(i,'qty',e.target.value)} />
            <input type="number" className="input col-span-2" placeholder="Unit ₹" value={it.unitPrice} onChange={e => setItem(i,'unitPrice',e.target.value)} />
            <button onClick={() => remItem(i)} className="col-span-1 p-2 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 size={16}/></button>
          </div>
        ))}
      </div>
      <button onClick={addItem} className="btn btn-ghost text-sm mt-2"><Plus size={14}/> Add Line</button>

      <div className="mt-3"><label className="label">Notes</label><textarea className="input" value={notes} onChange={e => setNotes(e.target.value)} /></div>

      <div className="mt-4 p-4 bg-slate-50 rounded-lg text-right space-y-1 text-sm">
        <div>Subtotal: <b>{inr(subtotal)}</b></div>
        {interState
          ? <div>IGST ({gstRate}%): <b>{inr(igst)}</b></div>
          : <>
              <div>CGST ({gstRate / 2}%): <b>{inr(cgst)}</b></div>
              <div>SGST ({gstRate / 2}%): <b>{inr(sgst)}</b></div>
            </>}
        <div className="text-lg pt-1 border-t border-slate-200">Total: <b>{inr(total)}</b></div>
        {subtotal > 100000 && <div className="text-xs text-amber-700 mt-1">⚠️ Over ₹1,00,000 — requires admin approval</div>}
      </div>

      <button onClick={submit} className="btn bg-indigo-700 text-white hover:bg-indigo-800 mt-3"><Send size={16}/> Submit PO</button>
    </div>
  );
}

function Stat({ label, value, color }) {
  const map = {
    indigo:  'from-indigo-500  to-blue-700',
    blue:    'from-blue-500    to-indigo-600',
    amber:   'from-amber-500   to-orange-600',
    emerald: 'from-emerald-500 to-teal-600',
  };
  return (
    <div className="card relative overflow-hidden">
      <div className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${map[color]}`} />
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}
