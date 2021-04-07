// import React from 'react';
import { useState } from 'react';

const useTodo = callback => {
	const [inputs, setInputs] = useState({});
	console.log(callback, 'is callback');
	const handleSubmit = (event, props) => {
		if (event) {
			event.preventDefault();
			console.log(localStorage._id, 'is local S  user id on todo');
			console.log('todo  submit', inputs);

			const formattedInputs = [];
			// console.log(inputs, 'are inputs to be sub')
			Object.entries(inputs).forEach(([key, value]) => formattedInputs.push({ type: key, value: value }));

			console.log(formattedInputs[0].value, formattedInputs[1].value, 'are  the todo inputs after');

			let form = event.target;

			// let formattedValue = value.replace(/[, ]+/g, "").trim();
			let data = {
				user: localStorage._id,
				task: formattedInputs[0].value,
				date: formattedInputs[1].value,
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
					console.log(data, 'from TODO CREATE resp');
					localStorage.setItem('newTask', 'true');
					form.reset();
					// setDisplayForm(!displayForm);
				})
				.catch(err => console.error(err, 'is the error'));
		}
		callback();
	};

	const handleDelete = (event, todo, callback) => {
		console.log(todo, 'is  del  event');
		if (event) {
			console.log(event);

			fetch(`http://localhost:4000/api/todos/delete/${todo.user}/${todo._id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			})
				.then(resp => resp.json())
				.then(data => {
					console.log(data, 'from TODO DELETE resp');
					// localStorage.setItem('newDelete', 'true');
					// form.reset();
					// setDisplayForm(!displayForm);
				})
				.catch(err => console.error(err, 'is the error'));
		}
        callback();
	};

	const handleChange = event => {
		event.persist();
		console.log(event, 'is event');
		console.log(event.target.name, 'is e name');
		setInputs(inputs => ({ ...inputs, [event.target.id]: event.target.value }));
		console.log('changing TODO', inputs);
	};

	return {
		handleSubmit,
		handleChange,
		handleDelete,
	};
};

export default useTodo;
