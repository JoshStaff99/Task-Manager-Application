import React from 'react';

function TaskFilters({ current, onChange }) {
  const options = ['', 'pending', 'in-progress', 'completed'];

  return (
    <div className="mb-3">
      <label htmlFor="statusFilter" className="form-label">Filter by status:</label>
      <select
        id="statusFilter"
        className="form-select"
        value={current}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt === '' ? 'All' : opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TaskFilters;