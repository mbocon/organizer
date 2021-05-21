import { useState, useEffect } from 'react';
import useJournal from '../CustomHooks/useJournal';
import AllJournals from './AllJournals';
import './journal.css';

let href = window.location.href;

let API_URL;

if(href.includes('localhost')) {
	API_URL = 'http://localhost:4000';
} else {
	API_URL = 'https://organizer-server-api.herokuapp.com';
}

export default function Journal() {
	const [create, setCreate] = useState(false);
	const [allJournals, setAllJournals] = useState([]);
	const [newJournal, setNewJournal] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const [newUpdate, setNewUpdate] = useState(false);

	const { handleChange, handleSubmit, handleDelete } = useJournal();

	useEffect(() => {
		fetch(`${API_URL}/api/journals/${localStorage._id}/getJournals`)
			.then(response => response.json())
			.then(json => {
				json.forEach(journal => {
					let oldDate = journal.createdAt
					let month = oldDate.substr(5, 3);
					let day = oldDate.substr(8, 2);
					day = day + '-';
					let year = oldDate.substr(0, 4);
					let newDate = month + day + year;
					journal.createdAt = newDate;
				});
				setAllJournals(json)});
	}, []);

	useEffect(() => {
		if (newJournal) {
			fetch(`${API_URL}/api/journals/${localStorage._id}/getJournals`)
				.then(response => response.json())
				.then(json => {
					json.forEach(journal => {
						let oldDate = journal.createdAt
						let month = oldDate.substr(5, 3);
						let day = oldDate.substr(8, 2);
						day = day + '-';
						let year = oldDate.substr(0, 4);
						let newDate = month + day + year;
						journal.createdAt = newDate;
					});
					setAllJournals(json)})
				.then(setNewJournal(false));
		}
		if (deleted) {
			fetch(`${API_URL}/api/journals/${localStorage._id}/getJournals`)
				.then(response => response.json())
				.then(json => {
					json.forEach(journal => {
						let oldDate = journal.createdAt
						let month = oldDate.substr(5, 3);
						let day = oldDate.substr(8, 2);
						day = day + '-';
						let year = oldDate.substr(0, 4);
						let newDate = month + day + year;
						journal.createdAt = newDate;
					});
					setAllJournals(json)})
				.then(setDeleted(false));
		}
		if (newUpdate) {
			fetch(`${API_URL}/api/journals/${localStorage._id}/getJournals`)
				.then(response => response.json())
				.then(json => {
					json.forEach(journal => {
						let oldDate = journal.createdAt
						let month = oldDate.substr(5, 3);
						let day = oldDate.substr(8, 2);
						day = day + '-';
						let year = oldDate.substr(0, 4);
						let newDate = month + day + year;
						journal.createdAt = newDate;
					});
					setAllJournals(json)})
				.then(setNewUpdate(false));
		}
	}, [newJournal, deleted, newUpdate]);

	const fetchAfterDelete = () => {
		setDeleted(true);
	};

	return (
		<div className='journal' id='top'>
			<h4 className='journal-h4'>
				<span className='journal-user'>{localStorage.user}</span>'s Journals
			</h4>
			{create ? null : (
				<button className='create-journal-btn btn btn-primary' onClick={() => setCreate(!create)}>
					Create New Journal
				</button>
			)}
			{create ? (
				<div className='journal-form-area'>
					<form className='journal-form' onSubmit={e => handleSubmit(e, create, setCreate, newJournal, setNewJournal)}>
						<input
							type='text'
							name='title'
							id='title'
							placeholder='Enter a title'
							onChange={handleChange}
							autoFocus
							required
						/>
						<textarea
							name='text'
							id='journal'
							cols='38'
							rows='15'
							onChange={handleChange}
							placeholder="What's on your mind?"
							required></textarea>
						<button type='submit' className='btn btn-primary journal-submit-btn'>
							Submit
						</button>
					</form>
					<button className='cancel-journal-btn btn btn-secondary' onClick={() => setCreate(!create)}>
						Cancel
					</button>
				</div>
			) : null}
			{allJournals.length ? (
				<div>
					{create ? null : (
						<AllJournals allJournals={allJournals} handleDelete={handleDelete} fetchAfterDelete={fetchAfterDelete} newUpdate={newUpdate} setNewUpdate={setNewUpdate} />
					)}
				</div>
			) : null}
		</div>
	);
}
