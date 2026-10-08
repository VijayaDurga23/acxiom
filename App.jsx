import { useState } from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
)

const navGroups = [
  {
    label: 'Workspace',
    items: [
      { label: 'Dashboard', icon: 'bi-grid-1x2-fill', active: true },
      { label: 'Customers', icon: 'bi-people' },
      { label: 'Leads', icon: 'bi-person-lines-fill' },
      { label: 'Opportunities', icon: 'bi-bullseye' },
      { label: 'Follow-Ups', icon: 'bi-calendar-check' },
      { label: 'Activities', icon: 'bi-activity' },
    ],
  },
  {
    label: 'Management',
    items: [
      { label: 'Users & Roles', icon: 'bi-person-gear' },
      { label: 'Audit Log', icon: 'bi-shield-check' },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Reports', icon: 'bi-bar-chart' },
      { label: 'Settings', icon: 'bi-sliders' },
    ],
  },
]

const kpis = [
  { title: 'Total Customers', value: '1,248', trend: '+12.5%', icon: 'bi-people-fill', color: 'blue' },
  { title: 'Total Leads', value: '356', trend: '+8.2%', icon: 'bi-person-plus-fill', color: 'violet' },
  { title: 'Open Opportunities', value: '87', trend: '+4.6%', icon: 'bi-bullseye', color: 'orange' },
  { title: 'Won Opportunities', value: '42', trend: '+18.3%', icon: 'bi-trophy-fill', color: 'green' },
  { title: 'Lost Opportunities', value: '18', trend: '-2.1%', icon: 'bi-x-circle-fill', color: 'red', negative: true },
  { title: 'Total Pipeline Value', value: '₹24.6M', trend: '+14.8%', icon: 'bi-currency-rupee', color: 'teal' },
  { title: 'Open Leads', value: '214', trend: '+6.4%', icon: 'bi-chat-left-text-fill', color: 'indigo' },
  { title: 'Pending Follow-Ups', value: '36', trend: 'Needs attention', icon: 'bi-clock-fill', color: 'yellow', warning: true },
]

const activities = [
  { icon: 'bi-person-plus-fill', color: 'blue', text: 'Admin User created a new customer', time: '2 minutes ago' },
  { icon: 'bi-lightning-fill', color: 'violet', text: 'Sales Executive created a new lead', time: '15 minutes ago' },
  { icon: 'bi-pencil-fill', color: 'orange', text: 'Manager updated an opportunity', time: '1 hour ago' },
  { icon: 'bi-check-lg', color: 'green', text: 'Admin User completed a follow-up', time: '2 hours ago' },
]

const followUps = [
  { company: 'Acme Corporation', type: 'Call', date: 'Today - 4:00 PM', icon: 'bi-telephone-fill', color: 'blue' },
  { company: 'Tech Solutions Ltd', type: 'Meeting', date: 'Tomorrow - 10:30 AM', icon: 'bi-camera-video-fill', color: 'violet' },
  { company: 'Global Enterprises', type: 'Email', date: 'Tomorrow - 3:00 PM', icon: 'bi-envelope-fill', color: 'orange' },
]

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { padding: 10, cornerRadius: 8 } },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#8a94a6', font: { size: 11 } } },
    y: { grid: { color: '#eef1f5' }, border: { display: false }, ticks: { color: '#8a94a6', font: { size: 11 } } },
  },
}

function Brand({ compact = false }) {
  return <div className={`brand ${compact ? 'brand-compact' : ''}`}><span className="brand-mark">A</span><span>Acxiom<span className="brand-accent">CRM</span></span></div>
}

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [errors, setErrors] = useState({})

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!form.email.trim()) nextErrors.email = 'Email or username is required.'
    else if (form.email.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.password) nextErrors.password = 'Password is required.'
    setErrors(nextErrors)
    if (!Object.keys(nextErrors).length) onLogin()
  }

  return (
    <main className="login-page">
      <div className="login-decoration decoration-one" />
      <div className="login-decoration decoration-two" />
      <section className="login-card">
        <div className="login-brand"><Brand /></div>
        <div className="login-heading">
          <span className="eyebrow">WELCOME BACK</span>
          <h1>Sign in to your workspace</h1>
          <p>Enter your details to continue to your CRM dashboard.</p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <label className="form-label" htmlFor="email">Email / Username</label>
          <div className={`input-wrap ${errors.email ? 'has-error' : ''}`}><i className="bi bi-envelope" /><input id="email" type="text" placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          {errors.email && <div className="field-error">{errors.email}</div>}
          <label className="form-label mt-3" htmlFor="password">Password</label>
          <div className={`input-wrap ${errors.password ? 'has-error' : ''}`}><i className="bi bi-lock" /><input id="password" type="password" placeholder="Enter your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
          {errors.password && <div className="field-error">{errors.password}</div>}
          <div className="login-options"><label className="remember"><input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} /> <span>Remember me</span></label><a href="#forgot" onClick={(e) => e.preventDefault()}>Forgot Password?</a></div>
          <button className="btn btn-primary w-100 login-button" type="submit">Sign in <i className="bi bi-arrow-right ms-2" /></button>
        </form>
        <p className="login-footer">© 2025 AcxiomCRM. Built for better relationships.</p>
      </section>
    </main>
  )
}

function Sidebar({ open, onClose, onLogout }) {
  return <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
    <div className="sidebar-top"><Brand compact /><button className="sidebar-close d-lg-none" onClick={onClose} aria-label="Close navigation"><i className="bi bi-x-lg" /></button></div>
    <nav className="sidebar-nav">
      {navGroups.map((group) => <div className="nav-group" key={group.label}><div className="nav-label">{group.label}</div>{group.items.map((item) => <button key={item.label} className={`nav-item ${item.active ? 'active' : ''}`} onClick={onClose}><i className={`bi ${item.icon}`} /><span>{item.label}</span>{item.label !== 'Dashboard' && <span className="nav-soon">Soon</span>}</button>)}</div>)}
    </nav>
    <button className="nav-item logout" onClick={onLogout}><i className="bi bi-box-arrow-left" /><span>Logout</span></button>
    <div className="sidebar-help"><i className="bi bi-headset" /><div><strong>Need help?</strong><span>Contact support</span></div><i className="bi bi-arrow-up-right" /></div>
  </aside>
}

function Header({ onMenu, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false)
  return <header className="topbar"><button className="menu-button" onClick={onMenu} aria-label="Open navigation"><i className="bi bi-list" /></button><div className="topbar-search"><i className="bi bi-search" /><input placeholder="Search anything..." aria-label="Search" /><span className="search-shortcut">⌘ K</span></div><div className="topbar-actions"><button className="icon-button notification" aria-label="Notifications"><i className="bi bi-bell" /><span /></button><div className="profile-wrap"><button className="profile-button" onClick={() => setProfileOpen(!profileOpen)}><span className="avatar">AU</span><span className="profile-copy"><strong>Admin User</strong><small>Administrator</small></span><i className="bi bi-chevron-down" /></button>{profileOpen && <div className="profile-menu"><button><i className="bi bi-person" /> Profile</button><button><i className="bi bi-gear" /> Settings</button><button onClick={onLogout}><i className="bi bi-box-arrow-left" /> Logout</button></div>}</div></div></header>
}

function KpiCard({ item }) {
  return <article className="kpi-card"><div className={`kpi-icon ${item.color}`}><i className={`bi ${item.icon}`} /></div><div className="kpi-info"><span>{item.title}</span><strong>{item.value}</strong><small className={item.negative ? 'negative' : item.warning ? 'warning' : ''}><i className={`bi ${item.warning ? 'bi-exclamation-circle' : item.negative ? 'bi-arrow-down-right' : 'bi-arrow-up-right'}`} /> {item.trend}</small></div><i className="bi bi-three-dots kpi-menu" /></article>
}

function Dashboard() {
  const leadData = { labels: ['New', 'Contacted', 'Qualified', 'Lost', 'Converted'], datasets: [{ data: [86, 64, 52, 38, 42], backgroundColor: ['#4d7cff', '#9b7bff', '#f5a44b', '#f06e81', '#39c69a'], borderWidth: 0, borderRadius: 5, barThickness: 18 }] }
  const opportunityData = { labels: ['Qualification', 'Proposal', 'Negotiation', 'Won', 'Lost'], datasets: [{ data: [42, 30, 22, 18, 9], backgroundColor: ['#537cff', '#8c74f5', '#f0a24d', '#36c594', '#ed7081'], borderWidth: 0, borderRadius: 4, barThickness: 18 }] }
  const salesData = { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], datasets: [{ data: [38, 46, 42, 61, 55, 74], borderColor: '#4d7cff', backgroundColor: 'rgba(77,124,255,.12)', fill: true, tension: .4, pointRadius: 4, pointBackgroundColor: '#fff', pointBorderWidth: 2 }] }
  const doughnutOptions = { ...chartOptions, cutout: '72%', scales: {} }
  return <div className="dashboard-content"><div className="page-heading"><div><span className="eyebrow">OVERVIEW</span><h1>Dashboard</h1><p>Overview of your CRM activities and sales performance.</p></div><div className="date-filter"><i className="bi bi-calendar3" /><select defaultValue="This Month" aria-label="Date range"><option>Today</option><option>This Week</option><option>This Month</option><option>Custom Range</option></select><i className="bi bi-chevron-down" /></div></div>
    <div className="kpi-grid">{kpis.map((item) => <KpiCard item={item} key={item.title} />)}</div>
    <div className="section-heading"><div><h2>Performance overview</h2><p>Track your sales funnel and team progress.</p></div><button className="outline-button">View reports <i className="bi bi-arrow-up-right" /></button></div>
    <div className="charts-grid"><ChartCard title="Lead status" subtitle="Current lead distribution"><div className="doughnut-wrap"><Doughnut data={leadData} options={doughnutOptions} /><div className="chart-center"><strong>356</strong><span>Total leads</span></div></div><LegendList labels={leadData.labels} colors={leadData.datasets[0].backgroundColor} values={leadData.datasets[0].data} /></ChartCard><ChartCard title="Opportunity pipeline" subtitle="Opportunities by stage"><div className="chart-box"><Bar data={opportunityData} options={chartOptions} /></div></ChartCard><ChartCard title="Monthly sales" subtitle="Revenue generated this year" action="Last 6 months"><div className="chart-box line-chart"><Line data={salesData} options={chartOptions} /></div></ChartCard></div>
    <div className="bottom-grid"><ActivityCard /><FollowUpCard /></div>
  </div>
}

function ChartCard({ title, subtitle, children, action }) { return <article className="panel chart-card"><div className="panel-heading"><div><h3>{title}</h3><p>{subtitle}</p></div>{action && <button className="chart-action">{action} <i className="bi bi-chevron-down" /></button>}</div>{children}</article> }
function LegendList({ labels, colors, values }) { return <div className="chart-legend">{labels.map((label, index) => <div key={label}><span className="legend-dot" style={{ background: colors[index] }} />{label}<strong>{values[index]}</strong></div>)}</div> }
function ActivityCard() { return <article className="panel activity-panel"><div className="panel-heading"><div><h3>Recent activities</h3><p>Stay up to date with your team's work.</p></div><button className="text-button">View all <i className="bi bi-arrow-right" /></button></div><div className="activity-list">{activities.map((item) => <div className="activity-item" key={item.text}><span className={`activity-icon ${item.color}`}><i className={`bi ${item.icon}`} /></span><div><strong>{item.text}</strong><small>{item.time}</small></div></div>)}</div></article> }
function FollowUpCard() { return <article className="panel followup-panel"><div className="panel-heading"><div><h3>Upcoming follow-ups</h3><p>Your next scheduled activities.</p></div><button className="text-button">View all <i className="bi bi-arrow-right" /></button></div><div className="followup-list">{followUps.map((item) => <div className="followup-item" key={item.company}><span className={`followup-icon ${item.color}`}><i className={`bi ${item.icon}`} /></span><div><strong>{item.company}</strong><small>{item.type} <span>•</span> {item.date}</small></div><i className="bi bi-chevron-right followup-arrow" /></div>)}</div></article> }

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  if (!authenticated) return <Login onLogin={() => setAuthenticated(true)} />
  return <div className="app-shell"><Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={() => setAuthenticated(false)} /><div className="main-area"><Header onMenu={() => setSidebarOpen(true)} onLogout={() => setAuthenticated(false)} /><Dashboard /></div>{sidebarOpen && <button className="sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-label="Close navigation overlay" />}</div>
}

export default App
