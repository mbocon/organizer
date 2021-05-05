import { useState, useEffect } from 'react';

export default function Countdown() {
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [hours, setHours] = useState(0);

	const [startTimer, setStartTimer] = useState(false);

	useEffect(() => {
		let interval = null;
		if (startTimer) {
			interval = setInterval(() => {
				setSeconds(seconds => seconds - 1);
				if (seconds === 0) {
					setMinutes(minutes => minutes - 1);
					setSeconds(59);
				}
				if (minutes === 0 && seconds === 0) {
					setMinutes(59);
					setSeconds(59);
					setHours(hours => hours - 1);
				}
				if (hours === 0 && minutes === 0 && seconds === 0) {
					clearInterval(interval);
					setSeconds(0);
					setMinutes(0);
					setHours(0);
					setStartTimer(false);
				}
			}, 1000);
		} else if (!startTimer && seconds !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [startTimer, seconds, minutes, hours]);

	const handleChange = e => {
		
		if (e.target.name === 'hours') setHours(e.target.value);
		if (e.target.name === 'minutes') setMinutes(e.target.value);
		if (e.target.name === 'seconds') setSeconds(e.target.value);
	};

	const handlePause = e => {
		setStartTimer(!startTimer);
	};

	const handleReset = e => {
		setSeconds(0);
		setMinutes(0);
		setHours(0);
		setStartTimer(false);
		const form = document.getElementById('countdown-form');
		form.reset();
	};

	return (
		<div>
			<div className='countdown'>
				<div className='countdown-header'>Countdown</div>

				<form id='countdown-form'>
					<div className='form-inputs'>
						<input className='countdown-input' type='text' name='hours' placeholder='Hours' onChange={e => handleChange(e)} />
						<input
							className='countdown-input'
							type='text'
							name='minutes'
							placeholder='Minutes'
							onChange={e => handleChange(e)}
						/>
						<input
							className='countdown-input'
							type='text'
							name='seconds'
							placeholder='Seconds'
							onChange={e => handleChange(e)}
						/>
					</div>
				</form>

				<div className='countdown-timer'>
					<div className='countdown-clock'>
						{hours} hrs {minutes} min {seconds} sec
					</div>
					<div className='stopwatch-buttons'>
						<button className='btn btn-success stopwatch-btn-1' onClick={handlePause}>
							{startTimer ? 'Pause' : 'Start'}
						</button>

						<button className='btn btn-danger stopwatch-btn stopwatch-btn-1' onClick={handleReset}>
							Reset
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
