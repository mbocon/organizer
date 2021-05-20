import { useState } from 'react';

const useJournal = callback => {
	const [inputs, setInputs] = useState({});

	const handleSubmit = (event, create, setCreate, newJournal, setNewJournal ) => {
		if (event) {
			event.preventDefault();
			let form = event.target;

			let data = {
				user: localStorage._id,
				text: inputs.journal,
                title: inputs.title
			};

			console.log(data, 'is data to submit to CREATE NEW JOURNAL');

			fetch(`http://localhost:4000/api/journals/create`, {
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
                    setNewJournal(!newJournal);
					setCreate(!create);
				})
				.catch(err => console.error(err, 'is the error'));
		}
	};

	const handleDelete = (event, journal, fetchAfterDelete) => {
		if (event) {
			fetch(`http://localhost:4000/api/journals/delete/${journal.user}/${journal._id}`, {
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
		console.log(inputs, 'are my on change JOURNAL INPUTS!!!');
	};


	const handleUpdate = (event, newUpdate, setNewUpdate, editing, setEditing) => {
		if (event) {
			event.preventDefault();

			let form = event.target;

			let data = {
				user: localStorage._id,
				text: inputs.journal,
                title: inputs.title
			};

            console.log(data, 'is data to update', localStorage , 'is localstorage')

			fetch(`http://localhost:4000/api/journals/${localStorage._id}/${localStorage.journalId}`, {
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
                    setEditing(!editing)
					setNewUpdate(!newUpdate)
				})
				.catch(err => console.error(err, 'is the error'));
		}
	};

	return {
		handleSubmit,
		handleChange,
		handleDelete,
		handleUpdate,
	};
};

export default useJournal;
