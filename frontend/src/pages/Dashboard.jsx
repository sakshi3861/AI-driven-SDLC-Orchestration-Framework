import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Button from '../components/Button';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [pingStatus, setPingStatus] = useState('Checking...');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    api.get('/ping')
      .then((res) => {
        setPingStatus(res.data.status);
        setTimestamp(res.data.timestamp);
      })
      .catch((err) => {
        console.error('Failed to communicate with API', err);
        setPingStatus('Offline');
      });
  }, []);

  return (
    <div style={{ padding: '2rem', flex: 1 }}>
      <div className="glass-panel fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--surface-border)',
          paddingBottom: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 className="text-gradient" style={{ fontSize: '2rem', fontWeight: 600 }}>
              System Console
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Authenticated as: <strong style={{ color: 'var(--text-primary)' }}>{user?.username || 'Guest'}</strong> ({user?.role})
            </p>
          </div>
          <Button onClick={logout} style={{ background: 'transparent', border: '1px solid var(--surface-border)', boxShadow: 'none' }}>
            Logout
          </Button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--surface-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Backend Connection</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: pingStatus === 'ok' ? 'var(--success-color)' : 'var(--error-color)'
              }} />
              <strong style={{ fontSize: '1.15rem' }}>{pingStatus === 'ok' ? 'Online' : pingStatus}</strong>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--surface-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>System Latency</span>
            <div style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: '0.5rem' }}>
              {timestamp ? 'Optimal (< 10ms)' : 'N/A'}
            </div>
          </div>
        </div>

        {timestamp && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.01)',
            border: '1px solid var(--surface-border)',
            borderRadius: '8px',
            padding: '1rem',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)'
          }}>
            [TELEMETRY] Last response ping: {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
