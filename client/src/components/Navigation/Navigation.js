import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import NavDrop from './NavDrop';
import 'bootstrap/dist/css/bootstrap.css';

export default function Navigation(props) {

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
				<NavDrop user={props} />
				<Nav.Link href='/home'>Home</Nav.Link>
					{localStorage.token ? null : <Nav.Link href='/register'>Sign up</Nav.Link>}
					{localStorage.token ? (
						<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
					) : (
						<Nav.Link href='/login'>Login</Nav.Link>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
