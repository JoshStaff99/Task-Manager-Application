import React from 'react';

function TaskActions({ onEdit, onDelete }) {
  return (
    <div className="d-flex">
      <button 
        className="btn btn-sm btn-outline-primary me-2"
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