import React, { useState, useEffect } from 'react';

function TaskForm({ initialData = {}, onSubmit, loading = false, error = '', submitLabel = 'Save' }) {
	const [title, setTitle] = useState(initialData.title || '');
	const [description, setDescription] = useState(initialData.description || '');
	const [status, setStatus] = useState(initialData.status || 'pending');
	const [localError, setLocalError] = useState('');

	useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
        setTitle(initialData.title || '');
        setDescription(initialData.description || '');
        setStatus(initialData.status || 'pending');
    }
    }, [initialData]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) {
			setLocalError('Title is required.');
			return;
		}
		setLocalError('');
		onSubmit({ title, description, status });
	};

	return (
		<form onSubmit={handleSubmit} className="mt-4">
			{(error || localError) && <div className="alert alert-danger">{error || localError}</div>}

			<div className="mb-3">
				<label htmlFor="title" className="form-label">Title</label>
				<input
					type="text"
					id="title"
					className="form-control"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="description" className="form-label">Description</label>
				<textarea
					id="description"
					className="form-control"
					rows="3"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="status" className="form-label">Status</label>
				<select
					id="status"
					className="form-select"
					value={status}
					onChange={(e) => setStatus(e.target.value)}
					required
				>
					<option value="pending">Pending</option>
					<option value="in-progress">In Progress</option>
					<option value="completed">Completed</option>
				</select>
			</div>

			<button type="submit" className="btn btn-primary" disabled={loading}>
				{loading ? 'Saving...' : submitLabel}
			</button>
		</form>
	);
}

export default TaskForm;
