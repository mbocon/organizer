import { useState } from 'react';

let href = window.location.href;

let API_URL;

if(href.includes('localhost')) {
	API_URL = 'http://localhost:4000';
} else {
	API_URL = 'https://organizer-server-api.herokuapp.com';
}

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

			fetch(`${API_URL}/api/journals/create`, {
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
			fetch(`${API_URL}/api/journals/delete/${journal.user}/${journal._id}`, {
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


	const handleUpdate = (event, newUpdate, setNewUpdate, editing, setEditing) => {
		if (event) {
			event.preventDefault();

			let form = event.target;

			let data = {
				user: localStorage._id,
				text: inputs.journal,
                title: inputs.title
			};

			fetch(`${API_URL}/api/journals/${localStorage._id}/${localStorage.journalId}`, {
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
