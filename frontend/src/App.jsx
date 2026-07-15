import React, { useState, useEffect } from 'react';

function App() {
  const [pingStatus, setPingStatus] = useState('checking'); // 'checking' | 'online' | 'offline'
  const [pingData, setPingData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const checkBackend = async () => {
    setPingStatus('checking');
    try {
      const response = await fetch('/api/ping');
      if (response.ok) {
        const data = await response.json();
        setPingStatus('online');
        setPingData(data);
      } else {
        setPingStatus('offline');
        setPingData(null);
      }
    } catch (error) {
      setPingStatus('offline');
      setPingData(null);
    }
  };

  useEffect(() => {
    checkBackend();
  }, []);

  return (
    <>
      <div className="glow-container">
        <div className="glow-circle glow-circle-1"></div>
        <div className="glow-circle glow-circle-2"></div>
      </div>

      <div className="app-container">
        <header>
          <div className="logo">
            <span className="logo-icon">S</span>
            Skeleton App
          </div>
          <nav>
            <ul>
              <li>
                <a 
                  href="#overview" 
                  className={activeTab === 'overview' ? 'active' : ''} 
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </a>
              </li>
              <li>
                <a 
                  href="#architecture" 
                  className={activeTab === 'architecture' ? 'active' : ''} 
                  onClick={() => setActiveTab('architecture')}
                >
                  Architecture
                </a>
              </li>
            </ul>
          </nav>
          <div className="status-indicator">
            <span className={`status-dot ${pingStatus}`}></span>
            Backend: {pingStatus.toUpperCase()}
          </div>
        </header>

        <main>
          {activeTab === 'overview' ? (
            <>
              <section className="hero">
                <span className="badge">System Stack Active</span>
                <h1>Generic Application Blueprint</h1>
                <p>
                  A featureless, domain-agnostic development shell compiled with standard configurations. 
                  Ready for project implementation.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button className="btn btn-primary" onClick={checkBackend}>
                    Verify Connection
                  </button>
                  <a href="#architecture" className="btn btn-secondary" onClick={() => setActiveTab('architecture')}>
                    View Architecture
                  </a>
                </div>
              </section>

              <div className="grid">
                <div className="card">
                  <div className="card-title">
                    <span className="card-icon">⚡</span>
                    Core Backend Stack
                  </div>
                  <div className="card-content">
                    <p style={{ marginBottom: '0.75rem' }}><strong>Framework:</strong> Node.js / Express.js</p>
                    <p style={{ marginBottom: '0.75rem' }}><strong>Database Client:</strong> pg (PostgreSQL Driver)</p>
                    <p style={{ marginBottom: '0.75rem' }}><strong>HTTP Status:</strong> {pingStatus === 'online' ? 'Active' : 'Offline'}</p>
                    {pingData && (
                      <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                        <div>Response: {pingData.message}</div>
                        <div>Uptime: {Math.round(pingData.uptime)}s</div>
                        <div>Time: {new Date(pingData.timestamp).toLocaleTimeString()}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card">
                  <div className="card-title">
                    <span className="card-icon">🎨</span>
                    Core Frontend Stack
                  </div>
                  <div className="card-content">
                    <p style={{ marginBottom: '0.75rem' }}><strong>Library:</strong> React.js (Vite Bundle)</p>
                    <p style={{ marginBottom: '0.75rem' }}><strong>Routing:</strong> React Router v6</p>
                    <p style={{ marginBottom: '0.75rem' }}><strong>Aesthetics:</strong> CSS Grid & Flexbox, Outfit Font, Glassmorphism</p>
                    <p style={{ marginBottom: '0.75rem' }}><strong>Performance:</strong> Fast Refresh Enabled</p>
                  </div>
                </div>

                <div className="card">
                  <div className="card-title">
                    <span className="card-icon">🔒</span>
                    Environment Config
                  </div>
                  <div className="card-content">
                    <p style={{ marginBottom: '0.75rem' }}><strong>Env Config:</strong> <code>.env.example</code> (Template Created)</p>
                    <p style={{ marginBottom: '0.75rem' }}><strong>Database Port:</strong> 5432</p>
                    <p style={{ marginBottom: '0.75rem' }}><strong>Server Port:</strong> 3000</p>
                    <p style={{ marginBottom: '0.75rem' }}><strong>Origin Policy:</strong> CORS Configured</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <section style={{ margin: '2rem 0' }}>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>Skeleton Structure</h2>
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                Strict separation of concerns using industry-standard directories. Completely domain-agnostic layout.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="card">
                  <div className="card-title">
                    <span className="card-icon">📁</span>
                    Backend Directory
                  </div>
                  <div className="card-content" style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                    <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>backend/</div>
                    <div>├── src/</div>
                    <div>│   ├── config/ (database.js)</div>
                    <div>│   ├── controllers/ (pingController.js)</div>
                    <div>│   ├── middleware/ (index.js)</div>
                    <div>│   ├── routes/ (index.js)</div>
                    <div>│   ├── app.js</div>
                    <div>│   └── index.js</div>
                    <div>├── tests/ (app.test.js)</div>
                    <div>├── .env.example</div>
                    <div>└── package.json</div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-title">
                    <span className="card-icon">📁</span>
                    Frontend Directory
                  </div>
                  <div className="card-content" style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                    <div style={{ color: 'var(--accent)', fontWeight: 'bold' }}>frontend/</div>
                    <div>├── public/</div>
                    <div>├── src/</div>
                    <div>│   ├── assets/</div>
                    <div>│   ├── components/</div>
                    <div>│   ├── context/</div>
                    <div>│   ├── pages/</div>
                    <div>│   ├── services/</div>
                    <div>│   ├── App.jsx</div>
                    <div>│   ├── index.css</div>
                    <div>│   └── main.jsx</div>
                    <div>├── .env.example</div>
                    <div>├── index.html</div>
                    <div>├── vite.config.js</div>
                    <div>└── package.json</div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                <button className="btn btn-secondary" onClick={() => setActiveTab('overview')}>
                  &larr; Back to Overview
                </button>
              </div>
            </section>
          )}
        </main>

        <footer>
          <p>&copy; 2026 Boilerplate Codebase. Generated for Workspace Integration.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
