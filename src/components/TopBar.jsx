import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Bell, Globe, LogOut, Search } from 'lucide-react';
import { setLang } from '../i18n';
import { logout, loadState } from '../data/storage';

export default function TopBar({ user, onLogout }) {
  const { t, i18n } = useTranslation();
  const [showNotifs, setShowNotifs] = useState(false);
  const navigate = useNavigate();
  const state = loadState();
  const unreadCount = state.notifications?.filter(n => !n.read).length || 0;

  const toggleLang = () => {
    const next = i18n.language === 'ar' ? 'en' : 'ar';
    setLang(next);
  };

  const handleLogout = () => {
    logout();
    onLogout?.();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-30">
      <div className="flex-1 max-w-md relative">
        <Search size={16} className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 text-slate-400" />
        <input
          placeholder={t('app.search')}
          className="w-full ltr:pl-9 rtl:pr-9 ltr:pr-3 rtl:pl-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-400 outline-none"
        />
      </div>

      <button
        onClick={toggleLang}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-sm text-slate-700"
        title="Toggle language"
      >
        <Globe size={16} />
        <span className="font-medium">{i18n.language === 'ar' ? 'EN' : 'عربي'}</span>
      </button>

      <div className="relative">
        <button
          onClick={() => setShowNotifs(!showNotifs)}
          className="relative p-2 rounded-lg hover:bg-slate-100"
        >
          <Bell size={18} className="text-slate-700" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
          )}
        </button>
        {showNotifs && (
          <div className="absolute ltr:right-0 rtl:left-0 top-12 w-80 bg-white border border-slate-200 rounded-xl shadow-lg z-40 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 font-semibold text-slate-800">
              {t('dashboard.notifications')}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {state.notifications?.length ? (
                state.notifications.map(n => (
                  <div key={n.id} className="px-4 py-3 border-b border-slate-100 hover:bg-slate-50 text-sm">
                    <div className="font-medium text-slate-800">{i18n.language === 'ar' ? n.titleAr : n.title}</div>
                    <div className="text-slate-600 text-xs mt-0.5">{n.desc}</div>
                    <div className="text-slate-400 text-xs mt-1">{n.time}</div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-slate-500 text-sm">{t('app.noData')}</div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm">
          {user?.name?.charAt(0)}
        </div>
        <div className="text-sm">
          <div className="font-medium text-slate-800 leading-tight">{i18n.language === 'ar' ? user?.nameAr : user?.name}</div>
          <div className="text-xs text-slate-500 capitalize">{user?.role?.replace('_',' ')}</div>
        </div>
      </div>

      <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-rose-50 text-rose-600" title={t('app.logout')}>
        <LogOut size={18} />
      </button>
    </header>
  );
}
