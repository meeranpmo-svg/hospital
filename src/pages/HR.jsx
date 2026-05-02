import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  UserCog, Calendar, ClipboardList, DollarSign, CheckCircle2, XCircle, Clock, Plus, Send,
  Briefcase, FileBadge, Star, GraduationCap, AlertTriangle, ChevronRight,
} from 'lucide-react';
import { loadState, saveState, uid } from '../data/storage';

export default function HR() {
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState('employees');
  const [, force] = useState(0);
  const refresh = () => force(x => x + 1);

  const state = loadState();
  const today = new Date().toISOString().slice(0, 10);
  const todaysAttendance = state.attendance.filter(a => a.date === today);
  const presentCount = todaysAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
  const totalPayroll  = state.payroll.filter(p => p.status === 'pending').reduce((s, p) => s + p.netPay, 0);
  const expiringDocs  = (state.hrDocuments || []).filter(d => d.status === 'expiring' || d.status === 'expired').length;
  const openJobs      = (state.jobOpenings || []).filter(j => j.status === 'open').length;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-fuchsia-700 to-pink-700 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><UserCog size={24}/></div>
          <div>
            <h1 className="text-2xl font-bold">Human Resources</h1>
            <p className="text-white/90 text-sm">Employees · Attendance · Leave · Payroll · Recruitment · Documents · Performance · Training</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Stat label="Total Employees"   value={state.employees.length}                                            color="fuchsia" />
        <Stat label="Present Today"     value={`${presentCount} / ${state.employees.length}`}                     color="emerald" />
        <Stat label="Pending Leaves"    value={state.leaveRequests.filter(l => l.status === 'pending').length}    color="amber" />
        <Stat label="Pending Payroll"   value={`${totalPayroll.toLocaleString()} SAR`}                            color="blue" />
        <Stat label="Open Positions"    value={openJobs}                                                          color="indigo" />
        <Stat label="Doc Expiry Alerts" value={expiringDocs}                                                      color="rose" />
      </div>

      <div className="flex gap-2 flex-wrap">
        {[
          { k: 'employees',   l: 'Employees',    icon: UserCog },
          { k: 'attendance',  l: 'Attendance',   icon: Clock },
          { k: 'leave',       l: 'Leave',        icon: Calendar },
          { k: 'payroll',     l: 'Payroll',      icon: DollarSign },
          { k: 'recruitment', l: 'Recruitment',  icon: Briefcase },
          { k: 'documents',   l: 'Documents',    icon: FileBadge },
          { k: 'performance', l: 'Performance',  icon: Star },
          { k: 'training',    l: 'Training',     icon: GraduationCap },
        ].map(b => (
          <button key={b.k} onClick={() => setTab(b.k)} className={`px-3 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${tab === b.k ? 'bg-fuchsia-700 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
            <b.icon size={14}/> {b.l}
          </button>
        ))}
      </div>

      {tab === 'employees'   && <Employees   state={state} />}
      {tab === 'attendance'  && <Attendance  state={state} refresh={refresh} />}
      {tab === 'leave'       && <Leave       state={state} refresh={refresh} />}
      {tab === 'payroll'     && <Payroll     state={state} refresh={refresh} />}
      {tab === 'recruitment' && <Recruitment state={state} refresh={refresh} />}
      {tab === 'documents'   && <Documents   state={state} />}
      {tab === 'performance' && <Performance state={state} refresh={refresh} />}
      {tab === 'training'    && <Training    state={state} refresh={refresh} />}
    </div>
  );
}

function Employees({ state }) {
  const { i18n } = useTranslation();
  const [q, setQ] = useState('');
  const list = state.employees.filter(e =>
    !q ||
    e.name.toLowerCase().includes(q.toLowerCase()) ||
    e.empNo.toLowerCase().includes(q.toLowerCase()) ||
    e.department.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="card">
      <input className="input mb-4 max-w-md" value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name, ID, department..." />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-slate-200">
              <th className="ltr:text-left rtl:text-right py-2 px-3">Emp No.</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Name</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Department</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Designation</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Nationality</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Joined</th>
              <th className="ltr:text-right rtl:text-left py-2 px-3">Salary (SAR)</th>
              <th className="ltr:text-right rtl:text-left py-2 px-3">Leave Bal.</th>
            </tr>
          </thead>
          <tbody>
            {list.map(e => (
              <tr key={e.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-2 px-3 font-mono text-sm">{e.empNo}</td>
                <td className="py-2 px-3"><div className="font-medium">{i18n.language === 'ar' ? e.nameAr : e.name}</div><div className="text-xs text-slate-500 capitalize">{e.iqamaOrId}</div></td>
                <td className="py-2 px-3 text-sm">{e.department}</td>
                <td className="py-2 px-3 text-sm">{e.designation}</td>
                <td className="py-2 px-3 text-sm">{e.nationality}</td>
                <td className="py-2 px-3 text-sm">{e.joinDate}</td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left font-semibold">{(e.basicSalary + e.allowances).toLocaleString()}</td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left">{e.leaveBalance} d</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Attendance({ state, refresh }) {
  const { i18n } = useTranslation();
  const today = new Date().toISOString().slice(0,10);

  const clockOut = (empId) => {
    const s = loadState();
    const a = s.attendance.find(x => x.empId === empId && x.date === today);
    if (a) a.clockOut = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    saveState(s); refresh();
  };

  return (
    <div className="card overflow-x-auto">
      <h3 className="font-semibold text-slate-800 mb-3">Today's Attendance — {today}</h3>
      <table className="w-full">
        <thead>
          <tr className="text-xs text-slate-500 border-b border-slate-200">
            <th className="ltr:text-left rtl:text-right py-2 px-3">Employee</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Department</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Clock In</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Clock Out</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Status</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {state.employees.map(e => {
            const a = state.attendance.find(x => x.empId === e.id && x.date === today);
            const status = a?.status || 'absent';
            const stClass = status === 'present' ? 'badge-success' : status === 'late' ? 'badge-warning' : status === 'on_leave' ? 'badge-info' : 'badge-danger';
            return (
              <tr key={e.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-2 px-3"><div className="font-medium">{i18n.language === 'ar' ? e.nameAr : e.name}</div><div className="text-xs text-slate-500">{e.empNo}</div></td>
                <td className="py-2 px-3 text-sm">{e.department}</td>
                <td className="py-2 px-3 text-sm font-mono">{a?.clockIn || '—'}</td>
                <td className="py-2 px-3 text-sm font-mono">{a?.clockOut || '—'}</td>
                <td className="py-2 px-3"><span className={`badge ${stClass}`}>{status.replace('_',' ')}</span></td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left">
                  {a && !a.clockOut && a.clockIn && (
                    <button onClick={() => clockOut(e.id)} className="btn btn-ghost text-xs">Clock Out</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Leave({ state, refresh }) {
  const { i18n } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [empId, setEmpId] = useState(state.employees[0]?.id || '');
  const [type, setType]   = useState('annual');
  const [from, setFrom]   = useState(new Date().toISOString().slice(0,10));
  const [to, setTo]       = useState(new Date().toISOString().slice(0,10));
  const [reason, setReason] = useState('');

  const decide = (id, status) => {
    const s = loadState();
    const lr = s.leaveRequests.find(x => x.id === id);
    if (lr) { lr.status = status; lr.approvedBy = 'u14'; }
    if (status === 'approved' && lr) {
      const e = s.employees.find(x => x.id === lr.empId);
      if (e) e.leaveBalance = Math.max(0, e.leaveBalance - lr.days);
    }
    saveState(s); refresh();
  };

  const submit = () => {
    if (!from || !to || !reason) return;
    const days = Math.max(1, Math.ceil((new Date(to) - new Date(from)) / (1000*60*60*24)) + 1);
    const s = loadState();
    s.leaveRequests.push({
      id: uid('lr'), empId, type, fromDate: from, toDate: to, days,
      reason, status: 'pending', approvedBy: null,
      requestedAt: new Date().toISOString().slice(0,10),
    });
    saveState(s); setShowForm(false); setReason(''); refresh();
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-800">Leave Requests</h3>
        <button onClick={() => setShowForm(!showForm)} className="btn bg-fuchsia-700 text-white hover:bg-fuchsia-800"><Plus size={16}/> New Leave</button>
      </div>

      {showForm && (
        <div className="mb-4 p-4 rounded-lg bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="label">Employee</label>
            <select className="input" value={empId} onChange={e => setEmpId(e.target.value)}>
              {state.employees.map(e => <option key={e.id} value={e.id}>{e.empNo} · {e.name}</option>)}
            </select></div>
          <div><label className="label">Type</label>
            <select className="input" value={type} onChange={e => setType(e.target.value)}>
              <option value="annual">Annual</option><option value="sick">Sick</option><option value="casual">Casual</option><option value="emergency">Emergency</option>
            </select></div>
          <div><label className="label">From</label><input type="date" className="input" value={from} onChange={e => setFrom(e.target.value)} /></div>
          <div><label className="label">To</label><input type="date" className="input" value={to} onChange={e => setTo(e.target.value)} /></div>
          <div className="md:col-span-2"><label className="label">Reason</label><input className="input" value={reason} onChange={e => setReason(e.target.value)} /></div>
          <div className="md:col-span-2"><button onClick={submit} className="btn bg-fuchsia-700 text-white hover:bg-fuchsia-800"><Send size={16}/> Submit</button></div>
        </div>
      )}

      <table className="w-full">
        <thead>
          <tr className="text-xs text-slate-500 border-b border-slate-200">
            <th className="ltr:text-left rtl:text-right py-2 px-3">Employee</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Type</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">From</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">To</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Days</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Reason</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Status</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {state.leaveRequests.slice().reverse().map(lr => {
            const e = state.employees.find(x => x.id === lr.empId);
            const stClass = lr.status === 'approved' ? 'badge-success' : lr.status === 'rejected' ? 'badge-danger' : 'badge-warning';
            return (
              <tr key={lr.id} className="border-b border-slate-100">
                <td className="py-2 px-3"><div className="font-medium">{i18n.language === 'ar' ? e?.nameAr : e?.name}</div><div className="text-xs text-slate-500">{e?.empNo}</div></td>
                <td className="py-2 px-3 capitalize">{lr.type}</td>
                <td className="py-2 px-3 text-sm">{lr.fromDate}</td>
                <td className="py-2 px-3 text-sm">{lr.toDate}</td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left font-semibold">{lr.days}</td>
                <td className="py-2 px-3 text-sm text-slate-600">{lr.reason}</td>
                <td className="py-2 px-3"><span className={`badge ${stClass}`}>{lr.status}</span></td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left">
                  {lr.status === 'pending' && (
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => decide(lr.id, 'approved')} className="p-1.5 text-emerald-700 hover:bg-emerald-100 rounded"><CheckCircle2 size={14}/></button>
                      <button onClick={() => decide(lr.id, 'rejected')} className="p-1.5 text-rose-700 hover:bg-rose-100 rounded"><XCircle size={14}/></button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Payroll({ state, refresh }) {
  const { i18n } = useTranslation();
  const [month, setMonth] = useState('2026-05');

  const list = state.payroll.filter(p => p.month === month);
  const totals = list.reduce((acc, p) => {
    acc.basic      += p.basic;
    acc.allowances += p.allowances;
    acc.deductions += p.deductions;
    acc.gosi       += p.gosi;
    acc.netPay     += p.netPay;
    return acc;
  }, { basic:0, allowances:0, deductions:0, gosi:0, netPay:0 });

  const markPaid = (id) => {
    const s = loadState();
    const p = s.payroll.find(x => x.id === id);
    if (p) p.status = 'paid';
    saveState(s); refresh();
  };

  const months = [...new Set(state.payroll.map(p => p.month))].sort().reverse();

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h3 className="font-semibold text-slate-800">Payroll — {month}</h3>
        <select className="input max-w-[200px]" value={month} onChange={e => setMonth(e.target.value)}>
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4 text-xs">
        <div className="p-2 bg-slate-50 rounded"><div className="text-slate-500">Basic</div><div className="font-bold">{totals.basic.toLocaleString()}</div></div>
        <div className="p-2 bg-slate-50 rounded"><div className="text-slate-500">Allowances</div><div className="font-bold">{totals.allowances.toLocaleString()}</div></div>
        <div className="p-2 bg-slate-50 rounded"><div className="text-slate-500">Deductions</div><div className="font-bold text-rose-700">{totals.deductions.toLocaleString()}</div></div>
        <div className="p-2 bg-slate-50 rounded"><div className="text-slate-500">GOSI</div><div className="font-bold text-rose-700">{totals.gosi.toLocaleString()}</div></div>
        <div className="p-2 bg-fuchsia-50 rounded"><div className="text-slate-500">Net Pay</div><div className="font-bold text-fuchsia-700">{totals.netPay.toLocaleString()}</div></div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-xs text-slate-500 border-b border-slate-200">
            <th className="ltr:text-left rtl:text-right py-2 px-3">Employee</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Basic</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Allowances</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Deductions</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">GOSI</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Net Pay</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Status</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map(p => {
            const e = state.employees.find(x => x.id === p.empId);
            return (
              <tr key={p.id} className="border-b border-slate-100">
                <td className="py-2 px-3"><div className="font-medium">{i18n.language === 'ar' ? e?.nameAr : e?.name}</div><div className="text-xs text-slate-500">{e?.empNo}</div></td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left">{p.basic.toLocaleString()}</td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left">{p.allowances.toLocaleString()}</td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left text-rose-700">{p.deductions.toLocaleString()}</td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left text-rose-700">{p.gosi.toLocaleString()}</td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left font-semibold text-fuchsia-700">{p.netPay.toLocaleString()}</td>
                <td className="py-2 px-3"><span className={`badge ${p.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span></td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left">
                  {p.status === 'pending' && <button onClick={() => markPaid(p.id)} className="btn btn-ghost text-xs">Mark Paid</button>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// RECRUITMENT — Job Openings + Applicants pipeline
// ─────────────────────────────────────────────────────────────────
function Recruitment({ state, refresh }) {
  const { i18n } = useTranslation();
  const [view, setView] = useState('jobs'); // jobs | applicants
  const [activeJob, setActiveJob] = useState(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [job, setJob] = useState({ title:'', titleAr:'', department:'', type:'Full-time', openings:1, salaryRange:'', description:'' });

  const STAGES = ['applied','screening','interview','offer','hired','rejected'];
  const stageColor = {
    applied:    'bg-slate-100   text-slate-700',
    screening:  'bg-blue-100    text-blue-800',
    interview:  'bg-amber-100   text-amber-800',
    offer:      'bg-purple-100  text-purple-800',
    hired:      'bg-emerald-100 text-emerald-800',
    rejected:   'bg-rose-100    text-rose-800',
  };

  const moveStage = (apId, dir) => {
    const s = loadState();
    const ap = s.applicants.find(a => a.id === apId);
    if (!ap) return;
    const idx = STAGES.indexOf(ap.stage);
    const next = dir === 'next' ? Math.min(idx + 1, STAGES.indexOf('hired')) : Math.max(idx - 1, 0);
    ap.stage = STAGES[next];
    saveState(s); refresh();
  };
  const reject = (apId) => {
    const s = loadState();
    const ap = s.applicants.find(a => a.id === apId);
    if (ap) ap.stage = 'rejected';
    saveState(s); refresh();
  };
  const hireAsEmployee = (apId) => {
    const s = loadState();
    const ap = s.applicants.find(a => a.id === apId);
    const job = s.jobOpenings.find(j => j.id === ap?.jobId);
    if (!ap || !job) return;
    ap.stage = 'hired';
    const newEmpNo = `EMP-${String(s.employees.length + 1).padStart(3,'0')}`;
    s.employees.push({
      id: uid('em'), empNo: newEmpNo, name: ap.name, nameAr: ap.name,
      userId: null, department: job.department, designation: job.title,
      joinDate: new Date().toISOString().slice(0,10), nationality: ap.nationality,
      iqamaOrId: '—', basicSalary: parseInt(job.salaryRange.split('-')[0]) || 8000,
      allowances: 1500, status: 'active', leaveBalance: 22,
    });
    saveState(s); refresh();
    alert(`${ap.name} hired as ${newEmpNo}`);
  };

  const submitJob = () => {
    if (!job.title || !job.department) return alert('Title and department required');
    const s = loadState();
    const code = `JOB-2026-${String(s.jobOpenings.length + 1).padStart(3,'0')}`;
    s.jobOpenings.push({
      id: uid('jo'), code, ...job, openings: Number(job.openings) || 1,
      status: 'open', postedDate: new Date().toISOString().slice(0,10),
      closeDate: new Date(Date.now() + 60*86400000).toISOString().slice(0,10),
    });
    saveState(s); setShowJobForm(false);
    setJob({ title:'', titleAr:'', department:'', type:'Full-time', openings:1, salaryRange:'', description:'' });
    refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center flex-wrap">
        <button onClick={() => { setView('jobs'); setActiveJob(null); }}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${view === 'jobs' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
          <Briefcase size={14} className="inline mr-1.5"/> Job Openings
        </button>
        <button onClick={() => { setView('applicants'); setActiveJob(null); }}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${view === 'applicants' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
          <UserCog size={14} className="inline mr-1.5"/> All Applicants
        </button>
        {view === 'jobs' && (
          <button onClick={() => setShowJobForm(!showJobForm)} className="ml-auto btn bg-fuchsia-700 text-white hover:bg-fuchsia-800 text-sm">
            <Plus size={14}/> New Job Opening
          </button>
        )}
      </div>

      {view === 'jobs' && showJobForm && (
        <div className="card bg-slate-50">
          <h4 className="font-semibold mb-3">New Job Opening</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className="label">Title (English)</label><input className="input" value={job.title} onChange={e => setJob({...job, title:e.target.value})}/></div>
            <div><label className="label">Title (Arabic)</label><input className="input" value={job.titleAr} onChange={e => setJob({...job, titleAr:e.target.value})} dir="rtl"/></div>
            <div><label className="label">Department</label><input className="input" value={job.department} onChange={e => setJob({...job, department:e.target.value})}/></div>
            <div><label className="label">Type</label>
              <select className="input" value={job.type} onChange={e => setJob({...job, type:e.target.value})}>
                <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Locum</option>
              </select></div>
            <div><label className="label">Openings</label><input type="number" className="input" value={job.openings} onChange={e => setJob({...job, openings:e.target.value})}/></div>
            <div><label className="label">Salary Range (SAR)</label><input className="input" value={job.salaryRange} onChange={e => setJob({...job, salaryRange:e.target.value})} placeholder="8000-12000"/></div>
            <div className="md:col-span-2"><label className="label">Description</label><textarea className="input" value={job.description} onChange={e => setJob({...job, description:e.target.value})}/></div>
            <div className="md:col-span-2"><button onClick={submitJob} className="btn bg-fuchsia-700 text-white"><Send size={14}/> Post Opening</button></div>
          </div>
        </div>
      )}

      {view === 'jobs' && !activeJob && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.jobOpenings.map(j => {
            const aps = state.applicants.filter(a => a.jobId === j.id);
            const stClass = j.status === 'open' ? 'badge-success' : j.status === 'on_hold' ? 'badge-warning' : 'badge-neutral';
            return (
              <div key={j.id} className="card border-l-4 border-l-indigo-500 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveJob(j)}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-mono text-slate-500">{j.code}</div>
                    <h3 className="font-semibold text-slate-800 mt-1">{i18n.language === 'ar' ? j.titleAr : j.title}</h3>
                    <div className="text-xs text-slate-500">{j.department} · {j.type}</div>
                  </div>
                  <span className={`badge ${stClass}`}>{j.status.replace('_',' ')}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                  <div className="bg-indigo-50 p-2 rounded text-center"><div className="font-bold text-indigo-700">{j.openings}</div><div className="text-slate-500">Openings</div></div>
                  <div className="bg-amber-50 p-2 rounded text-center"><div className="font-bold text-amber-700">{aps.length}</div><div className="text-slate-500">Applicants</div></div>
                  <div className="bg-emerald-50 p-2 rounded text-center"><div className="font-bold text-emerald-700">{aps.filter(a => a.stage === 'hired').length}</div><div className="text-slate-500">Hired</div></div>
                </div>
                <div className="text-xs text-slate-500 mt-3">Closes: {j.closeDate} · {j.salaryRange} SAR</div>
              </div>
            );
          })}
        </div>
      )}

      {view === 'jobs' && activeJob && (
        <div className="card">
          <button onClick={() => setActiveJob(null)} className="btn btn-ghost text-sm mb-3">← Back to jobs</button>
          <h3 className="font-semibold text-slate-800">{activeJob.title} — Applicants</h3>
          <div className="text-xs text-slate-500 mb-4">{activeJob.code} · {activeJob.department} · {activeJob.salaryRange} SAR</div>
          <ApplicantTable applicants={state.applicants.filter(a => a.jobId === activeJob.id)} stageColor={stageColor} STAGES={STAGES} moveStage={moveStage} reject={reject} hire={hireAsEmployee} />
        </div>
      )}

      {view === 'applicants' && (
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-3">All Applicants — Pipeline</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-4 text-xs">
            {STAGES.map(s => (
              <div key={s} className={`p-2 rounded text-center ${stageColor[s]}`}>
                <div className="font-bold text-lg">{state.applicants.filter(a => a.stage === s).length}</div>
                <div className="capitalize">{s}</div>
              </div>
            ))}
          </div>
          <ApplicantTable applicants={state.applicants} stageColor={stageColor} STAGES={STAGES} moveStage={moveStage} reject={reject} hire={hireAsEmployee} showJob jobs={state.jobOpenings} />
        </div>
      )}
    </div>
  );
}

function ApplicantTable({ applicants, stageColor, STAGES, moveStage, reject, hire, showJob, jobs }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-xs text-slate-500 border-b border-slate-200">
            <th className="ltr:text-left rtl:text-right py-2 px-3">Name</th>
            {showJob && <th className="ltr:text-left rtl:text-right py-2 px-3">Job</th>}
            <th className="ltr:text-left rtl:text-right py-2 px-3">Contact</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Nationality</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Exp.</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Rating</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Stage</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map(a => {
            const job = showJob ? jobs.find(j => j.id === a.jobId) : null;
            return (
              <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-2 px-3 font-medium">{a.name}<div className="text-xs text-slate-500">{a.appliedAt}</div></td>
                {showJob && <td className="py-2 px-3 text-sm">{job?.title}<div className="text-xs text-slate-500">{job?.code}</div></td>}
                <td className="py-2 px-3 text-xs">{a.email}<div>{a.phone}</div></td>
                <td className="py-2 px-3 text-sm">{a.nationality}</td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left">{a.experience}y</td>
                <td className="py-2 px-3">{a.rating ? '★'.repeat(a.rating) + '☆'.repeat(5-a.rating) : '—'}</td>
                <td className="py-2 px-3"><span className={`badge ${stageColor[a.stage]} capitalize`}>{a.stage}</span></td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left">
                  {a.stage !== 'hired' && a.stage !== 'rejected' && (
                    <div className="flex gap-1 justify-end">
                      {a.stage === 'offer' ? (
                        <button onClick={() => hire(a.id)} className="btn btn-success text-xs">Hire</button>
                      ) : (
                        <button onClick={() => moveStage(a.id, 'next')} className="btn btn-ghost text-xs"><ChevronRight size={12}/></button>
                      )}
                      <button onClick={() => reject(a.id)} className="p-1.5 text-rose-700 hover:bg-rose-100 rounded"><XCircle size={14}/></button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// DOCUMENTS — Iqama, license, contract expiry tracking (KSA-critical)
// ─────────────────────────────────────────────────────────────────
function Documents({ state }) {
  const { i18n } = useTranslation();
  const [filter, setFilter] = useState('all');

  const today = new Date();
  const daysUntil = (dateStr) => Math.ceil((new Date(dateStr) - today) / (1000*60*60*24));

  const docs = state.hrDocuments.map(d => {
    const days = daysUntil(d.expiryDate);
    let computed = 'active';
    if (days < 0) computed = 'expired';
    else if (days <= 60) computed = 'expiring';
    return { ...d, daysLeft: days, computed };
  });

  const filtered = filter === 'all' ? docs : docs.filter(d => d.computed === filter);
  filtered.sort((a, b) => a.daysLeft - b.daysLeft);

  const counts = {
    active: docs.filter(d => d.computed === 'active').length,
    expiring: docs.filter(d => d.computed === 'expiring').length,
    expired: docs.filter(d => d.computed === 'expired').length,
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <button onClick={() => setFilter('active')}   className={`p-3 rounded-lg text-left ${filter === 'active'   ? 'ring-2 ring-emerald-500' : ''} bg-emerald-50`}>
          <div className="text-2xl font-bold text-emerald-700">{counts.active}</div><div className="text-xs text-emerald-700">Active</div>
        </button>
        <button onClick={() => setFilter('expiring')} className={`p-3 rounded-lg text-left ${filter === 'expiring' ? 'ring-2 ring-amber-500' : ''} bg-amber-50`}>
          <div className="text-2xl font-bold text-amber-700">{counts.expiring}</div><div className="text-xs text-amber-700">Expiring (≤60 days)</div>
        </button>
        <button onClick={() => setFilter('expired')}  className={`p-3 rounded-lg text-left ${filter === 'expired'  ? 'ring-2 ring-rose-500' : ''} bg-rose-50`}>
          <div className="text-2xl font-bold text-rose-700">{counts.expired}</div><div className="text-xs text-rose-700">Expired</div>
        </button>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-800">Employee Documents — KSA Compliance</h3>
          <button onClick={() => setFilter('all')} className="btn btn-ghost text-xs">Show All ({docs.length})</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-200">
                <th className="ltr:text-left rtl:text-right py-2 px-3">Employee</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">Document Type</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">Document No.</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">Issue Date</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">Expiry Date</th>
                <th className="ltr:text-right rtl:text-left py-2 px-3">Days Left</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => {
                const e = state.employees.find(x => x.id === d.empId);
                const stClass = d.computed === 'active' ? 'badge-success' : d.computed === 'expiring' ? 'badge-warning' : 'badge-danger';
                return (
                  <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2 px-3"><div className="font-medium">{i18n.language === 'ar' ? e?.nameAr : e?.name}</div><div className="text-xs text-slate-500">{e?.empNo}</div></td>
                    <td className="py-2 px-3 text-sm">{d.type}</td>
                    <td className="py-2 px-3 font-mono text-xs">{d.docNo}</td>
                    <td className="py-2 px-3 text-sm">{d.issueDate}</td>
                    <td className="py-2 px-3 text-sm">{d.expiryDate}</td>
                    <td className={`py-2 px-3 ltr:text-right rtl:text-left font-semibold ${d.daysLeft < 0 ? 'text-rose-700' : d.daysLeft <= 60 ? 'text-amber-700' : 'text-slate-700'}`}>
                      {d.daysLeft < 0 ? `${Math.abs(d.daysLeft)} d ago` : `${d.daysLeft} d`}
                    </td>
                    <td className="py-2 px-3"><span className={`badge ${stClass} capitalize flex items-center gap-1 w-fit`}>
                      {d.computed === 'expired' && <AlertTriangle size={10}/>}
                      {d.computed}
                    </span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// PERFORMANCE — Annual reviews
// ─────────────────────────────────────────────────────────────────
function Performance({ state, refresh }) {
  const { i18n } = useTranslation();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ rating: 3, strengths: '', improvements: '', goals: '' });

  const startEdit = (pr) => {
    setEditing(pr);
    setForm({ rating: pr.rating || 3, strengths: pr.strengths, improvements: pr.improvements, goals: pr.goals });
  };
  const save = () => {
    const s = loadState();
    const pr = s.performanceReviews.find(p => p.id === editing.id);
    if (pr) Object.assign(pr, { ...form, status: 'completed' });
    saveState(s); setEditing(null); refresh();
  };

  return (
    <div className="card">
      <h3 className="font-semibold text-slate-800 mb-3">Performance Reviews</h3>
      <table className="w-full">
        <thead>
          <tr className="text-xs text-slate-500 border-b border-slate-200">
            <th className="ltr:text-left rtl:text-right py-2 px-3">Employee</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Period</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Rating</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Status</th>
            <th className="ltr:text-left rtl:text-right py-2 px-3">Date</th>
            <th className="ltr:text-right rtl:text-left py-2 px-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {state.performanceReviews.map(pr => {
            const e = state.employees.find(x => x.id === pr.empId);
            return (
              <tr key={pr.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-2 px-3"><div className="font-medium">{i18n.language === 'ar' ? e?.nameAr : e?.name}</div><div className="text-xs text-slate-500">{e?.empNo}</div></td>
                <td className="py-2 px-3 text-sm">{pr.period}</td>
                <td className="py-2 px-3">{pr.rating ? <span className="text-amber-500">{'★'.repeat(pr.rating)}{'☆'.repeat(5-pr.rating)}</span> : <span className="text-slate-400 text-xs">— pending —</span>}</td>
                <td className="py-2 px-3"><span className={`badge ${pr.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>{pr.status}</span></td>
                <td className="py-2 px-3 text-sm">{pr.date}</td>
                <td className="py-2 px-3 ltr:text-right rtl:text-left"><button onClick={() => startEdit(pr)} className="btn btn-ghost text-xs">{pr.status === 'draft' ? 'Complete' : 'View'}</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">{state.employees.find(x => x.id === editing.empId)?.name} — {editing.period}</h3>
              <button onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <label className="label">Rating</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => setForm({...form, rating: n})}
                      className={`p-2 rounded-lg text-2xl ${form.rating >= n ? 'text-amber-500' : 'text-slate-300'}`}>★</button>
                  ))}
                </div>
              </div>
              <div><label className="label">Strengths</label><textarea className="input min-h-[70px]" value={form.strengths} onChange={e => setForm({...form, strengths: e.target.value})}/></div>
              <div><label className="label">Areas for Improvement</label><textarea className="input min-h-[70px]" value={form.improvements} onChange={e => setForm({...form, improvements: e.target.value})}/></div>
              <div><label className="label">Goals for Next Period</label><textarea className="input min-h-[70px]" value={form.goals} onChange={e => setForm({...form, goals: e.target.value})}/></div>
            </div>
            <div className="p-5 border-t border-slate-200 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="btn btn-ghost">Cancel</button>
              <button onClick={save} className="btn bg-fuchsia-700 text-white">Save Review</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// TRAINING — Courses & certifications
// ─────────────────────────────────────────────────────────────────
function Training({ state, refresh }) {
  const { i18n } = useTranslation();

  const markComplete = (id) => {
    const s = loadState();
    const t = s.trainings.find(x => x.id === id);
    if (t) { t.status = 'completed'; t.score = 80 + Math.floor(Math.random() * 20); }
    saveState(s); refresh();
  };

  const counts = {
    completed: state.trainings.filter(t => t.status === 'completed').length,
    in_progress: state.trainings.filter(t => t.status === 'in_progress').length,
    overdue: state.trainings.filter(t => t.status === 'overdue').length,
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="card bg-emerald-50"><div className="text-2xl font-bold text-emerald-700">{counts.completed}</div><div className="text-xs text-emerald-700">Completed</div></div>
        <div className="card bg-blue-50"><div className="text-2xl font-bold text-blue-700">{counts.in_progress}</div><div className="text-xs text-blue-700">In Progress</div></div>
        <div className="card bg-rose-50"><div className="text-2xl font-bold text-rose-700">{counts.overdue}</div><div className="text-xs text-rose-700">Overdue</div></div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-slate-800 mb-3">Training & Certifications</h3>
        <table className="w-full">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-slate-200">
              <th className="ltr:text-left rtl:text-right py-2 px-3">Employee</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Course</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Category</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Assigned</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Due</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Status</th>
              <th className="ltr:text-right rtl:text-left py-2 px-3">Score</th>
              <th className="ltr:text-right rtl:text-left py-2 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {state.trainings.map(t => {
              const e = state.employees.find(x => x.id === t.empId);
              const stClass = t.status === 'completed' ? 'badge-success' : t.status === 'overdue' ? 'badge-danger' : 'badge-info';
              return (
                <tr key={t.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 px-3"><div className="font-medium">{i18n.language === 'ar' ? e?.nameAr : e?.name}</div><div className="text-xs text-slate-500">{e?.empNo}</div></td>
                  <td className="py-2 px-3 font-medium">{t.name}</td>
                  <td className="py-2 px-3 text-sm">{t.category}</td>
                  <td className="py-2 px-3 text-sm">{t.assignedDate}</td>
                  <td className="py-2 px-3 text-sm">{t.dueDate}</td>
                  <td className="py-2 px-3"><span className={`badge ${stClass} capitalize`}>{t.status.replace('_',' ')}</span></td>
                  <td className="py-2 px-3 ltr:text-right rtl:text-left font-semibold">{t.score ? `${t.score}%` : '—'}</td>
                  <td className="py-2 px-3 ltr:text-right rtl:text-left">
                    {t.status !== 'completed' && <button onClick={() => markComplete(t.id)} className="btn btn-success text-xs">Mark Complete</button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  const map = {
    fuchsia: 'from-fuchsia-500 to-pink-600',
    emerald: 'from-emerald-500 to-teal-600',
    amber:   'from-amber-500   to-orange-600',
    blue:    'from-blue-500    to-indigo-600',
    indigo:  'from-indigo-500  to-purple-600',
    rose:    'from-rose-500    to-red-600',
  };
  return (
    <div className="card relative overflow-hidden">
      <div className={`absolute inset-y-0 ltr:left-0 rtl:right-0 w-1 bg-gradient-to-b ${map[color]}`} />
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}
