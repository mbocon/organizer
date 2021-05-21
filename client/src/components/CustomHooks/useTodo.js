import { useState } from 'react';

let href = window.location.href;

let API_URL;

if(href.includes('localhost')) {
	API_URL = 'http://localhost:4000';
} else {
	API_URL = 'https://organizer-server-api.herokuapp.com';
}

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

			fetch(`${API_URL}/api/todos/create`, {
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
			fetch(`${API_URL}/api/todos/delete/${todo.user}/${todo._id}`, {
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

			fetch(`${API_URL}/api/todos/${localStorage._id}/${updatedItem._id}`, {
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
