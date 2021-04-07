import { useState, useEffect } from 'react';

export default function Stopwatch() {
	const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
	const [isActive, setIsActive] = useState(false);

	function toggle() {
		setIsActive(!isActive);
	}

	function reset() {
		setSeconds(0);
        setMinutes(0);
        setHours(0);
		setIsActive(false);
	}

	useEffect(() => {
		let interval = null;
		if (isActive) {
			interval = setInterval(() => {
				setSeconds(seconds => seconds + 1);
                if(seconds === 59) {
                    setMinutes(minutes => minutes  +  1)
                    setSeconds(0)
                }
                if(minutes === 59 && seconds === 59) {
                    setMinutes(0);
                    setHours(hours => hours + 1)
                }
			}, 1000);
		} else if (!isActive && seconds !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isActive, seconds, minutes]);

	return (
		<div className='stopwatch'>
            <div className="stopwatch-header">Stopwatch</div>
            <div className="stopwatch-labels">HRS: MIN: SEC</div>
			<div className='stopwatch-time'>{hours} :  {minutes} : {seconds}</div>
			<div className='stopwatch-buttons'>
				<button className={`btn btn-success stopwatch-btn-1`} onClick={toggle}>
					{isActive ? 'Pause' : 'Start'}
				</button>
				<button className='btn  btn-danger stopwatch-btn stopwatch-btn-1' onClick={reset}>
					Reset
				</button>
			</div>
		</div>
	);
}
