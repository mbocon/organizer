import React, { Fragment, useState } from 'react';
import ViewJournal from './ViewJournal';
import useJournal from '../CustomHooks/useJournal';

export default function AllJournals({ allJournals, handleDelete, fetchAfterDelete, newUpdate, setNewUpdate }) {
	const [editing, setEditing] = useState(false);
	const [itemToEdit, setItemToEdit] = useState([]);
	const [journal, setJournal] = useState([]);
	const [viewing, setViewing] = useState(false);

	const { handleUpdate, handleChange } = useJournal();

	function compare(a, b) {
		if (a.createdAt < b.createdAt) return -1;
		if (a.createdAt > b.createdAt) return 1;
		return 0;
	}

	allJournals.sort(compare);

	const toggleView = (e, journal) => {
		e.preventDefault();
		setViewing(!viewing);
		setJournal(journal);
	};

	const handleEdit = (e, journal) => {
		e.preventDefault();
		setEditing(!editing);
		setItemToEdit(journal);
		localStorage.setItem('journalId', `${journal._id}`);

		console.log(journal, 'is item to edit');
	};

	return (
		<Fragment>
			{editing ? null : (
				<div>
					{viewing ? null : (
						<table className='all-journals-table'>
							<thead className='all-journals-labels'>
								<tr>
									<td>Title</td>
									<td>Written on</td>
									<td>Options</td>
								</tr>
							</thead>
							{allJournals.length
								? allJournals.map((journal, idx) => {
										return (
											<Fragment key={idx}>
												<tbody>
													<tr>
														<td className='all-journals-data'>
															<span onClick={e => toggleView(e, journal)}>
																<a href=''>{journal.title}</a>
															</span>
														</td>
														<td className='all-journals-data'>{journal.createdAt}</td>
														<td>
															<button
																className='all-journals-data journal-edit-btn'
																style={{ border: 'none', background: 'none' }}
																onClick={event => handleEdit(event, journal)}>
																{'✏️'}
															</button>
															<button
																className='all-journals-data journal-dlt-btn'
																style={{ border: 'none', background: 'none' }}
																onClick={event => handleDelete(event, journal, fetchAfterDelete)}>
																{'🗑️'}
															</button>
														</td>
													</tr>
												</tbody>
											</Fragment>
										);
								  })
								: null}
						</table>
					)}
				</div>
			)}
			{viewing ? <ViewJournal journal={journal} viewing={viewing} setViewing={setViewing} /> : null}
			{editing ? (
				<div>
					<form
						className='journal-form'
						style={{ marginTop: '.5rem' }}
						onSubmit={e => handleUpdate(e, newUpdate, setNewUpdate, editing, setEditing)}>
						<input
							type='text'
							name='title'
							id='title'
							defaultValue={itemToEdit.title}
							onChange={handleChange}
                            maxLength='20'
							autoFocus
							required
						/>
						<textarea
							name='text'
							id='journal'
							cols='38'
							rows='14'
							onChange={handleChange}
							defaultValue={itemToEdit.text}
							required></textarea>
						<button type='submit' className='btn btn-primary journal-edit-submit'>
							Save Changes
						</button>
					</form>
					<div className='edit-cancel'>
						<button className='btn btn-secondary' style={{ margin: '0 auto' }} onClick={event => handleEdit(event, journal)}>
							Cancel
						</button>
					</div>
				</div>
			) : null}
		</Fragment>
	);
}

{
	/* <small> created on {journal.createdAt}</small> */
}
