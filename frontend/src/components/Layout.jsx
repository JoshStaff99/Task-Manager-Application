import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="bg-light min-vh-100 min-vw-100">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary w-100">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Task Manager</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tasks">Tasks</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>


      <main className="px-4 py-4">
        {children}
      </main>
    </div>
  );
}

export default Layout;