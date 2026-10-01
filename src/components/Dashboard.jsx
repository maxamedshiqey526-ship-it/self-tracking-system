import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Award, Bell, BookOpen, CalendarDays, Check, ChevronRight, Circle, Flame, GraduationCap, Plus, Sparkles, Target, Trophy, Zap } from 'lucide-react';

const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const Dashboard = () => {
  const { activeUser, userData, toggleDailyGoal, setActiveTab, setSelectedCertificate } = useApp();
  const dailyGoals = userData?.dailyGoals || [];
  const courses = userData?.courses || [];
  const reminders = userData?.reminders || [];
  const completedDaily = dailyGoals.filter((goal) => goal.completed).length;
  const dailyProgress = dailyGoals.length ? Math.round((completedDaily / dailyGoals.length) * 100) : 0;
  const completedCourses = courses.filter((course) => course.status === 'Completed').length;
  const pendingReminders = reminders.filter((reminder) => !reminder.completed);
  const nextGoal = dailyGoals.find((goal) => !goal.completed);
  const focusScore = Math.round((dailyProgress * 0.65) + (courses.length ? (completedCourses / courses.length) * 35 : 0));
  const firstName = activeUser?.name?.split(' ')[0] || 'Saxiib';
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());
  const weeklyActivity = dayLabels.map((day, index) => ({ day, active: index < 4 ? Math.max(1, Math.min(4, Math.ceil(dailyProgress / 25) - (3 - index))) : 0 }));

  return <div className="dashboard-shell">
    <section className="hero-command">
      <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
      <div className="hero-copy">
        <div className="eyebrow"><Sparkles size={14} /> YOUR PERSONAL COMMAND CENTER</div>
        <p className="hero-date">{today}</p>
        <h1>Subax wanaagsan, <span>{firstName}</span>.</h1>
        <p className="hero-description">Hal tallaabo oo aad maanta qaaddo ayaa dhisaysa nolosha aad rabto. Aan ka dhigno maalin wax ku ool ah.</p>
        <div className="hero-actions"><button className="btn btn-primary" onClick={() => setActiveTab('goals')}><Plus size={16} /> Add a goal</button><button className="hero-link" onClick={() => setActiveTab('calendar')}>View your schedule <ArrowRight size={15} /></button></div>
      </div>
      <div className="focus-score" aria-label={`Focus score ${focusScore} percent`}><div className="focus-ring" style={{ '--score': `${focusScore * 3.6}deg` }}><div><strong>{focusScore}</strong><span>/100</span></div></div><div className="focus-label"><Zap size={15} /> Focus score</div><p>{dailyGoals.length ? (focusScore >= 70 ? 'Great momentum today' : 'A strong start awaits') : 'Add goals to begin'}</p></div>
    </section>

    <section className="metric-strip">
      <div className="metric"><div className="metric-icon blue"><Target size={19} /></div><div><strong>{completedDaily}<em>/{dailyGoals.length}</em></strong><span>Daily goals done</span></div></div>
      <div className="metric"><div className="metric-icon amber"><Flame size={19} /></div><div><strong>{dailyGoals.length ? Math.max(1, completedDaily) : 0}<em> days</em></strong><span>Current streak</span></div></div>
      <div className="metric"><div className="metric-icon violet"><GraduationCap size={19} /></div><div><strong>{completedCourses}<em>/{courses.length}</em></strong><span>Courses finished</span></div></div>
      <div className="metric"><div className="metric-icon rose"><Bell size={19} /></div><div><strong>{pendingReminders.length}</strong><span>Open reminders</span></div></div>
    </section>

    <div className="command-grid">
      <section className="command-card today-card"><div className="command-heading"><div><span className="section-kicker">TODAY'S PLAN</span><h2>Keep your promises</h2></div><button className="text-action" onClick={() => setActiveTab('goals')}>See all <ChevronRight size={16} /></button></div><div className="completion-line"><span>{completedDaily} of {dailyGoals.length || 0} complete</span><span>{dailyProgress}%</span></div><div className="large-progress"><i style={{ width: `${dailyProgress}%` }} /></div><div className="task-list">{dailyGoals.length ? dailyGoals.slice(0, 4).map((goal) => <button className={`task-row ${goal.completed ? 'is-complete' : ''}`} key={goal.id} onClick={() => toggleDailyGoal(goal.id)}><span className="task-check">{goal.completed ? <Check size={14} /> : <Circle size={16} />}</span><span className="task-copy"><strong>{goal.title}</strong><small>{goal.time || 'Anytime'} · {goal.category || 'Personal'}</small></span><span className={`priority-dot ${goal.priority || 'medium'}`} /></button>) : <div className="empty-state"><Target size={25} /><p>Maanta wali yool ma dejin.</p><button onClick={() => setActiveTab('goals')}>Create your first goal</button></div>}</div>{nextGoal && <div className="next-up"><span><Zap size={14} /> NEXT UP</span><strong>{nextGoal.title}</strong><button onClick={() => toggleDailyGoal(nextGoal.id)}>Mark done <Check size={14} /></button></div>}</section>
      <section className="command-card momentum-card"><div className="command-heading"><div><span className="section-kicker">WEEKLY RHYTHM</span><h2>Show up, then grow</h2></div><span className="weekly-total"><Flame size={14} /> {completedDaily} wins</span></div><div className="week-chart">{weeklyActivity.map((item, index) => <div className="week-day" key={`${item.day}-${index}`}><div className="bar-track"><i style={{ height: `${item.active * 22}%` }} /></div><span>{item.day}</span></div>)}</div><div className="momentum-note"><div className="note-icon"><Trophy size={17} /></div><div><strong>Your momentum matters.</strong><p>{dailyProgress ? `You've completed ${dailyProgress}% of today's plan.` : 'Your next small win starts with one goal.'}</p></div></div><button className="outline-action" onClick={() => setActiveTab('goals')}>Explore your goals <ArrowRight size={15} /></button></section>
    </div>

    <div className="command-grid lower-grid">
      <section className="command-card course-card"><div className="command-heading"><div><span className="section-kicker">LEARNING PATH</span><h2>Continue learning</h2></div><button className="text-action" onClick={() => setActiveTab('courses')}>All courses <ChevronRight size={16} /></button></div>{courses.length ? courses.slice(0, 2).map((course) => <div className="course-row" key={course.id}><div className="course-mark"><BookOpen size={18} /></div><div className="course-copy"><strong>{course.title}</strong><span>{course.platform || 'Online learning'} · {course.hours || 0} hours</span><div className="mini-progress"><i style={{ width: `${course.progress || 0}%` }} /></div></div><div className="course-percent">{course.progress || 0}%</div>{course.certificate && <button className="certificate-button" onClick={() => setSelectedCertificate(course.certificate)}><Award size={14} /></button>}</div>) : <div className="empty-inline"><GraduationCap size={24} /><div><strong>Build your learning path</strong><p>Track courses and celebrate each certificate.</p></div><button onClick={() => setActiveTab('courses')}><Plus size={15} /></button></div>}</section>
      <section className="command-card reminder-card"><div className="command-heading"><div><span className="section-kicker">COMING UP</span><h2>Don't lose track</h2></div><button className="text-action" onClick={() => setActiveTab('calendar')}>Calendar <CalendarDays size={16} /></button></div>{pendingReminders.length ? pendingReminders.slice(0, 2).map((reminder) => <div className="reminder-row" key={reminder.id}><div className={`reminder-date ${reminder.urgency === 'Critical' ? 'critical' : ''}`}><span>{reminder.date?.split(' ')[0] || 'UP'}</span><strong>{reminder.date?.split(' ')[1] || 'NEXT'}</strong></div><div><strong>{reminder.title}</strong><p>{reminder.time || 'No time set'} · {reminder.urgency || 'Scheduled'}</p></div></div>) : <div className="empty-inline"><CalendarDays size={24} /><div><strong>Your schedule is clear</strong><p>Add a reminder so important moments stay visible.</p></div><button onClick={() => setActiveTab('calendar')}><Plus size={15} /></button></div>}</section>
    </div>
  </div>;
};
