import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, KeyRound, User, UserPlus, LogIn, Shield, X, CheckCircle2, Lock } from 'lucide-react';

export const LoginModal = () => {
  const { users, activeUser, loginUser, registerUser, isLoginModalOpen, setIsLoginModalOpen } = useApp();
  
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  
  // Login Form States
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register Form States
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regRole, setRegRole] = useState('Personal Learner');
  const [regAvatarColor, setRegAvatarColor] = useState('#6366f1');

  const [errorMsg, setErrorMsg] = useState('');

  if (!isLoginModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginUsername.trim() || !loginPassword.trim()) {
      setErrorMsg('Fadlan geli Username iyo Password-kaaga!');
      return;
    }

    const res = loginUser(loginUsername, loginPassword);
    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setLoginUsername('');
      setLoginPassword('');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regUsername.trim() || !regPassword.trim() || !regName.trim()) {
      setErrorMsg('Fadlan soo buuxi dhammaan qeybaha muhiimka ah!');
      return;
    }

    const res = registerUser({
      username: regUsername.trim(),
      password: regPassword.trim(),
      name: regName.trim(),
      role: regRole.trim(),
      avatarColor: regAvatarColor
    });

    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setRegUsername('');
      setRegPassword('');
      setRegName('');
    }
  };

  const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Shield size={24} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <h3>{mode === 'login' ? 'Gali Account-kaaga (Login)' : 'Sameey Account Cusub (Sign Up)'}</h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                System Access ({users.length}/3 Users Registered)
              </div>
            </div>
          </div>
          <button className="btn-icon" onClick={() => setIsLoginModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="tab-row" style={{ width: '100%', marginBottom: '1.25rem' }}>
          <button 
            className={`tab-button ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
          >
            <LogIn size={15} /> Login
          </button>
          <button 
            className={`tab-button ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            disabled={users.length >= 3}
          >
            <UserPlus size={15} /> Sign Up {users.length >= 3 && '(Full)'}
          </button>
        </div>

        {errorMsg && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.15)', 
            border: '1px solid rgba(239, 68, 68, 0.3)', 
            color: '#fca5a5', 
            padding: '0.75rem 1rem', 
            borderRadius: 'var(--radius-md)', 
            fontSize: '0.85rem',
            marginBottom: '1rem'
          }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit}>
            {/* Quick selector of existing users */}
            {users.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
                  Registered Profiles (Dooro ama qor username):
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {users.map(u => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => {
                        setLoginUsername(u.username);
                        setErrorMsg('');
                      }}
                      style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        background: loginUsername === u.username ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${loginUsername === u.username ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                        color: 'var(--text-primary)',
                        fontSize: '0.825rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: u.avatarColor }} />
                      <span>{u.name} (@{u.username})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Username</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text"
                  className="form-control"
                  placeholder="e.g. mohamed123"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                />
                <User size={18} style={{ position: 'absolute', right: '12px', top: '12px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <Lock size={18} style={{ position: 'absolute', right: '12px', top: '12px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsLoginModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <LogIn size={16} /> Sign In / Login
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label>Username (Single word)</label>
                <input 
                  type="text"
                  className="form-control"
                  placeholder="e.g. ahmed_dev"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password"
                  className="form-control"
                  placeholder="Secret password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Full Display Name / Magacaaga Full-ka ah</label>
              <input 
                type="text"
                className="form-control"
                placeholder="e.g. Ahmed Mohamed Ali"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Role / Title</label>
              <input 
                type="text"
                className="form-control"
                placeholder="e.g. Student / Software Developer"
                value={regRole}
                onChange={(e) => setRegRole(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Choose Profile Theme Color</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                {colors.map(c => (
                  <div 
                    key={c}
                    onClick={() => setRegAvatarColor(c)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: c,
                      cursor: 'pointer',
                      border: regAvatarColor === c ? '3px solid white' : 'none',
                      boxShadow: regAvatarColor === c ? '0 0 0 2px var(--accent-primary)' : 'none'
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <UserPlus size={16} /> Create Account & Login
              </button>
            </div>
          </form>
        )}

        <div style={{ 
          marginTop: '1.25rem', 
          fontSize: '0.78rem', 
          color: 'var(--text-muted)', 
          textAlign: 'center', 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '0.85rem' 
        }}>
          💡 3-da qof mid kasta wuxuu yeelanayaa Username iyo Password u gaar ah!
        </div>
      </div>
    </div>
  );
};
