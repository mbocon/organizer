import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function Navigation() {
	return (
		<Navbar expand='lg'>
			<Navbar.Brand href='/home'>Organizer</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav'/>
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ml-auto'>
					<Nav.Link href='/home'>Home</Nav.Link>
					<Nav.Link href='/calculator'>Calculator</Nav.Link>
					<Nav.Link href='/budget'>Budget</Nav.Link>
					<Nav.Link href='/todo'>To-do</Nav.Link>
					<Nav.Link href='/relaxation'>Relaxation</Nav.Link>
					<Nav.Link href='/journal'>Journal</Nav.Link>
					<Nav.Link href='/workouts'>Workouts</Nav.Link>
					<Nav.Link href='/diet'>Diet</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
