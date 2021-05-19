import React, { useState, useEffect } from 'react';
import TodoForm from '../Forms/TodoForm';
import useTodo from '../CustomHooks/useTodo';
import './todo.css';

export default function Todo() {
	let [allTodos, setAllTodos] = useState([]);
	let [editing, setEditing] = useState(false);
	let [itemToEdit, setItemToEdit] = useState([]);
	let [newTodo, setNewTodo] = useState(false);
	let [deleted, setDeleted] = useState(false);
	let [newUpdate, setNewUpdate] = useState(false);

	const editCallback = edit => {
		setItemToEdit(edit);
	};

	const { handleDelete, handleEdit, handleUpdate, handleChange } = useTodo(editCallback);

	useEffect(() => {
		fetch(`http://localhost:4000/api/todos/${localStorage._id}/getTodos`)
			.then(response => response.json())
			.then(json => setAllTodos(json));
	}, []);

	useEffect(() => {
		if (newTodo) {
			fetch(`http://localhost:4000/api/todos/${localStorage._id}/getTodos`)
				.then(response => response.json())
				.then(json => setAllTodos(json))
				.then(setNewTodo(false));
		}
		if (deleted) {
			fetch(`http://localhost:4000/api/todos/${localStorage._id}/getTodos`)
				.then(response => response.json())
				.then(json => setAllTodos(json))
				.then(setDeleted(false));
		}
		if (newUpdate) {
			fetch(`http://localhost:4000/api/todos/${localStorage._id}/getTodos`)
				.then(response => response.json())
				.then(json => setAllTodos(json))
				.then(setNewUpdate(false));
		}
	}, [newTodo, deleted, newUpdate]);

	const fetchAfterDelete = () => {
		setDeleted(true);
	};

	const fetchAfterUpdate = () => {
		setNewUpdate(true);
		setEditing(!editing);
	};

	function compare(a, b) {
		if (a.date < b.date) return -1;
		if (a.date > b.date) return 1;
		return 0;
	}

	allTodos.sort(compare);

	return (
		<div className='todo'>
			{editing === false ? (
				<div>
					<h3 className='todo-h3'>Things to do</h3>
					<TodoForm newTodo={newTodo} setNewTodo={setNewTodo} />
				</div>
			) : null}

			{editing === false ? (
				<ul className='todos-ul'>
					<div className='todos-h6'>
						<h6>Task</h6>
						<h6 className='todo-deadline-h6'>Deadline</h6>
						<h6>Options</h6>
					</div>
					{allTodos.length
						? allTodos.map(todo => {
								console.log(todo, 'is my TODO');
								return (
									<li key={todo._id} className='todos-li'>
										<span className='todo-task'>{todo.task} </span>

										<span className='todo-date'>{todo.date}</span>
										<span className='todo-buttons'></span>
										<button
											onClick={e => handleEdit(e, todo, editing, setEditing)}
											style={{ border: 'none', background: 'none' }}>
											✏️
										</button>
										<button onClick={e => handleDelete(e, todo, fetchAfterDelete)} style={{ border: 'none', background: 'none' }}>
											🗑️
										</button>
									</li>
								);
						  })
						: null}
				</ul>
			) : (
				<div className='form edit-form'>
					<h5 className='edit-form-h5'>Editing {itemToEdit.task}</h5>
					<form className='todo-form' onSubmit={event => handleUpdate(event, fetchAfterUpdate)}>
						<input type='text' name='task' id='task' onChange={handleChange} placeholder={itemToEdit.task} required />
						<input type='date' name='date' id='date' onChange={handleChange} placeholder={itemToEdit.date} required />
						<button className='btn btn-success budget-submit-btn' type='submit'>
							Submit
						</button>
						<button className='btn btn-danger budget-submit-btn edit-cancel-btn' onClick={() => setEditing(!editing)}>
							Cancel
						</button>
					</form>
				</div>
			)}
		</div>
	);
}
