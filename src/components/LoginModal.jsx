import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, UserPlus, LogIn, X, Lock, Mail, AlertCircle, CheckCircle2, KeyRound, Info } from 'lucide-react';

export const LoginModal = () => {
  const { loginUser, registerUser, resetPassword, isLoginModalOpen, setIsLoginModalOpen } = useApp();
  
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regRole, setRegRole] = useState('Personal Learner');
  const [regAvatarColor, setRegAvatarColor] = useState('#2563eb');

  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isLoginModalOpen) return null;

  const clearMessages = () => {
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    clearMessages();

    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setErrorMsg('Fadlan geli Email/Username iyo Password!');
      return;
    }

    const res = loginUser(loginIdentifier, loginPassword);
    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setLoginIdentifier('');
      setLoginPassword('');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    clearMessages();

    if (!regUsername.trim() || !regPassword.trim() || !regName.trim()) {
      setErrorMsg('Fadlan soo buuxi Magacaaga, Username, iyo Password-ka!');
      return;
    }

    const res = registerUser({
      username: regUsername.trim(),
      email: regEmail.trim(),
      password: regPassword.trim(),
      name: regName.trim(),
      role: regRole.trim(),
      avatarColor: regAvatarColor
    });

    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setRegUsername('');
      setRegEmail('');
      setRegPassword('');
      setRegName('');
    }
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    clearMessages();

    if (!forgotIdentifier.trim() || !newPassword.trim()) {
      setErrorMsg('Fadlan buuxi Email/Username iyo Password-ka cusub!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Labada password isma laha!');
      return;
    }

    const res = resetPassword(forgotIdentifier, newPassword);
    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setSuccessMsg(res.message);
      setForgotIdentifier('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setMode('login'), 1500);
    }
  };

  const colors = ['#2563eb', '#0284c7', '#0d9488', '#10b981', '#475569', '#6366f1'];

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <div>
            <h3>
              {mode === 'login' && 'Switch Account'}
              {mode === 'signup' && 'Register New Account'}
              {mode === 'forgot' && 'Reset Password'}
            </h3>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              SelfTracker Private Authentication
            </div>
          </div>
          <button className="btn-icon" onClick={() => setIsLoginModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        {mode !== 'forgot' && (
          <div className="tab-row" style={{ width: '100%', marginBottom: '1.25rem' }}>
            <button 
              className={`tab-button ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); clearMessages(); }}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
              <LogIn size={14} /> Sign In
            </button>
            <button 
              className={`tab-button ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => { setMode('signup'); clearMessages(); }}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
              <UserPlus size={14} /> Sign Up
            </button>
          </div>
        )}

        {errorMsg && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.25)', 
            color: '#f87171', 
            padding: '0.65rem 0.85rem', 
            borderRadius: 'var(--radius-sm)', 
            fontSize: '0.825rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}>
            <AlertCircle size={15} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div style={{ 
            background: 'rgba(16, 185, 129, 0.1)', 
            border: '1px solid rgba(16, 185, 129, 0.25)', 
            color: '#34d399', 
            padding: '0.65rem 0.85rem', 
            borderRadius: 'var(--radius-sm)', 
            fontSize: '0.825rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}>
            <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
            <span>{successMsg}</span>
          </div>
        )}

        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Email or Username</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text"
                  className="form-control"
                  placeholder="Geli email ama username"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  required
                />
                <Mail size={15} style={{ position: 'absolute', right: '10px', top: '11px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label>Password</label>
                <button 
                  type="button" 
                  onClick={() => { setMode('forgot'); clearMessages(); }}
                  style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', background: 'none' }}
                >
                  Forgot?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password"
                  className="form-control"
                  placeholder="Geli password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <Lock size={15} style={{ position: 'absolute', right: '10px', top: '11px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsLoginModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <LogIn size={15} /> Sign In
              </button>
            </div>
          </form>
        )}

        {mode === 'signup' && (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label>Full Display Name</label>
              <input 
                type="text"
                className="form-control"
                placeholder="e.g. Ahmed Ali"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Gmail / Email</label>
              <input 
                type="email"
                className="form-control"
                placeholder="e.g. ahmed@gmail.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text"
                  className="form-control"
                  placeholder="e.g. ahmed"
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
                  placeholder="Password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Role / Position</label>
              <input 
                type="text"
                className="form-control"
                placeholder="e.g. Student / Software Developer"
                value={regRole}
                onChange={(e) => setRegRole(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <UserPlus size={15} /> Create Account
              </button>
            </div>
          </form>
        )}

        {mode === 'forgot' && (
          <form onSubmit={handleResetSubmit}>
            <div className="form-group">
              <label>Email or Username</label>
              <input 
                type="text"
                className="form-control"
                placeholder="Geli email ama username"
                value={forgotIdentifier}
                onChange={(e) => setForgotIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password Cusub</label>
              <input 
                type="password"
                className="form-control"
                placeholder="Geli password cusub"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Xaqiiji Password-ka</label>
              <input 
                type="password"
                className="form-control"
                placeholder="Mar kale geli password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', marginTop: '1.25rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => { setMode('login'); clearMessages(); }}>
                Back
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                <KeyRound size={15} /> Reset Password
              </button>
            </div>
          </form>
        )}

        <div style={{ 
          marginTop: '1.25rem', 
          fontSize: '0.75rem', 
          color: 'var(--text-muted)', 
          textAlign: 'center', 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.35rem'
        }}>
          <Info size={13} />
          <span>Xogta akoonkaadu waa sir oo adiga kaliya ayay kuu gaar tahay</span>
        </div>
      </div>
    </div>
  );
};
