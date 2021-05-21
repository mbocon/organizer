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
import Journal from './Journal/Journal';
import Workouts from './Workouts';
import Diet from './Diet';
import Weather from './Weather/Weather';
import Footer from './Footer';

let href = window.location.href;

let user = localStorage.getItem('user');

let CLIENT_URL;

if(href.includes('localhost')) {
	CLIENT_URL = 'http://localhost:3000';
} else {
	CLIENT_URL = 'https://organizer-client.herokuapp.com';
}

console.log(`${CLIENT_URL}`,  'is client url')
console.log(href, 'is href')

export default function App() {
	return (
		<div className='App'>
			<header>
				<Navigation user={user} />
			</header>
			<main>
				{href === `${CLIENT_URL}/` ? <Landing user={user} /> : null}
				{href === `${CLIENT_URL}/register` ? <Register /> : null}
				{href === `${CLIENT_URL}/login` ? <Login /> : null}
				{href === `${CLIENT_URL}/home` ? <Home user={user} /> : null}
				{href === `${CLIENT_URL}/calculator` ? <Calculator user={user} /> : null}
				{href === `${CLIENT_URL}/budget` ? <Budget user={user} /> : null}
				{href === `${CLIENT_URL}/todo` ? <Todo user={user} /> : null}
				{href === `${CLIENT_URL}/timer` ? <Timer user={user} /> : null}
				{href === `${CLIENT_URL}/journal` ? <Journal user={user} /> : null}
				{href === `${CLIENT_URL}/workouts` ? <Workouts user={user} /> : null}
				{href === `${CLIENT_URL}/diet` ? <Diet user={user} /> : null}
				{href === `${CLIENT_URL}/weather` ? <Weather user={user} /> : null}
			</main>
			<Footer />
		</div>
	);
}
