# 📝 Task Manager Application

A full-stack Task Manager application built with:

- **Frontend:** React + Vite
- **Backend:** Express.js + Sequelize + SQLite
- **Styling:** Bootstrap
- **Features:** Create, read, update, delete (CRUD) tasks, filter by status (pending, in progress, completed)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (or yarn)
- [SQLite](https://www.sqlite.org/index.html) (included via Sequelize)

---

## ⚙️ Setup

### 1. Clone the Repository

bash
git clone https://github.com/JoshStaff99/Task-Manager-Application.git
cd Task-Manager-Application

## 📁 Project Structure

Task-Manager-Application/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── app.js
│ ├── server.js
│ └── seedTasks.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── index.html
└── README.md

2. Setup Backend
cd backend
npm install

To Run Backend
node server.js

This will:

Sync the database
Seed initial task data
Start the server (default on http://localhost:5001, or whatever port you set)

3. Setup Frontend
cd ../frontend
npm install

To Run Frontend
npm run dev


The frontend runs on http://localhost:5173

4. Author JoshStaff99