import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sun, 
  Moon, 
  UserCheck, 
  Menu, 
  ShieldCheck,
  Cloud,
  Edit3,
  LogOut
} from 'lucide-react';

export const Header = ({ onToggleSidebar }) => {
  const { 
    activeUser, 
    theme, 
    toggleTheme, 
    setIsLoginModalOpen, 
    setIsEditProfileModalOpen, 
    logoutUser,
    isCloudSyncing 
  } = useApp();

  return (
    <header className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          className="btn-icon mobile-menu-btn" 
          onClick={onToggleSidebar} 
          title="Open Menu"
        >
          <Menu size={20} />
        </button>
        
        <div className="navbar-brand">
          <ShieldCheck size={24} style={{ color: 'var(--accent-primary)' }} />
          <span>SelfTracker Enterprise</span>
        </div>
      </div>

      <div className="navbar-actions">
        {/* Real-time Cloud Sync Badge */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.65rem',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)'
          }}
          title="Cloud Database Sync across Mobile & PC"
        >
          <Cloud size={13} style={{ color: 'var(--accent-success)' }} />
          <span>{isCloudSyncing ? 'Syncing...' : 'Cloud Synced'}</span>
        </div>

        {/* Theme Toggle Button */}
        <button 
          className="btn-icon" 
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={17} color="#f59e0b" /> : <Moon size={17} color="#2563eb" />}
        </button>

        {/* Edit Profile Button */}
        <button 
          className="btn-icon"
          onClick={() => setIsEditProfileModalOpen(true)}
          title="Edit Profile"
        >
          <Edit3 size={16} color="var(--accent-primary)" />
        </button>

        {/* Account Switcher Button */}
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => setIsLoginModalOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.35rem 0.75rem' }}
        >
          <div style={{
            width: '22px',
            height: '22px',
            borderRadius: 'var(--radius-sm)',
            background: activeUser?.avatarColor || 'var(--accent-primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.725rem'
          }}>
            {activeUser?.name?.charAt(0) || 'U'}
          </div>
          <span style={{ fontWeight: 600, fontSize: '0.825rem' }}>{activeUser?.name || 'User'}</span>
          <UserCheck size={13} style={{ color: 'var(--accent-success)' }} />
        </button>

        {/* Logout Button */}
        <button 
          className="btn btn-danger btn-sm"
          onClick={logoutUser}
          title="Log out and return to Login Screen"
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <LogOut size={14} /> Log Out
        </button>
      </div>
    </header>
  );
};
