import React, { useState, useEffect } from 'react';
import TodoForm from '../Forms/TodoForm';
import useTodo from '../CustomHooks/useTodo';

export default function Todo() {
	let [allTodos, setAllTodos] = useState([]);

	const { handleDelete } = useTodo();

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

	//  console.log(allTodos, 'are all  todos')

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
			<h3 className='todo-h3'>Things to do</h3>
			<TodoForm />
			<ul className='todos-ul'>
				<div className='todo-title'>
					<span className='todo-task'>Task</span>
					<span className='todo-date deadline-title'>Deadline</span>
					<span>Remove</span>
				</div>

				{allTodos.length
					? allTodos.map(todo => {
							console.log(todo, 'are todos');
							return (
								<li key={todo._id} className='todos-li'>
									<span className='todo-task'>{todo.task} </span>
									<span className='todo-date'>{todo.date}</span>{' '}
									<button onClick={e => handleDelete(e, todo, reloadAfterDelete)} className='btn btn-danger'>
										X
									</button>
								</li>
							);
					  })
					: null}
			</ul>
		</div>
	);
}
