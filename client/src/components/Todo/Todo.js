import React, { useState, useEffect } from 'react';
import TodoForm from '../Forms/TodoForm';
import useTodo from '../CustomHooks/useTodo';

export default function Todo() {
	let [allTodos, setAllTodos] = useState([]);
	let [editing, setEditing] = useState(false);
	let [itemToEdit, setItemToEdit] = useState([]);

	const editCallback = edit => {
		setItemToEdit(edit);
		console.log(itemToEdit, 'edit CB info');
	};

	console.log(itemToEdit, 'is  item to tedit');

	const { handleDelete, handleEdit, handleUpdate, handleChange } = useTodo(editCallback);

	useEffect(() => {
		fetch(`http://localhost:4000/api/todos/${localStorage._id}/getTodos`)
			.then(response => response.json())
			.then(json => setAllTodos(json));
	}, []);

	useEffect(() => {
		if (localStorage.newTask) {
			fetch(`http://localhost:4000/api/todos/${localStorage._id}/getTodos`)
				.then(response => response.json())
				.then(json => setAllTodos(json));
		}
		localStorage.removeItem('newTask');
	});

	const reloadAfterDelete = () => {
		window.location.reload();
	};

	function compare(a, b) {
		if (a.date < b.date) return -1;
		if (a.date > b.date) return 1;
		return 0;
	}

	allTodos.sort(compare);

	return (
		<div className='todo'>
		{editing === false ? <div><h3 className='todo-h3'>Things to do</h3>
		<TodoForm /></div> : null}
			
			{editing === false ? (
				<ul className='todos-ul'>
					{allTodos.length
						? allTodos.map(todo => {
								console.log(todo, 'are todos');
								return (
									<li key={todo._id} className='todos-li'>
										<span className='todo-task'>{todo.task} </span>
										<span className='todo-date'>{todo.date}</span>
										<span className='todo-buttons'></span>
										<button onClick={e => handleEdit(e, todo, editing, setEditing)} className='btn btn-secondary todo-btn'>
											Edit
										</button>
										<button onClick={e => handleDelete(e, todo, reloadAfterDelete)} className='btn btn-danger'>
											X
										</button>
									</li>
								);
						  })
						: null}
				</ul>
			) : (
				<div className='form edit-form'>
					<h5 className='edit-form-h5'>Editing {itemToEdit.task}</h5>
					<form className='todo-form' onSubmit={event => handleUpdate(event)}>
						<input type='text' name='task' id='task' onChange={handleChange} placeholder={itemToEdit.task} required />
						<input type='text' name='date' id='date' onChange={handleChange} placeholder={itemToEdit.date} required />
						<button className='btn btn-success budget-submit-btn' type='submit'>
							Submit
						</button>
						<button className='btn btn-danger budget-submit-btn edit-cancel-btn' onClick={()=>setEditing(!editing)}>
							Cancel
						</button>
						</form>
				</div>
			)}
		</div>
	);
}

// <div className='todo-title'>
// 					<span className='todo-task'>Task</span>
// 					<span className='todo-date deadline-title'>Deadline</span>
// 					<span>Options</span>
// 				</div>
