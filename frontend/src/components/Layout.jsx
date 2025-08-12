import React from 'react';

function Layout({ children }) {
  return (
    <div className="bg-light min-vh-100">
      <header className="bg-primary text-white py-3 mb-4">
        <div className="container">
          <h1 className="h3 mb-0">Task Manager</h1>
        </div>
      </header>

      <main className="container">
        {children}
      </main>
    </div>
  );
}

export default Layout;