import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Dedicated Cloud Sync Database Object ID
const CLOUD_SYNC_ID = 'ff808181a09d98f701a0e297ec9723dc';
const CLOUD_API_URL = `https://api.restful-api.dev/objects/${CLOUD_SYNC_ID}`;

// Default starter accounts if cloud is empty
const DEFAULT_ACCOUNTS = [
  { id: 'u1', username: 'admin', password: '123', name: 'Primary User', role: 'Personal Learner', avatarColor: '#6366f1' }
];

const EMPTY_USER_DATA = {
  dailyGoals: [],
  monthlyGoals: [],
  yearlyGoals: [],
  courses: [],
  reminders: []
};

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('self_tracker_theme') || 'dark');
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [cloudStatus, setCloudStatus] = useState('Online');

  // Registered Accounts State (Unlimited Multi-User Support)
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('self_tracker_registered_users');
    return saved ? JSON.parse(saved) : DEFAULT_ACCOUNTS;
  });

  // Active Logged-in User Session State
  const [activeUser, setActiveUser] = useState(() => {
    const savedSession = localStorage.getItem('self_tracker_active_session');
    if (savedSession) {
      try { return JSON.parse(savedSession); } catch(e) {}
    }
    return null; // Force Login Page first if no active session
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('self_tracker_active_session');
  });

  // User Datasets map: { [userId]: userData }
  const [allUserDatasets, setAllUserDatasets] = useState(() => {
    const saved = localStorage.getItem('self_tracker_all_user_datasets');
    return saved ? JSON.parse(saved) : { u1: EMPTY_USER_DATA };
  });

  // Active User Data
  const [userData, setUserData] = useState(() => {
    const userId = activeUser ? activeUser.id : null;
    return userId && allUserDatasets[userId] ? allUserDatasets[userId] : EMPTY_USER_DATA;
  });

  // Modal Control & View States
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Sync theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('self_tracker_theme', theme);
  }, [theme]);

  // Initial Cloud Data Fetch on App Load (Sync PC & Mobile)
  useEffect(() => {
    const fetchCloudData = async () => {
      try {
        setIsCloudSyncing(true);
        const res = await fetch(CLOUD_API_URL);
        if (res.ok) {
          const json = await res.json();
          if (json && json.data) {
            const cloudUsers = json.data.users && json.data.users.length > 0 ? json.data.users : users;
            const cloudDatasets = json.data.userDatasets || allUserDatasets;

            setUsers(cloudUsers);
            setAllUserDatasets(cloudDatasets);
            localStorage.setItem('self_tracker_registered_users', JSON.stringify(cloudUsers));
            localStorage.setItem('self_tracker_all_user_datasets', JSON.stringify(cloudDatasets));

            if (activeUser) {
              const currentInCloud = cloudUsers.find(u => u.id === activeUser.id);
              if (currentInCloud) setActiveUser(currentInCloud);
              if (cloudDatasets[activeUser.id]) setUserData(cloudDatasets[activeUser.id]);
            }

            setCloudStatus('Synced');
          }
        }
      } catch (err) {
        console.warn('Cloud sync offline, using local storage cache.');
        setCloudStatus('Local Only');
      } finally {
        setIsCloudSyncing(false);
      }
    };

    fetchCloudData();
  }, []);

  // Helper function to push state updates to Cloud Database
  const pushToCloud = async (updatedUsers, updatedDatasets) => {
    setIsCloudSyncing(true);
    try {
      await fetch(CLOUD_API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'selftracker_prod_v1',
          data: {
            users: updatedUsers || users,
            userDatasets: updatedDatasets || allUserDatasets
          }
        })
      });
      setCloudStatus('Synced');
    } catch (err) {
      console.warn('Failed cloud push:', err);
      setCloudStatus('Local Only');
    } finally {
      setIsCloudSyncing(false);
    }
  };

  // Load user data when active user changes
  useEffect(() => {
    if (activeUser) {
      localStorage.setItem('self_tracker_active_session', JSON.stringify(activeUser));
      const currentData = allUserDatasets[activeUser.id] || EMPTY_USER_DATA;
      setUserData(currentData);
    } else {
      localStorage.removeItem('self_tracker_active_session');
    }
  }, [activeUser, allUserDatasets]);

  // Save active user data changes to local & cloud
  const saveUserData = (newData) => {
    if (!activeUser) return;
    setUserData(newData);
    const updatedDatasets = {
      ...allUserDatasets,
      [activeUser.id]: newData
    };
    setAllUserDatasets(updatedDatasets);
    localStorage.setItem('self_tracker_all_user_datasets', JSON.stringify(updatedDatasets));
    
    pushToCloud(users, updatedDatasets);
  };

  // Update Existing Profile
  const updateUserProfile = ({ name, username, password, role, avatarColor }) => {
    if (!activeUser) return { success: false, message: 'No active profile to update!' };

    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    const exists = users.some(u => u.id !== activeUser.id && u.username.trim().toLowerCase() === cleanUsername);
    if (exists) {
      return { success: false, message: 'Username-kan horay ayaa loo isticmaalay! Dooro Username kale.' };
    }

    const updatedUser = {
      ...activeUser,
      name: name.trim() || activeUser.name,
      username: cleanUsername,
      password: cleanPassword,
      role: role.trim() || activeUser.role,
      avatarColor: avatarColor || activeUser.avatarColor
    };

    const updatedUsers = users.map(u => u.id === activeUser.id ? updatedUser : u);

    setUsers(updatedUsers);
    setActiveUser(updatedUser);

    localStorage.setItem('self_tracker_registered_users', JSON.stringify(updatedUsers));
    localStorage.setItem('self_tracker_active_session', JSON.stringify(updatedUser));

    setIsEditProfileModalOpen(false);

    pushToCloud(updatedUsers, allUserDatasets);

    return { success: true };
  };

  // Register New Account (Production Real System: Unlimited Users)
  const registerUser = ({ username, password, name, role, avatarColor }) => {
    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    const exists = users.some(u => u.username.trim().toLowerCase() === cleanUsername);
    if (exists) {
      return { success: false, message: 'Username-kan horay ayaa loo isticmaalay! Dooro Username kale.' };
    }

    const newUser = {
      id: 'u_' + Date.now(),
      username: cleanUsername,
      password: cleanPassword,
      name: name.trim() || cleanUsername,
      role: role.trim() || 'Personal Learner',
      avatarColor: avatarColor || '#6366f1'
    };

    const updatedUsers = [...users, newUser];
    const updatedDatasets = {
      ...allUserDatasets,
      [newUser.id]: EMPTY_USER_DATA
    };

    setUsers(updatedUsers);
    setAllUserDatasets(updatedDatasets);
    setActiveUser(newUser);
    setIsLoggedIn(true);

    localStorage.setItem('self_tracker_registered_users', JSON.stringify(updatedUsers));
    localStorage.setItem('self_tracker_all_user_datasets', JSON.stringify(updatedDatasets));
    localStorage.setItem('self_tracker_active_session', JSON.stringify(newUser));

    setIsLoginModalOpen(false);

    pushToCloud(updatedUsers, updatedDatasets);

    return { success: true };
  };

  // Authenticate / Login User with Username & Password
  const loginUser = (username, password) => {
    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    const found = users.find(
      u => u.username.trim().toLowerCase() === cleanUsername && u.password.trim() === cleanPassword
    );

    if (found) {
      setActiveUser(found);
      setIsLoggedIn(true);
      localStorage.setItem('self_tracker_active_session', JSON.stringify(found));
      setIsLoginModalOpen(false);
      return { success: true };
    } else {
      return { success: false, message: 'Username ama Password-ka aad gelisay waa xaqiiqdaro! Hubi amase Sign Up samayso.' };
    }
  };

  // Logout User Session
  const logoutUser = () => {
    setActiveUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('self_tracker_active_session');
  };

  // Switch Active User
  const switchUser = (user) => {
    setActiveUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('self_tracker_active_session', JSON.stringify(user));
    setIsLoginModalOpen(false);
  };

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // CRUD Operations for Daily Goals
  const addDailyGoal = (goal) => {
    const newGoals = [
      ...(userData.dailyGoals || []),
      { id: 'dg_' + Date.now(), completed: false, ...goal }
    ];
    saveUserData({ ...userData, dailyGoals: newGoals });
  };

  const toggleDailyGoal = (id) => {
    const newGoals = (userData.dailyGoals || []).map(g => 
      g.id === id ? { ...g, completed: !g.completed } : g
    );
    saveUserData({ ...userData, dailyGoals: newGoals });
  };

  const deleteDailyGoal = (id) => {
    const newGoals = (userData.dailyGoals || []).filter(g => g.id !== id);
    saveUserData({ ...userData, dailyGoals: newGoals });
  };

  // CRUD Operations for Monthly Goals
  const addMonthlyGoal = (goal) => {
    const newGoals = [
      ...(userData.monthlyGoals || []),
      { id: 'mg_' + Date.now(), currentProgress: 0, status: 'In Progress', ...goal }
    ];
    saveUserData({ ...userData, monthlyGoals: newGoals });
  };

  const updateMonthlyProgress = (id, progress) => {
    const newGoals = (userData.monthlyGoals || []).map(g => {
      if (g.id === id) {
        const isCompleted = progress >= g.targetProgress;
        return { ...g, currentProgress: progress, status: isCompleted ? 'Achieved' : 'In Progress' };
      }
      return g;
    });
    saveUserData({ ...userData, monthlyGoals: newGoals });
  };

  const deleteMonthlyGoal = (id) => {
    const newGoals = (userData.monthlyGoals || []).filter(g => g.id !== id);
    saveUserData({ ...userData, monthlyGoals: newGoals });
  };

  // CRUD Operations for Yearly Goals
  const addYearlyGoal = (goal) => {
    const newGoals = [
      ...(userData.yearlyGoals || []),
      { id: 'yg_' + Date.now(), progress: 0, achieved: false, ...goal }
    ];
    saveUserData({ ...userData, yearlyGoals: newGoals });
  };

  const toggleYearlyGoal = (id) => {
    const newGoals = (userData.yearlyGoals || []).map(g => 
      g.id === id ? { ...g, achieved: !g.achieved, progress: !g.achieved ? 100 : g.progress } : g
    );
    saveUserData({ ...userData, yearlyGoals: newGoals });
  };

  const deleteYearlyGoal = (id) => {
    const newGoals = (userData.yearlyGoals || []).filter(g => g.id !== id);
    saveUserData({ ...userData, yearlyGoals: newGoals });
  };

  // CRUD Operations for Online Courses
  const addCourse = (course) => {
    const newCourses = [
      ...(userData.courses || []),
      { id: 'c_' + Date.now(), progress: 0, status: 'In Progress', certificate: null, ...course }
    ];
    saveUserData({ ...userData, courses: newCourses });
  };

  const updateCourseProgress = (id, progress) => {
    const newCourses = (userData.courses || []).map(c => {
      if (c.id === id) {
        const isCompleted = Number(progress) === 100;
        return {
          ...c,
          progress: Number(progress),
          status: isCompleted ? 'Completed' : 'In Progress'
        };
      }
      return c;
    });
    saveUserData({ ...userData, courses: newCourses });
  };

  const uploadCertificate = (courseId, certDetails) => {
    const newCourses = (userData.courses || []).map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          progress: 100,
          status: 'Completed',
          certificate: {
            id: 'cert_' + Date.now(),
            ...certDetails
          }
        };
      }
      return c;
    });
    saveUserData({ ...userData, courses: newCourses });
  };

  const deleteCourse = (id) => {
    const newCourses = (userData.courses || []).filter(c => c.id !== id);
    saveUserData({ ...userData, courses: newCourses });
  };

  // CRUD Operations for Reminders
  const addReminder = (reminder) => {
    const newReminders = [
      ...(userData.reminders || []),
      { id: 'r_' + Date.now(), completed: false, ...reminder }
    ];
    saveUserData({ ...userData, reminders: newReminders });
  };

  const toggleReminder = (id) => {
    const newReminders = (userData.reminders || []).map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    );
    saveUserData({ ...userData, reminders: newReminders });
  };

  const deleteReminder = (id) => {
    const newReminders = (userData.reminders || []).filter(r => r.id !== id);
    saveUserData({ ...userData, reminders: newReminders });
  };

  return (
    <AppContext.Provider
      value={{
        users,
        activeUser,
        isLoggedIn,
        loginUser,
        logoutUser,
        registerUser,
        updateUserProfile,
        switchUser,
        theme,
        toggleTheme,
        userData,
        activeTab,
        setActiveTab,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isEditProfileModalOpen,
        setIsEditProfileModalOpen,
        selectedCertificate,
        setSelectedCertificate,
        isCloudSyncing,
        cloudStatus,

        // Goal actions
        addDailyGoal,
        toggleDailyGoal,
        deleteDailyGoal,
        addMonthlyGoal,
        updateMonthlyProgress,
        deleteMonthlyGoal,
        addYearlyGoal,
        toggleYearlyGoal,
        deleteYearlyGoal,

        // Course actions
        addCourse,
        updateCourseProgress,
        uploadCertificate,
        deleteCourse,

        // Reminder actions
        addReminder,
        toggleReminder,
        deleteReminder
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
