import React from 'react';

function TaskActions({ onView, onEdit, onDelete }) {
  return (
    <div>
      {/* Inline buttons on medium and up */}
      <div className="d-none d-md-flex justify-content-center gap-2">
        <button className="btn btn-sm btn-outline-secondary" onClick={onView}>
          View
        </button>
        <button className="btn btn-sm btn-outline-primary" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
          Delete
        </button>
      </div>

      {/* Dropdown on small screens */}
      <div className="d-md-none mt-2">
        <div className="dropdown w-100">
          <button
            className="btn btn-outline-primary dropdown-toggle w-100"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Actions
          </button>
          <ul className="dropdown-menu w-100">
            <li>
              <button className="dropdown-item" onClick={onView}>
                View
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={onEdit}>
                Edit
              </button>
            </li>
            <li>
              <button className="dropdown-item text-danger" onClick={onDelete}>
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TaskActions;