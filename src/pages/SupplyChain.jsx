import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Boxes, Warehouse, ArrowDown, ArrowUp, Package, AlertTriangle, Plus, Save, ClipboardCheck } from 'lucide-react';
import { loadState, saveState, uid } from '../data/storage';

export default function SupplyChain() {
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState('items');
  const [, force] = useState(0);
  const refresh = () => force(x => x + 1);

  const state = loadState();
  const lowStock = state.supplyItems.filter(i => i.stock < i.reorder);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-lime-700 to-green-700 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><Boxes size={24}/></div>
          <div>
            <h1 className="text-2xl font-bold">Supply Chain</h1>
            <p className="text-white/90 text-sm">Inventory · Warehouses · Stock movements · Goods Received Notes</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Total SKUs"      value={state.supplyItems.length}                                         color="lime" />
        <Stat label="Warehouses"      value={state.warehouses.length}                                          color="green" />
        <Stat label="Low Stock Items" value={lowStock.length}                                                  color="rose" />
        <Stat label="Inventory Value" value={`${state.supplyItems.reduce((s, i) => s + i.stock * i.unitCost, 0).toLocaleString()} SAR`} color="emerald" />
      </div>

      {lowStock.length > 0 && (
        <div className="card border-l-4 border-l-rose-500 bg-rose-50">
          <div className="flex items-center gap-2 text-rose-800 font-semibold mb-2"><AlertTriangle size={18}/> {lowStock.length} item(s) below reorder level</div>
          <div className="flex flex-wrap gap-2">
            {lowStock.map(i => (
              <span key={i.id} className="badge badge-danger">{i.name} — {i.stock}/{i.reorder}</span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {[
          { k: 'items',      l: 'Inventory Items', icon: Package },
          { k: 'warehouses', l: 'Warehouses',      icon: Warehouse },
          { k: 'movements',  l: 'Stock Movements', icon: ArrowDown },
          { k: 'grn',        l: 'GRNs',            icon: ClipboardCheck },
          { k: 'issue',      l: '+ Stock Issue',   icon: ArrowUp },
        ].map(b => (
          <button key={b.k} onClick={() => setTab(b.k)} className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${tab === b.k ? 'bg-lime-700 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
            <b.icon size={16}/> {b.l}
          </button>
        ))}
      </div>

      {tab === 'items'      && <Items       state={state} />}
      {tab === 'warehouses' && <Warehouses  state={state} />}
      {tab === 'movements'  && <Movements   state={state} />}
      {tab === 'grn'        && <GRNs        state={state} />}
      {tab === 'issue'      && <NewIssue    state={state} refresh={refresh} setTab={setTab} />}
    </div>
  );
}

function Items({ state }) {
  const [whFilter, setWhFilter] = useState('all');
  const items = whFilter === 'all' ? state.supplyItems : state.supplyItems.filter(i => i.whId === whFilter);
  return (
    <div className="card">
      <div className="flex flex-wrap gap-2 mb-3">
        <button onClick={() => setWhFilter('all')} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${whFilter === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'}`}>All Warehouses</button>
        {state.warehouses.map(w => (
          <button key={w.id} onClick={() => setWhFilter(w.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${whFilter === w.id ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'}`}>{w.name}</button>
        ))}
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-xs text-slate-500 border-b border-slate-200">
            <th className="ltr:text-left rtl:text-right py-2 px-3">SKU</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Item</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Category</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Warehouse</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Stock</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Reorder</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Unit Cost</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Value</th>
          </tr>
        </thead>
        <tbody>
          {items.map(i => {
            const wh = state.warehouses.find(w => w.id === i.whId);
            const low = i.stock < i.reorder;
            return (
              <tr key={i.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-2 px-3 font-mono text-sm">{i.sku}</td>
                <td className="py-2 px-3"><div className="font-medium">{i.name}</div><div className="text-xs text-slate-500" dir="rtl">{i.nameAr}</div></td>
                <td className="py-2 px-3 text-sm">{i.category}</td>
                <td className="py-2 px-3 text-sm">{wh?.name}</td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left"><span className={`badge ${low ? 'badge-danger' : 'badge-success'}`}>{i.stock} {i.unit}</span></td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left text-sm text-slate-600">{i.reorder}</td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left text-sm">{i.unitCost.toFixed(2)}</td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left font-semibold">{(i.stock * i.unitCost).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Warehouses({ state }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {state.warehouses.map(w => {
        const items = state.supplyItems.filter(i => i.whId === w.id);
        const value = items.reduce((s, i) => s + i.stock * i.unitCost, 0);
        return (
          <div key={w.id} className="card border-l-4 border-l-lime-500">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-800">{w.name}</h3>
                <div className="text-xs text-slate-500" dir="rtl">{w.nameAr}</div>
                <div className="text-sm text-slate-600 mt-1">{w.location}</div>
                <div className="text-xs text-slate-500">Manager: {w.manager}</div>
              </div>
              <div className="ltr:text-right rtl:text-left">
                <div className="text-2xl font-bold text-lime-700">{items.length}</div>
                <div className="text-xs text-slate-500">SKUs</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm text-slate-500">Inventory value</span>
              <span className="font-semibold text-slate-800">{value.toLocaleString()} SAR</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Movements({ state }) {
  return (
    <div className="card">
      <table className="w-full">
        <thead>
          <tr className="text-xs text-slate-500 border-b border-slate-200">
            <th className="ltr:text-left rtl:text-right py-2 px-3">Date</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Item</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Warehouse</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Type</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Qty</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Reason</th>
          </tr>
        </thead>
        <tbody>
          {state.stockMovements.slice().reverse().map(m => {
            const item = state.supplyItems.find(i => i.id === m.itemId);
            const wh   = state.warehouses.find(w => w.id === m.whId);
            return (
              <tr key={m.id} className="border-b border-slate-100">
                <td className="py-2 px-3 text-sm">{m.date}</td>
                <td className="py-2 px-3 font-medium">{item?.name}</td>
                <td className="py-2 px-3 text-sm">{wh?.name}</td>
                <td className="py-2 px-3"><span className={`badge ${m.type === 'in' ? 'badge-success' : 'badge-warning'} flex items-center gap-1 w-fit`}>{m.type === 'in' ? <ArrowDown size={12}/> : <ArrowUp size={12}/>} {m.type.toUpperCase()}</span></td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left font-semibold">{m.qty}</td>
                <td className="py-2 px-3 text-sm text-slate-600">{m.reason}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function GRNs({ state }) {
  return (
    <div className="space-y-3">
      {state.grns.map(g => {
        const v = state.vendors.find(x => x.id === g.vendorId);
        const po = state.purchaseOrders.find(x => x.id === g.poId);
        return (
          <div key={g.id} className="card border-l-4 border-l-emerald-500">
            <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
              <div>
                <div className="font-mono font-semibold">{g.grnNo}</div>
                <div className="text-xs text-slate-500">{g.date} · From {v?.name} · Linked to {po?.poNo}</div>
              </div>
              <span className="badge badge-success">{g.status}</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b">
                  <th className="ltr:text-left rtl:text-right py-2">Item</th>
                  <th className="ltr:text-right rtl:text-left py-2 w-24">Ordered</th>
                  <th className="ltr:text-right rtl:text-left py-2 w-24">Received</th>
                </tr>
              </thead>
              <tbody>
                {g.items.map((it, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-2">{it.name}</td>
                    <td className="py-2 ltr:text-right rtl:text-left">{it.orderedQty}</td>
                    <td className={`py-2 ltr:text-right rtl:text-left font-medium ${it.receivedQty < it.orderedQty ? 'text-amber-700' : 'text-emerald-700'}`}>{it.receivedQty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

function NewIssue({ state, refresh, setTab }) {
  const [itemId, setItemId]   = useState(state.supplyItems[0]?.id || '');
  const [qty, setQty]         = useState(1);
  const [reason, setReason]   = useState('');
  const item = state.supplyItems.find(i => i.id === itemId);

  const submit = () => {
    if (!item || qty < 1 || !reason) return alert('Fill all fields');
    if (qty > item.stock) return alert('Cannot issue more than available stock');
    const s = loadState();
    const it = s.supplyItems.find(x => x.id === itemId);
    it.stock -= Number(qty);
    s.stockMovements.push({
      id: uid('sm'), date: new Date().toISOString().slice(0,10),
      itemId, whId: it.whId, type: 'out', qty: Number(qty),
      reason, refType: 'Issue', userId: 'u13',
    });
    saveState(s); setTab('movements'); refresh();
  };

  return (
    <div className="card max-w-2xl">
      <h3 className="font-semibold text-slate-800 mb-4">Stock Issue (Out)</h3>
      <div className="space-y-3">
        <div><label className="label">Item</label>
          <select className="input" value={itemId} onChange={e => setItemId(e.target.value)}>
            {state.supplyItems.map(i => <option key={i.id} value={i.id}>{i.sku} · {i.name} ({i.stock} {i.unit} available)</option>)}
          </select>
        </div>
        <div><label className="label">Quantity</label><input type="number" className="input" value={qty} onChange={e => setQty(e.target.value)} min={1} max={item?.stock} /></div>
        <div><label className="label">Reason / Issue To</label><input className="input" value={reason} onChange={e => setReason(e.target.value)} placeholder="Issue to ER, OPD, daily consumption..." /></div>
        <button onClick={submit} className="btn bg-lime-700 text-white hover:bg-lime-800"><Save size={16}/> Issue Stock</button>
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  const map = {
    lime:    'from-lime-500    to-green-600',
    green:   'from-green-500   to-emerald-600',
    rose:    'from-rose-500    to-red-600',
    emerald: 'from-emerald-500 to-teal-600',
  };
  return (
    <div className="card relative overflow-hidden">
      <div className={`absolute inset-y-0 ltr:left-0 rtl:right-0 w-1 bg-gradient-to-b ${map[color]}`} />
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}
