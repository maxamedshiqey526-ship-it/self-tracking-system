import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Default starter accounts if none exist in localStorage
const DEFAULT_ACCOUNTS = [
  { id: 'u1', username: 'admin', password: '123', name: 'Primary User', role: 'Personal Growth Tracker', avatarColor: '#6366f1' }
];

// Clean empty initial data structure for new user accounts
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
  
  // Registered Accounts State
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('self_tracker_registered_users');
    return saved ? JSON.parse(saved) : DEFAULT_ACCOUNTS;
  });

  // Active Logged-in User State
  const [activeUser, setActiveUser] = useState(() => {
    const saved = localStorage.getItem('self_tracker_active_user');
    return saved ? JSON.parse(saved) : (users[0] || DEFAULT_ACCOUNTS[0]);
  });

  // Data per active logged-in user
  const [userData, setUserData] = useState(() => {
    const savedUser = localStorage.getItem('self_tracker_active_user');
    const userId = savedUser ? JSON.parse(savedUser).id : 'u1';
    const storedData = localStorage.getItem(`self_tracker_data_${userId}`);
    return storedData ? JSON.parse(storedData) : EMPTY_USER_DATA;
  });

  // Modal Control & View States
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Sync theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('self_tracker_theme', theme);
  }, [theme]);

  // Persist registered users list immediately
  useEffect(() => {
    localStorage.setItem('self_tracker_registered_users', JSON.stringify(users));
  }, [users]);

  // Load user data when active user changes
  useEffect(() => {
    if (activeUser) {
      localStorage.setItem('self_tracker_active_user', JSON.stringify(activeUser));
      const storedData = localStorage.getItem(`self_tracker_data_${activeUser.id}`);
      if (storedData) {
        setUserData(JSON.parse(storedData));
      } else {
        setUserData(EMPTY_USER_DATA);
        localStorage.setItem(`self_tracker_data_${activeUser.id}`, JSON.stringify(EMPTY_USER_DATA));
      }
    }
  }, [activeUser]);

  // Save user data changes to localStorage
  const saveUserData = (newData) => {
    setUserData(newData);
    if (activeUser) {
      localStorage.setItem(`self_tracker_data_${activeUser.id}`, JSON.stringify(newData));
    }
  };

  // Register New Account
  const registerUser = ({ username, password, name, role, avatarColor }) => {
    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Check if username already exists
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
    setUsers(updatedUsers);
    localStorage.setItem('self_tracker_registered_users', JSON.stringify(updatedUsers));

    setActiveUser(newUser);
    localStorage.setItem('self_tracker_active_user', JSON.stringify(newUser));
    localStorage.setItem(`self_tracker_data_${newUser.id}`, JSON.stringify(EMPTY_USER_DATA));
    setUserData(EMPTY_USER_DATA);

    setIsLoginModalOpen(false);
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
      setIsLoginModalOpen(false);
      return { success: true };
    } else {
      return { success: false, message: 'Username ama Password-ka aad gelisay waa xaqiiqdaro! Hubi amase Sign Up samayso.' };
    }
  };

  // Switch Active User
  const switchUser = (user) => {
    setActiveUser(user);
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
        registerUser,
        loginUser,
        switchUser,
        theme,
        toggleTheme,
        userData,
        activeTab,
        setActiveTab,
        isLoginModalOpen,
        setIsLoginModalOpen,
        selectedCertificate,
        setSelectedCertificate,

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
