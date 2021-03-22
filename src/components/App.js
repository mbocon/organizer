import './App.css';
import Navigation from './Navigation';
import Home from './Home';
import Calculator from './Calculator';
import Budget from './Budget';
import Todo from './Todo';
import Relaxation from './Relaxation';
import Journal from './Journal';
import Workouts from './Workouts';
import Diet from './Diet';
import Footer from './Footer';

let href = window.location.href;

export default function App() {
	return (
		<div className='App'>
			<header>
				<Navigation />
			</header>
			<main>
				{href === 'http://localhost:3000/home' ? <Home /> : null}
				{href === 'http://localhost:3000/calculator' ? <Calculator /> : null}
				{href === 'http://localhost:3000/budget' ? <Budget /> : null}
				{href === 'http://localhost:3000/todo' ? <Todo /> : null}
				{href === 'http://localhost:3000/relaxation' ? <Relaxation /> : null}
				{href === 'http://localhost:3000/journal' ? <Journal /> : null}
				{href === 'http://localhost:3000/workouts' ? <Workouts /> : null}
				{href === 'http://localhost:3000/diet' ? <Diet /> : null}
			</main>
			<Footer />
		</div>
	);
}
