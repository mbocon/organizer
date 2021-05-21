export default function Footer() {
	const copy = ['\u00a9'];
	let year = new Date();
	year = year.getFullYear();
	return (
		<div className='footer'>
			<div className='footer-content'>
				<span>Created by Mike Bocon</span>
				<span>
					All Rights Reserved {copy} {year}
				</span>
			</div>
		</div>
	);
}
