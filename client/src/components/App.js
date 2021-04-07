import './App.css';
import Navigation from './Navigation/Navigation';
import Landing from './Landing';
import Home from './Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Calculator from './Calculator/Calculator';
import Budget from './Budget/Budget';
import Todo from './Todo/Todo';
import Timer from './Timer/Timer';
import Journal from './Journal';
import Workouts from './Workouts';
import Diet from './Diet';
import Footer from './Footer';

let href = window.location.href;

let user = localStorage.getItem('user');
console.log(user, 'is logged in user')
console.log(localStorage,' is LS')

export default function App() {
	return (
		<div className='App'>
			<header>
				<Navigation user={user} />
			</header>
			<main>
				{href === 'http://localhost:3000/' ? <Landing user={user} /> : null}
				{href === 'http://localhost:3000/register' ? <Register /> : null}
				{href === 'http://localhost:3000/login' ? <Login /> : null}
				{href === 'http://localhost:3000/home' ? <Home user={user} /> : null}
				{href === 'http://localhost:3000/calculator' ? <Calculator user={user} /> : null}
				{href === 'http://localhost:3000/budget' ? <Budget user={user} /> : null}
				{href === 'http://localhost:3000/todo' ? <Todo user={user} /> : null}
				{href === 'http://localhost:3000/timer' ? <Timer user={user} /> : null}
				{href === 'http://localhost:3000/journal' ? <Journal user={user} /> : null}
				{href === 'http://localhost:3000/workouts' ? <Workouts user={user} /> : null}
				{href === 'http://localhost:3000/diet' ? <Diet user={user} /> : null}
			</main>
			<Footer />
		</div>
	);
}
