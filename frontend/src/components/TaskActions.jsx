import React from 'react';

function TaskActions({ onView, onEdit, onDelete }) {
  return (
    <div className="d-flex justify-content-center gap-2">
      <button 
        className="btn btn-sm btn-outline-secondary"
        onClick={onView}
      >
        View
      </button>
      <button 
        className="btn btn-sm btn-outline-primary"
        onClick={onEdit}
      >
        Edit
      </button>
      <button 
        className="btn btn-sm btn-outline-danger"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskActions;