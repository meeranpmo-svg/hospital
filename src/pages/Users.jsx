import { useTranslation } from 'react-i18next';
import { Users as UsersIcon } from 'lucide-react';
import { loadState } from '../data/storage';
import { ROLES } from '../data/seed';

export default function Users() {
  const { t, i18n } = useTranslation();
  const state = loadState();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-slate-700 to-gray-800 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><UsersIcon size={24}/></div>
          <div>
            <h1 className="text-2xl font-bold">{t('nav.users')}</h1>
            <p className="text-white/90 text-sm">All system users · 10 distinct roles · Password: Admin@123</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-slate-800 mb-4">Role Definitions</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {ROLES.map(r => (
            <div key={r.key} className="p-3 rounded-lg border border-slate-200 flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${r.color}`} />
              <div>
                <div className="font-medium text-slate-800 text-sm">{r.label}</div>
                <div className="text-xs text-slate-500">{r.key}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-slate-800 mb-3">All Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-200">
                <th className="ltr:text-left rtl:text-right py-2 px-3">Name</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">Email</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">Role</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">Department</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">Password</th>
              </tr>
            </thead>
            <tbody>
              {state.users.map(u => {
                const role = ROLES.find(r => r.key === u.role);
                return (
                  <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2 px-3">
                      <div className="font-medium text-slate-800">{i18n.language === 'ar' ? u.nameAr : u.name}</div>
                    </td>
                    <td className="py-2 px-3 text-sm text-slate-600">{u.email}</td>
                    <td className="py-2 px-3">
                      <span className="inline-flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${role?.color}`} />
                        <span className="text-sm capitalize">{u.role.replace('_',' ')}</span>
                      </span>
                    </td>
                    <td className="py-2 px-3 text-sm">{u.department || '—'}</td>
                    <td className="py-2 px-3"><code className="text-xs bg-slate-100 px-2 py-0.5 rounded">Admin@123</code></td>
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
