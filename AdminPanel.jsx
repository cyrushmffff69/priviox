import React from 'react';
import './AdminPanel.css'; 
export default function AdminPanel() {
  return (
    <div className="admin-panel">
      <h1 className="admin-title">
        Admin Panel <span role="img" aria-label="crown">👑</span>
      </h1>

      <p className="admin-subtitle">Welcome, CyRushMF69</p>

      <div className="admin-actions">
        <button className="admin-btn">Manage Users</button>
        <button className="admin-btn">AI Usage Stats</button>
        <button className="admin-btn">Moderation Tools</button>
        <button className="admin-btn">System Logs</button>
      </div>
    </div>
  );
}
