import { useState } from 'react';

const useForm = callback => {
	const [inputs, setInputs] = useState({});

	const handleSubmit = (event, props) => {
		if (event) {
			// console.log(event, 'is the event')
			const { displayForm, setDisplayForm } = props;
			event.preventDefault();
			const formattedInputs = [];
			// console.log(inputs, 'are inputs to be sub')
			Object.entries(inputs).forEach(([key, value]) => formattedInputs.push({ type: key, value: value }));
			// console.log(formattedInputs, 'are the formatted inputs')
			let form = event.target;
			let value = formattedInputs[1].value
			let formattedValue = value.replace(/[, ]+/g, "").trim();
			let data = {
				user: localStorage._id,
				type: formattedInputs[0].type,
				name: formattedInputs[0].value,
				value: formattedValue,
				date: formattedInputs[2].value
			};

			fetch(`http://localhost:4000/api/budgets/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then(resp => resp.json())
				.then(data => {
					console.log(data, 'from budget resp');
					localStorage.setItem('newBudget', 'true');
					form.reset();
					setDisplayForm(!displayForm);
				})
				.catch(err => console.error(err, 'is the error'));
		}
		callback();
	};
	const handleChange = event => {
		event.persist();
		console.log(event, 'is event')
		console.log(event.target.name, 'is e name');
		setInputs(inputs => ({ ...inputs, [event.target.id]: event.target.value }));
		console.log('changing', inputs);
	};
	const handleCancel = (event, props) => {
		const { displayForm, setDisplayForm } = props;
		event.preventDefault();
		setDisplayForm(!displayForm);
	};
	return {
		handleSubmit,
		handleChange,
		handleCancel,
		inputs,
	};
};

export default useForm;
