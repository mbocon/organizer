import { useState } from 'react';

const useForm = (callback) => {
	const [inputs, setInputs] = useState({});

	const handleSubmit = event => {
		if (event) {
			event.preventDefault();
			console.log('submitting', inputs);
		}
		callback();
	};
	const handleChange = event => {
		console.log('changing', inputs);
		event.persist();
		setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
	};
	const handleCancel = (event, props) => {
		const { displayForm, setDisplayForm } = props;
		event.preventDefault();
		setDisplayForm(!displayForm)
	};
	return {
		handleSubmit,
		handleChange,
		handleCancel,
		inputs,
	};
};

export default useForm;
