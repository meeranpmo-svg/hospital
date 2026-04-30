import { Outlet, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { currentUser } from '../data/storage';

export default function Layout() {
  const [user, setUser] = useState(currentUser());
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar user={user} onLogout={() => setUser(null)} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
}
