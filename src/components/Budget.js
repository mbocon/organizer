import { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import IncomeForm from './Forms/IncomeForm';
import ExpenseForm from './Forms/ExpenseForm';
import DebtForm from './Forms/DebtForm';
import SavingsForm from './Forms/SavingsForm';

export default function Budget() {
	const [displayForm, setDisplayForm] = useState(false);
	const [formType, setFormType] = useState('');

	const renderForm = e => {
		setFormType(e.target.id);
		setDisplayForm(!displayForm);
	};

	return (
		<div className='budget'>
			<h3 className='budget-h3'>*USERNAME's Budget</h3>
			<div className='budget-input'>
				{displayForm === false ? (
					<Dropdown>
						<Dropdown.Toggle variant='primary' id='dropdown-basic' className='budget-dropdown'>
							Enter budget item
						</Dropdown.Toggle>
						<Dropdown.Menu>
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
				) : null}
				{displayForm === true ? (
					<div className='budget-form'>
						{formType === 'income' ? <IncomeForm displayForm={displayForm} setDisplayForm={setDisplayForm} /> : null}
						{formType === 'expense' ? <ExpenseForm displayForm={displayForm} setDisplayForm={setDisplayForm} /> : null}
						{formType === 'debt' ? <DebtForm displayForm={displayForm} setDisplayForm={setDisplayForm} /> : null}
						{formType === 'savings' ? <SavingsForm displayForm={displayForm} setDisplayForm={setDisplayForm} /> : null}
					</div>
				) : null}
			</div>
			<Table>
				<Thead>
					<Tr>
						<Th className='th'>Total Income</Th>
						<Th className='th'>Total Expenses</Th>
						<Th className='th'>Total Debt</Th>
						<Th className='th'>Total Savings</Th>
						<Th className='th'>Leftover $</Th>
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
