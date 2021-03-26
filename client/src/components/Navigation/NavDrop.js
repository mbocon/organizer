import React from 'react';
import { Dropdown } from 'react-bootstrap';

export default function NavDrop(props) {
	return (
		<Dropdown>
			<Dropdown.Toggle variant='primary' id='dropdown-basic' className='budget-dropdown'>
				Go to
			</Dropdown.Toggle>
			<Dropdown.Menu id='nav-dropdown'>
				<Dropdown.Item href='/calculator'>
					Calculator
				</Dropdown.Item>
				<Dropdown.Item  href='/budget'>
					Budget
				</Dropdown.Item>
				<Dropdown.Item href='/todo'>
					To do list
				</Dropdown.Item>
				<Dropdown.Item href='/timer'>
					Timer
				</Dropdown.Item>
				<Dropdown.Item href='/journal'>
					Journal
				</Dropdown.Item>
				<Dropdown.Item href='/workouts'>
					Workouts
				</Dropdown.Item>
				<Dropdown.Item href='/diet'>
					Diet
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}
