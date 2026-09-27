import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { User, KeyRound, Lock, Shield, X, Save, Palette, Edit } from 'lucide-react';

export const EditProfileModal = () => {
  const { activeUser, updateUserProfile, isEditProfileModalOpen, setIsEditProfileModalOpen } = useApp();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [avatarColor, setAvatarColor] = useState('#6366f1');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (activeUser) {
      setName(activeUser.name || '');
      setUsername(activeUser.username || '');
      setPassword(activeUser.password || '');
      setRole(activeUser.role || '');
      setAvatarColor(activeUser.avatarColor || '#6366f1');
    }
  }, [activeUser, isEditProfileModalOpen]);

  if (!isEditProfileModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !username.trim() || !password.trim()) {
      setErrorMsg('Fadlan soo buuxi Name-ka, Username-ka iyo Password-ka!');
      return;
    }

    const res = updateUserProfile({
      name: name.trim(),
      username: username.trim(),
      password: password.trim(),
      role: role.trim(),
      avatarColor
    });

    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Edit size={22} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <h3>Badal Profile-kaaga (Edit Profile)</h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Ku qoro magacaaga iyo password-kaaga cusub
              </div>
            </div>
          </div>
          <button className="btn-icon" onClick={() => setIsEditProfileModalOpen(false)}>
            <X size={18} />
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

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Magacaaga Full-ka ah (Display Name)</label>
            <input 
              type="text"
              className="form-control"
              placeholder="e.g. Maxamed Ali"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Username Cusub</label>
              <input 
                type="text"
                className="form-control"
                placeholder="e.g. maxamed123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password Cusub</label>
              <input 
                type="text"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Role / Title</label>
            <input 
              type="text"
              className="form-control"
              placeholder="e.g. Developer / Student"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Color Theme</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
              {colors.map(c => (
                <div 
                  key={c}
                  onClick={() => setAvatarColor(c)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: c,
                    cursor: 'pointer',
                    border: avatarColor === c ? '3px solid white' : 'none',
                    boxShadow: avatarColor === c ? '0 0 0 2px var(--accent-primary)' : 'none'
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsEditProfileModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <Save size={16} /> Save Changes & Sync Cloud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
