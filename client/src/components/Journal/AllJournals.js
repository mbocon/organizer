import React, { Fragment, useState } from 'react';
import ViewJournal from './ViewJournal';

export default function AllJournals({ allJournals, handleDelete, fetchAfterDelete }) {
	function compare(a, b) {
		if (a.createdAt < b.createdAt) return -1;
		if (a.createdAt > b.createdAt) return 1;
		return 0;
	}

	allJournals.sort(compare);

	const [journal, setJournal] = useState([]);
	const [viewing, setViewing] = useState(false);

	const toggleView = (e,journal) => {
        e.preventDefault()
		setViewing(!viewing);
		setJournal(journal);
	};

	return (
		<>
			{viewing ? null : (
				<table className='all-journals-table'>
					<thead className='all-journals-labels'>
						<td>Title</td>
						<td>Written on</td>
						<td>Options</td>
					</thead>
					{allJournals.length
						? allJournals.map((journal, idx) => {
								return (
									<Fragment key={idx}>
										<tbody>
											<td className='all-journals-data'>
												<span onClick={e => toggleView(e, journal)}> <a href="">{journal.title}</a></span>
											</td>
											<td className='all-journals-data'>{journal.createdAt}</td>
											<button
												className='all-journals-data'
												style={{ border: 'none', background: 'none' }}
												onClick={event => handleDelete(event, journal, fetchAfterDelete)}>
												{'🗑️'}
											</button>
										</tbody>
									</Fragment>
								);
						  })
						: null}
				</table>
			)}
			{viewing ? <ViewJournal journal={journal} viewing={viewing} setViewing={setViewing} /> : null}
		</>
	);
}

{
	/* <small> created on {journal.createdAt}</small> */
}
