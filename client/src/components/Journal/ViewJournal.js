export default function ViewJournal({ journal, viewing, setViewing }) {
	console.log(journal, 'are view prosp');
	return (
		<div className='view-journal'>
        
			<h3>Title: {journal.title}</h3>
			<p>Written on: {journal.createdAt}</p>
            <span className='journal-go-back-btn'>
                <a onClick={() => setViewing(!viewing)} href="">Edit this journal</a>
				<a className="go-back-btn" onClick={() => setViewing(!viewing)} href="">Go back</a>
			</span>
			<p className='view-journal-text'>{journal.text}</p>
			<span className='journal-back-to-top-btn'>
                <a href="#top">Top of page</a>
			</span>
		</div>
	);
}
