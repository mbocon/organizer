import { useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

// <form action='' method='get' className='form-example'>
// 	<label for='income'>Enter income:</label>
// 	<input type='text' name='income' id='income' required />
// 	<button>Submit</button>
// </form>

export default function Budget(props) {
	console.log(props, 'are budget page props');

	const [formInfo, setFormInfo] = useState('');

	function displayForm(e) {
		e.preventDefault();
		switch (e.target.text) {
			case 'Add an income source':
				setFormInfo(
					<form action='submit' method='post' className='budget-form'>
						<label htmlFor='income'>Enter income:</label>
						<input type='text' name='income' id='income' required />
						<Button className='btn btn-success budget-form-submit-btn'>Submit</Button>
					</form>,
				);
				break;
			case 'Add an expense':
				setFormInfo(
					<form action='submit' method='post' className='budget-form'>
						<label htmlFor='expense'>Enter expense:</label>
						<input type='text' name='expense' id='expense' required />
						<Button className='btn btn-success budget-form-submit-btn'>Submit</Button>
					</form>,
				);
				break;
			case 'Add a debt':
				setFormInfo(
					<form action='submit' method='post' className='budget-form'>
						<label htmlFor='debt'>Enter debt:</label>
						<input type='text' name='debt' id='debt' required />
						<Button className='btn btn-success budget-form-submit-btn'>Submit</Button>
					</form>,
				);
				break;
			case 'Add savings':
				setFormInfo(
					<form action='submit' method='post' className='budget-form'>
						<label htmlFor='savings'>Enter savings:</label>
						<input type='text' name='savings' id='savings' required />
						<Button className='btn btn-success budget-form-submit-btn'>Submit</Button>
					</form>,
				);
				break;
			default:
				setFormInfo('');
		}
	}

	function clearScreen() {
		setFormInfo('');
	}

	return (
		<div className='budget'>
			<h3 className='budget-h3'>*USERNAME's Budget</h3>
			<div className='budget-input'>
				{formInfo !== '' ? null : (
					<Dropdown>
						<Dropdown.Toggle variant='primary' id='dropdown-basic' className='budget-dropdown'>
							Enter budget item
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item onClick={event => displayForm(event)}>Add an income source</Dropdown.Item>
							<Dropdown.Item onClick={event => displayForm(event)}>Add an expense</Dropdown.Item>
							<Dropdown.Item onClick={event => displayForm(event)}>Add a debt</Dropdown.Item>
							<Dropdown.Item onClick={event => displayForm(event)}>Add savings</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				)}
				{formInfo === '' ? null : (
					<div className='budget-form-area'>
						<div className='budget-form'>{formInfo}</div>
						<div className='budget-cancel-btn-area'>
							<Button className='btn btn-danger budget-cancel-btn' onClick={event => clearScreen(event)}>
								Cancel
							</Button>
						</div>
					</div>
				)}
			</div>
			<Table>
				<Thead>
					<Tr>
						<Th className='th'>Total Income</Th>
						<Th className='th'>Total Expenses</Th>
						<Th className='th'>Total Debt</Th>
						<Th className='th'>Total Savings</Th>
						<Th className='th'>Amount Leftover</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td className='td'>First</Td>
						<Td className='td'>Second</Td>
						<Td className='td'>Third</Td>
						<Td className='td'>Fourth</Td>
						<Td className='td'>Fifth</Td>
					</Tr>
				</Tbody>
			</Table>
		</div>
	);
}
