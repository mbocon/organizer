import { Dropdown, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function Home() {
	const [displayInfo, setDisplayInfo] = useState('');
	function displayData(e) {
		e.preventDefault();
		switch (e.target.text) {
			case 'Calculator':
				setDisplayInfo(
					'A basic calculator that you can use to calculate your budget or dietary requirements such as calories, macros, BMI etc.',
				);
				break;
			case 'Budget':
				setDisplayInfo(
					'An easy to use budgeting tool. Enter your monthly income, expenses and savings goals to create a working budget.',
				);
				break;
			case 'To-do':
				setDisplayInfo(
					'Increase productivity and crush your goals by creating a to-do list. Set e-mail reminders to keep yourself on track.',
				);
				break;
			case 'Timer':
				setDisplayInfo(
					'Trying to get a 20 minute HIIT workout in? Perhaps you need a 5 minute deep breathing exercise to relax after a productive day? Use the built in timer function!',
				);
				break;
			case 'Journal':
				setDisplayInfo('Declutter your mind by organizing your thoughts with our simple daily journal!');
				break;
			case 'Workouts':
				setDisplayInfo(
					'Create a variety of workouts to help reach your fitness goals! Or try one of our free pre-made workouts!',
				);
				break;
			case 'Diet':
				setDisplayInfo(
					'Nutrition is important if you want to function optimally! Create a customized diet for yourself with ease.',
				);
				break;
			default:
				setDisplayInfo('');
		}
	}

	function clearScreen() {
		setDisplayInfo('');
	}

	return (
		<div className='home'>
			<div className='home-intro'>
				<h2 className='home-intro-h2'>Welcome to Organizer!</h2>
				<p className='home-intro-p'>
					Tired of searching through your phone to find a bunch of different productivity apps? This all-in-one app helps you
					get organized quickly by putting those apps in one place!
				</p>
			</div>
			<Dropdown>
				<Dropdown.Toggle variant='primary' id='dropdown-basic'>
					About our features
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item onClick={event => displayData(event)}>Calculator</Dropdown.Item>
					<Dropdown.Item onClick={event => displayData(event)}>Budget</Dropdown.Item>
					<Dropdown.Item onClick={event => displayData(event)}>To-do</Dropdown.Item>
					<Dropdown.Item onClick={event => displayData(event)}>Timer</Dropdown.Item>
					<Dropdown.Item onClick={event => displayData(event)}>Journal</Dropdown.Item>
					<Dropdown.Item onClick={event => displayData(event)}>Workouts</Dropdown.Item>
					<Dropdown.Item onClick={event => displayData(event)}>Diet</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			{displayInfo === '' ? null : (
				<div className='home-info'>
					<p>{displayInfo}</p>
					<Button onClick={event => clearScreen(event)}>Clear</Button>
				</div>
			)}
		</div>
	);
}
