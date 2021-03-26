import './App.css';
import Navigation from './Navigation';
import Landing from './Landing';
import Home from './Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Calculator from './Calculator/Calculator';
import Budget from './Budget/Budget';
import Todo from './Todo';
import Timer from './Timer';
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
				{href === 'http://localhost:3000/' ? <Landing /> : null}
				{href === 'http://localhost:3000/register' ? <Register /> : null}
				{href === 'http://localhost:3000/login' ? <Login /> : null}
				{href === 'http://localhost:3000/home' ? <Home /> : null}
				{href === 'http://localhost:3000/calculator' ? <Calculator /> : null}
				{href === 'http://localhost:3000/budget' ? <Budget /> : null}
				{href === 'http://localhost:3000/todo' ? <Todo /> : null}
				{href === 'http://localhost:3000/timer' ? <Timer /> : null}
				{href === 'http://localhost:3000/journal' ? <Journal /> : null}
				{href === 'http://localhost:3000/workouts' ? <Workouts /> : null}
				{href === 'http://localhost:3000/diet' ? <Diet /> : null}
			</main>
			<Footer />
		</div>
	);
}
