import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Target, 
  GraduationCap, 
  Calendar, 
  Users, 
  Award,
  Sparkles,
  X
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, activeUser, setIsLoginModalOpen } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, tag: 'Overview' },
    { id: 'goals', label: 'Goals (Daily/Mo/Yr)', icon: Target, tag: '3 Levels' },
    { id: 'courses', label: 'Courses & Certificates', icon: GraduationCap, tag: 'Shahadooyinka' },
    { id: 'calendar', label: 'Calendar & Reminders', icon: Calendar, tag: 'Schedule' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (onClose) onClose();
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sparkles size={22} style={{ color: 'var(--accent-secondary)' }} />
          <div>
            <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>Personal Growth</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Self-Tracking Platform</div>
          </div>
        </div>
        {onClose && (
          <button 
            className="btn-icon mobile-menu-btn" 
            onClick={onClose}
            style={{ width: '32px', height: '32px' }}
            title="Close menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <Icon size={19} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.tag && (
                <span style={{
                  fontSize: '0.68rem',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '999px',
                  background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.06)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)'
                }}>
                  {item.tag}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Switcher Card at Sidebar Bottom */}
      <div 
        className="user-profile-badge" 
        style={{ cursor: 'pointer' }} 
        onClick={() => {
          setIsLoginModalOpen(true);
          if (onClose) onClose();
        }}
      >
        <div 
          className="user-avatar" 
          style={{ background: activeUser?.avatarColor || 'var(--accent-primary)' }}
        >
          {activeUser?.name?.charAt(0) || 'U'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: '600', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {activeUser?.name || 'User Profile'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {activeUser?.role || 'Personal Learner'}
          </div>
        </div>
        <Users size={16} style={{ color: 'var(--text-secondary)' }} />
      </div>
    </aside>
  );
};
