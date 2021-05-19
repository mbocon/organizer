import { useState } from 'react';

const useTodo = callback => {
	const [inputs, setInputs] = useState({});
	const [updatedItem, setUpdatedItem] = useState([]);

	const handleSubmit = (event, props) => {
		if (event) {
			event.preventDefault();

			let form = event.target;

			let data = {
				user: localStorage._id,
				task: inputs.task,
				date: inputs.date,
			};

			fetch(`http://localhost:4000/api/todos/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then(resp => resp.json())
				.then(data => {
					form.reset();
					props.setNewTodo(!props.newTodo);
				})
				.catch(err => console.error(err, 'is the error'));
		}
	};

	const handleDelete = (event, todo, fetchAfterDelete) => {
		if (event) {
			fetch(`http://localhost:4000/api/todos/delete/${todo.user}/${todo._id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			})
				.then(resp => resp.json())
				.then(data => {
					fetchAfterDelete();
				})
				.catch(err => console.error(err, 'is the error'));
		}
	};

	const handleChange = event => {
		event.preventDefault();
		setInputs(inputs => ({ ...inputs, [event.target.id]: event.target.value }));
	};

	const handleEdit = (e, edit, editing, setEditing) => {
		setEditing(!editing);
		setUpdatedItem(edit);
		callback(edit);
	};

	const handleUpdate = (event, fetchAfterUpdate) => {
		if (event) {
			event.preventDefault();

			let form = event.target;

			let data = {
				user: localStorage._id,
				task: inputs.task,
				date: inputs.date,
			};

			fetch(`http://localhost:4000/api/todos/${localStorage._id}/${updatedItem._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then(resp => resp.json())
				.then(data => {
					form.reset();
					fetchAfterUpdate();
				})
				.catch(err => console.error(err, 'is the error'));
		}
	};

	return {
		handleSubmit,
		handleChange,
		handleDelete,
		handleEdit,
		handleUpdate,
	};
};

export default useTodo;
