import { useState, useEffect } from 'react';

export default function ViewJournal({ journal, viewing, setViewing }) {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const journalText = document.getElementById('journal-text');
		const textLength = journalText.innerText.length;
		if (textLength > 1000) {
			setVisible(!visible);
		}
	}, []);

	const goBack = e => {
		e.preventDefault();
		setViewing(!viewing);
	};

	return (
		<div className='view-journal'>
			<h3>Title:{journal.title}</h3>
			<p>Written on: {journal.createdAt}</p>
			
				<button className='btn btn-primary' onClick={e => goBack(e)}>
					Go back
				</button>
			
			<p className='view-journal-text' id='journal-text'>
				{journal.text}
			</p>
			<span className='journal-back-to-top-btn'>
                <a href="#top" style={{ display: visible === true ? 'block' : 'none' }}>Top of page</a>
			</span>
		</div>
	);
}
