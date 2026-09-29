import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { GoalTracker } from './components/GoalTracker';
import { CourseTracker } from './components/CourseTracker';
import { CalendarReminder } from './components/CalendarReminder';
import { LoginPage } from './components/LoginPage';
import { LoginModal } from './components/LoginModal';
import { EditProfileModal } from './components/EditProfileModal';
import { CertificateModal } from './components/CertificateModal';

const AppContent = () => {
  const { activeTab, isLoggedIn } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If not logged in, render Full-Page Login Portal
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="app-container">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Body */}
      <div className="main-content">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="content-body">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'goals' && <GoalTracker />}
          {activeTab === 'courses' && <CourseTracker />}
          {activeTab === 'calendar' && <CalendarReminder />}
        </main>
      </div>

      {/* Global Modals */}
      <LoginModal />
      <EditProfileModal />
      <CertificateModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
