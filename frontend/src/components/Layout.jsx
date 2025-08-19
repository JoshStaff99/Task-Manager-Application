import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="bg-light min-vh-100 min-vw-100">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary w-100">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Task Manager</Link>

            {/* Burger Button */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Collapsible Menu */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tasks">Tasks</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create">Create Task</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className="px-4 py-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;