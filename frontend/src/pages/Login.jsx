import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Generate mock token (JWT header/payload structure)
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ username, role: 'admin' }));
    const mockToken = `${header}.${payload}.signature`;
    
    login(mockToken);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      padding: '2rem'
    }}>
      <div className="glass-panel fade-in" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
          Welcome back
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          textAlign: 'center',
          marginBottom: '2rem',
          fontSize: '0.9rem'
        }}>
          Sign in to access your dashboard
        </p>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--error-color)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '8px',
            padding: '0.75rem',
            marginBottom: '1.5rem',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            id="login-username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
          <Input
            id="login-password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Button type="submit" style={{ width: '100%', marginTop: '1rem' }}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
