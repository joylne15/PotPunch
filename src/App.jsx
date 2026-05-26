import { useState } from 'react';
import { AuthProvider, NotificationProvider, useAuth } from './context/AppContext';
import AppShell from './components/layout/AppShell';
import Button from './components/common/Button';
import Input from './components/common/Input';

// ─── Login Page (inline for testing) ───
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    onLogin({ email, name, role });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-xl mb-4">
            <span className="text-white text-xl font-bold">CS</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">CollectSys</h1>
          <p className="text-sm text-gray-500 mt-1">Money Collection Management System</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
            />
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Sign in as<span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    role === 'admin'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => setRole('member')}
                  className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    role === 'member'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Member
                </button>
              </div>
            </div>
            <Button type="submit" fullWidth>
              Sign In
            </Button>
          </form>
        </div>
        <p className="text-xs text-gray-400 text-center mt-4">
          Demo: Use any email + 8+ character password
        </p>
      </div>
    </div>
  );
}

// ─── Placeholder Page (for nav items not yet built) ───
function PlaceholderPage({ title }) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-500">This page will be built in a future phase.</p>
      </div>
    </div>
  );
}

// ─── Main App Logic ───
function AppContent() {
  const { user, login, logout } = useAuth();
  const [activeNav, setActiveNav] = useState('dashboard');

  // Not logged in → show login page
  if (!user) {
    return <LoginPage onLogin={login} />;
  }

  const handleNavChange = (navId) => {
    setActiveNav(navId);
  };

  const handleLogout = () => {
    logout();
  };

  // Admin view
  if (user.role === 'admin') {
    return (
      <AppShell user={user} activeNav={activeNav} onNavChange={handleNavChange} onLogout={handleLogout}>
        {activeNav === 'dashboard' && <PlaceholderPage title="Dashboard" />}
        {activeNav === 'members' && <PlaceholderPage title="Members" />}
        {activeNav === 'record-payment' && <PlaceholderPage title="Record Payment" />}
        {activeNav === 'reports' && <PlaceholderPage title="Reports" />}
        {activeNav === 'settings' && <PlaceholderPage title="Settings" />}
      </AppShell>
    );
  }

  // Member view
  return (
    <AppShell user={user} activeNav="dashboard" onNavChange={() => {}} onLogout={handleLogout}>
      <PlaceholderPage title="Member Dashboard" />
    </AppShell>
  );
}

// ─── Root App with Providers ───
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}