import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

export default function DropDwn(props) {
	const { setFormType, displayForm, setDisplayForm } = props;

	const renderForm = e => {
		setFormType(e.target.id);
		setDisplayForm(!displayForm);
	};

	return (
		<Dropdown>
			<Dropdown.Toggle variant='primary' id='dropdown-basic' className='budget-dropdown'>
				Enter budget item
			</Dropdown.Toggle>
			<Dropdown.Menu id='budget-dropdown'>
				<Dropdown.Item id='income' onClick={event => renderForm(event)}>
					Add an income source
				</Dropdown.Item>
				<Dropdown.Item id='expense' onClick={event => renderForm(event)}>
					Add an expense
				</Dropdown.Item>
				<Dropdown.Item id='debt' onClick={event => renderForm(event)}>
					Add a debt
				</Dropdown.Item>
				<Dropdown.Item id='savings' onClick={event => renderForm(event)}>
					Add savings
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}
