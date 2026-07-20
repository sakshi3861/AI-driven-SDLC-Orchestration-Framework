import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Welcome to Dashboard</h1>
          <p style={styles.subtitle}>You have successfully authenticated via JWT.</p>
        </div>

        <div style={styles.profileBox}>
          <h3 style={styles.profileHeader}>Authenticated User Details</h3>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>User ID:</span>
            <span style={styles.detailValue}>{user?.id || 'N/A'}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Email Address:</span>
            <span style={styles.detailValue}>{user?.email || 'N/A'}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>System Role:</span>
            <span style={styles.badge}>{user?.role || 'customer'}</span>
          </div>
        </div>

        <button onClick={handleLogout} style={styles.logoutButton}>
          Log Out
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: '20px',
  },
  card: {
    background: 'rgba(30, 41, 59, 0.85)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
    padding: '40px',
    width: '100%',
    maxWidth: '500px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#f8fafc',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#94a3b8',
    margin: 0,
  },
  profileBox: {
    backgroundColor: '#0f172a',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #334155',
    marginBottom: '28px',
  },
  profileHeader: {
    margin: '0 0 16px 0',
    fontSize: '16px',
    color: '#cbd5e1',
    borderBottom: '1px solid #1e293b',
    paddingBottom: '8px',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
  },
  detailLabel: {
    color: '#64748b',
    fontSize: '14px',
  },
  detailValue: {
    color: '#f8fafc',
    fontSize: '14px',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  logoutButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ef4444',
    backgroundColor: 'transparent',
    color: '#ef4444',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};
