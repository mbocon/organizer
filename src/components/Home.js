import { Dropdown, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function Home() {
	const [displayInfo, setDisplayInfo] = useState('');
	const [href, setHref] = useState('');
	function displayData(e) {
		e.preventDefault();
		switch (e.target.text) {
			case 'Calculator':
				setDisplayInfo(
					'A basic calculator that you can use to calculate your budget or dietary requirements such as calories, macros, BMI etc.',
				);
				setHref('/calculator');
				break;
			case 'Budget':
				setDisplayInfo(
					'An easy to use budgeting tool. Enter your monthly income, expenses, debt and savings goals to create a working budget.',
				);
				setHref('/budget');
				break;
			case 'To-do':
				setDisplayInfo(
					'Increase productivity and crush your goals by creating a to-do list. Set e-mail reminders to keep yourself on track.',
				);
				setHref('/todo');
				break;
			case 'Timers':
				setDisplayInfo(
					'Trying to get a 20 minute HIIT workout in? Perhaps you need a 5 minute deep breathing exercise to relax after a productive day? Use one of two built in timer functions!',
				);
				setHref('/timer');
				break;
			case 'Journal':
				setDisplayInfo('Declutter your mind by organizing your thoughts with our simple daily journal!');
				setHref('/journal');
				break;
			case 'Workouts':
				setDisplayInfo(
					'Create a variety of workouts to help reach your fitness goals! Or try one of our free pre-made workouts!',
				);
				setHref('/workouts');
				break;
			case 'Diet':
				setDisplayInfo('Nutrition is important if you want to function optimally! Track your diet with ease using the diet log tool.');
				setHref('/diet');
				break;
			case 'Weather':
				setDisplayInfo('You can check the current weather anywhere in the world using the OpenWeather API!');
				setHref('/weather');
				break;
			default:
				setDisplayInfo('');
		}
	}

	return (
		<div className='home'>
			<div className='home-intro'>
				<h2 className='home-intro-h2'>Why use Organizer?</h2>
				<p className='home-intro-p'>
					Tired of searching through your phone to find a bunch of different productivity apps? This all-in-one app helps you
					get organized quickly by putting those apps all in one place!
				</p>
			</div>
			<Dropdown>
				<Dropdown.Toggle variant='primary' id='dropdown-basic'>
					Preview a feature
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item onClick={event => displayData(event)}>Calculator</Dropdown.Item>
					<Dropdown.Item onClick={event => displayData(event)}>Budget</Dropdown.Item>
					<Dropdown.Item onClick={event => displayData(event)}>To-do</Dropdown.Item>
					<Dropdown.Item onClick={event => displayData(event)}>Timers</Dropdown.Item>
					<Dropdown.Item onClick={event => displayData(event)}>Journal</Dropdown.Item>
					<Dropdown.Item onClick={event => displayData(event)}>Workouts</Dropdown.Item>
					<Dropdown.Item onClick={event => displayData(event)}>Diet</Dropdown.Item>
					<Dropdown.Item onClick={event => displayData(event)}>Weather</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			{displayInfo === '' ? null : (
				<div className='home-info'>
					<p>{displayInfo}</p>
					<a href={href}>
						<Button>Go to page</Button>
					</a>
				</div>
			)}
		</div>
	);
}
