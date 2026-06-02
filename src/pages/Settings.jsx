import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings as SettingsIcon, Shield, Cloud, Lock, CheckCircle2, AlertCircle, RefreshCw, ExternalLink, Info, Mail, Globe, Code2 } from 'lucide-react';
import { getAuthProvider, setAuthProvider, getAuthConfig, setAuthConfig, loadState } from '../data/storage';
import { PRODUCT, HOSPITAL } from '../data/seed';

export default function Settings() {
  const { t } = useTranslation();
  const [provider, setProviderState] = useState(getAuthProvider());
  const [cfg, setCfg]                = useState(getAuthConfig());
  const [syncing, setSyncing]        = useState(false);
  const [syncResult, setSyncResult]  = useState(null);
  const state = loadState();

  const switchProvider = (p) => {
    setAuthProvider(p);
    setProviderState(p);
  };

  const saveCfg = () => {
    setAuthConfig(cfg);
    alert('Azure AD configuration saved');
  };

  const testSso = () => {
    if (!cfg.tenantId || !cfg.clientId) return alert('Tenant ID and Client ID required');
    alert(`✓ Configuration valid\n\nTenant: ${cfg.tenantId}\nClient: ${cfg.clientId}\n\nIn production this would redirect to:\nhttps://login.microsoftonline.com/${cfg.tenantId}/oauth2/v2.0/authorize`);
  };

  const syncFromAzure = () => {
    setSyncing(true);
    setSyncResult(null);
    setTimeout(() => {
      setSyncing(false);
      setSyncResult({
        synced: state.users.length,
        new: 0,
        updated: state.users.length,
        timestamp: new Date().toLocaleString(),
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-slate-700 to-gray-800 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><SettingsIcon size={24}/></div>
          <div>
            <h1 className="text-2xl font-bold">System Settings</h1>
            <p className="text-white/90 text-sm">Authentication · User integration · System preferences</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
          <Shield size={20} className="text-blue-600"/> User Authentication
        </h2>
        <p className="text-sm text-slate-500 mb-4">Choose how users sign in to the system. Switching takes effect immediately.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Standalone */}
          <button
            onClick={() => switchProvider('standalone')}
            className={`p-5 rounded-xl border-2 text-left transition-all ${provider === 'standalone' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center"><Lock size={20}/></div>
              {provider === 'standalone' && <span className="badge badge-success flex items-center gap-1"><CheckCircle2 size={10}/> Active</span>}
            </div>
            <h3 className="font-bold text-slate-800">Standalone</h3>
            <p className="text-sm text-slate-600 mt-1">Email + password stored locally in the app. No external dependencies. Best for offline / single-clinic use.</p>
            <div className="mt-3 text-xs text-slate-500">
              <div>✓ Works offline</div>
              <div>✓ No setup required</div>
              <div>✓ Per-user passwords (Admin@123 default)</div>
            </div>
          </button>

          {/* Azure AD / M365 */}
          <button
            onClick={() => switchProvider('azure_ad')}
            className={`p-5 rounded-xl border-2 text-left transition-all ${provider === 'azure_ad' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <svg viewBox="0 0 23 23" className="w-6 h-6"><rect width="10" height="10" fill="#F25022"/><rect x="11" width="10" height="10" fill="#7FBA00"/><rect y="11" width="10" height="10" fill="#00A4EF"/><rect x="11" y="11" width="10" height="10" fill="#FFB900"/></svg>
              </div>
              {provider === 'azure_ad' && <span className="badge badge-success flex items-center gap-1"><CheckCircle2 size={10}/> Active</span>}
            </div>
            <h3 className="font-bold text-slate-800">Microsoft 365 / Azure AD</h3>
            <p className="text-sm text-slate-600 mt-1">Single sign-on via Microsoft Entra ID. Users log in with their corporate M365 account. MFA, conditional access, and group-based roles all enforced by Azure.</p>
            <div className="mt-3 text-xs text-slate-500">
              <div>✓ Single sign-on (SSO)</div>
              <div>✓ Microsoft Authenticator MFA</div>
              <div>✓ Auto-provision from Azure AD groups</div>
            </div>
          </button>
        </div>
      </div>

      {provider === 'azure_ad' && (
        <>
          <div className="card border-l-4 border-l-blue-500">
            <h3 className="font-semibold text-slate-800 mb-1 flex items-center gap-2"><Cloud size={18} className="text-blue-600"/> Azure AD Connection</h3>
            <p className="text-xs text-slate-500 mb-4">Register the Hospital ERP as an enterprise app in your Azure portal, then paste the IDs below.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="label">Tenant ID (Directory ID)</label>
                <input className="input font-mono text-sm" value={cfg.tenantId || ''} onChange={e => setCfg({...cfg, tenantId: e.target.value})} placeholder="00000000-0000-0000-0000-000000000000"/>
              </div>
              <div>
                <label className="label">Client ID (Application ID)</label>
                <input className="input font-mono text-sm" value={cfg.clientId || ''} onChange={e => setCfg({...cfg, clientId: e.target.value})} placeholder="11111111-1111-1111-1111-111111111111"/>
              </div>
              <div>
                <label className="label">Redirect URI</label>
                <input className="input font-mono text-sm" value={cfg.redirectUri || `${window.location.origin}/login`} onChange={e => setCfg({...cfg, redirectUri: e.target.value})}/>
              </div>
              <div>
                <label className="label">Domain (optional)</label>
                <input className="input font-mono text-sm" value={cfg.domain || ''} onChange={e => setCfg({...cfg, domain: e.target.value})} placeholder="hospital.onmicrosoft.com"/>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={saveCfg} className="btn btn-primary">Save Configuration</button>
              <button onClick={testSso} className="btn btn-ghost"><ExternalLink size={14}/> Test SSO</button>
            </div>

            <details className="mt-4 text-xs text-slate-600">
              <summary className="cursor-pointer font-medium">Setup instructions</summary>
              <ol className="list-decimal ltr:pl-5 rtl:pr-5 mt-2 space-y-1">
                <li>Go to <span className="font-mono">portal.azure.com → Microsoft Entra ID → App registrations → New registration</span></li>
                <li>Name: <span className="font-mono">Hospital ERP</span> · Supported account types: Single tenant</li>
                <li>Redirect URI: Web → <span className="font-mono">{window.location.origin}/login</span></li>
                <li>After registration, copy the <b>Application (client) ID</b> and <b>Directory (tenant) ID</b> from the Overview page</li>
                <li>Under <b>API permissions</b>, add <span className="font-mono">User.Read</span> (delegated) and grant admin consent</li>
                <li>Under <b>Token configuration</b>, add the optional claim <span className="font-mono">email</span></li>
                <li>Paste the IDs above and click Save</li>
              </ol>
            </details>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="font-semibold text-slate-800">User Provisioning</h3>
              <button onClick={syncFromAzure} disabled={syncing} className="btn btn-ghost">
                <RefreshCw size={14} className={syncing ? 'animate-spin' : ''}/> {syncing ? 'Syncing...' : 'Sync users from Azure AD'}
              </button>
            </div>

            {syncResult && (
              <div className="mb-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-sm">
                <div className="font-semibold text-emerald-800 flex items-center gap-1.5"><CheckCircle2 size={14}/> Sync complete · {syncResult.timestamp}</div>
                <div className="text-emerald-700 mt-1">{syncResult.synced} users synced · {syncResult.new} new · {syncResult.updated} updated</div>
              </div>
            )}

            <p className="text-xs text-slate-500 mb-3">When SSO is enabled, users are auto-provisioned on first sign-in. Their roles are determined by Azure AD group membership.</p>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b">
                  <th className="ltr:text-left rtl:text-right py-2">User</th>
                  <th className="ltr:text-left rtl:text-right py-2">UPN (M365 login)</th>
                  <th className="ltr:text-left rtl:text-right py-2">Role</th>
                  <th className="ltr:text-left rtl:text-right py-2">Source</th>
                </tr>
              </thead>
              <tbody>
                {state.users.map(u => (
                  <tr key={u.id} className="border-b border-slate-100">
                    <td className="py-2 font-medium">{u.name}</td>
                    <td className="py-2 font-mono text-xs">{u.email}</td>
                    <td className="py-2 capitalize text-xs">{u.role.replace('_',' ')}</td>
                    <td className="py-2"><span className="badge badge-info text-xs">Azure AD</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="card bg-amber-50 border border-amber-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={18}/>
          <div className="text-sm text-amber-900">
            <div className="font-semibold mb-1">Demo mode notice</div>
            <p>Azure AD SSO is currently <b>simulated</b>. The redirect to login.microsoftonline.com is mocked, and accounts are matched by email against the local user store. To enable real SSO, integrate <span className="font-mono bg-white px-1 rounded">@azure/msal-browser</span> and a backend that validates JWT tokens against Microsoft's keys — these come together with the planned Supabase migration.</p>
          </div>
        </div>
      </div>

      <div className="card border-l-4 border-l-rose-500">
        <h2 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
          <Info size={20} className="text-rose-600"/> About
        </h2>
        <p className="text-sm text-slate-500 mb-4">Platform, vendor, and customer information for this deployment.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200">
            <div className="text-xs font-semibold text-rose-700 uppercase tracking-wide mb-2">Platform</div>
            <div className="font-bold text-lg text-slate-800">{PRODUCT.name}</div>
            <div className="text-sm text-slate-600 mt-1">{PRODUCT.tagline}</div>
            <div className="text-xs text-slate-500 mt-3 flex items-center gap-1.5"><Code2 size={12}/> Version {PRODUCT.version}</div>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Developed By</div>
            <div className="font-bold text-lg text-slate-800">{PRODUCT.developer}</div>
            <div className="text-sm text-slate-600 mt-1">{PRODUCT.developerCountry}</div>
            <div className="text-xs text-slate-500 mt-3 space-y-1">
              <div className="flex items-center gap-1.5"><Globe size={12}/> <a href={PRODUCT.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{PRODUCT.website.replace(/^https?:\/\//, '')}</a></div>
              <div className="flex items-center gap-1.5"><Mail size={12}/> <a href={`mailto:${PRODUCT.supportEmail}`} className="text-blue-600 hover:underline">{PRODUCT.supportEmail}</a></div>
            </div>
          </div>

          <div className="md:col-span-2 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2">Deployed For</div>
            <div className="font-bold text-lg text-slate-800">{HOSPITAL.name}</div>
            <div className="text-sm text-slate-700">{HOSPITAL.address}</div>
            <div className="text-xs text-slate-600 mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
              <div><span className="text-slate-500">GSTIN:</span> <span className="font-mono">{HOSPITAL.gstin}</span></div>
              <div><span className="text-slate-500">PAN:</span> <span className="font-mono">{HOSPITAL.pan}</span></div>
              <div><span className="text-slate-500">MoH Reg:</span> <span className="font-mono">{HOSPITAL.mohRegNo}</span></div>
              <div><span className="text-slate-500">Drug Lic:</span> <span className="font-mono">{HOSPITAL.drugLicense}</span></div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between flex-wrap gap-2">
          <div>© {PRODUCT.copyrightYear} {PRODUCT.developer}. All rights reserved.</div>
          <div>Unauthorized copying, modification, or distribution prohibited.</div>
        </div>
      </div>
    </div>
  );
}
