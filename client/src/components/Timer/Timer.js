import Countdown from './Countdown';
import Stopwatch from './Stopwatch';

export default function Timer() {
	return (
		<div className='timer'>
			<Countdown />
            <Stopwatch />
		</div>
	);
}
