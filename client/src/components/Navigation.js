import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function Navigation() {
	console.log(localStorage, 'local storage');
	const handleLogout = () => {
		localStorage.clear();
		window.location.href = 'http://localhost:3000/login';
	};
	return (
		<Navbar expand='lg'>
			<Navbar.Brand href='/'>Organizer</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ml-auto'>
					{localStorage.token ? null : <Nav.Link href='/register'>Sign up</Nav.Link>}
					{localStorage.token ? <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
					: <Nav.Link href='/login'>Login</Nav.Link> }
					<Nav.Link href='/home'>Home</Nav.Link>
					<Nav.Link href='/calculator'>Calculator</Nav.Link>
					<Nav.Link href='/budget'>Budget</Nav.Link>
					<Nav.Link href='/todo'>To-do</Nav.Link>
					<Nav.Link href='/timer'>Timer</Nav.Link>
					<Nav.Link href='/journal'>Journal</Nav.Link>
					<Nav.Link href='/workouts'>Workouts</Nav.Link>
					<Nav.Link href='/diet'>Diet</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
