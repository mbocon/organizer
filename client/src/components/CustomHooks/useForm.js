import { useState } from 'react';

const useForm = () => {
	const [inputs, setInputs] = useState({});

	const handleSubmit = (event, props) => {
		if (event) {
			const { displayForm, setDisplayForm } = props;
			event.preventDefault();
			
			const formattedInputs = [];
			Object.entries(inputs).forEach(([key, value]) => formattedInputs.push({ type: key, value: value }));
			
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
					localStorage.setItem('newBudget', 'true');
					form.reset();
					setDisplayForm(!displayForm);
				})
				.catch(err => console.error(err, 'is the error'));
		}
	};
	const handleChange = event => {
		event.persist();
		setInputs(inputs => ({ ...inputs, [event.target.id]: event.target.value }));
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
