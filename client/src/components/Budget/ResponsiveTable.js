import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import useDelete from '../CustomHooks/useDelete';

export default function ResponsiveTable(props) {
	// console.log(props, 'are table props');
	let [allBudgetItems, setAllBudgetItems] = useState([]);
	let [income, setIncome] = useState(0);
	let [expenses, setExpenses] = useState(0);
	let [debt, setDebt] = useState(0);
	let [savings, setSavings] = useState(0);
	let [leftover, setLeftover] = useState(0);

	let incomeRef = useRef(income);
	let expenseRef = useRef(expenses);
	let debtRef = useRef(debt);
	let savingsRef = useRef(savings);
	let leftoverRef = useRef(leftover);

	useEffect(() => {
		incomeRef.current = incomeRef.current - incomeRef.current;
		expenseRef.current = expenseRef.current - expenseRef.current;
		debtRef.current = debtRef.current - debtRef.current;
		savingsRef.current = savingsRef.current - savingsRef.current;
		leftoverRef.current = leftoverRef.current - leftoverRef.current;
		fetch(`http://localhost:4000/api/budget/${localStorage._id}/getBudgets`)
			.then(response => response.json())
			.then(json => {
				json.forEach(item => {
					if (item.type === 'income') setIncome((incomeRef.current += parseInt(item.value)));
					if (item.type === 'expense') setExpenses((expenseRef.current += parseInt(item.value)));
					if (item.type === 'debt') setDebt((debtRef.current += parseInt(item.value)));
					if (item.type === 'savings') setSavings((savingsRef.current += parseInt(item.value)));
					setLeftover((leftoverRef.current = incomeRef.current - expenseRef.current));
				});
				setAllBudgetItems(json);
			});
	}, []);

	useEffect(() => {
		if (localStorage.newBudget) {
			incomeRef.current = incomeRef.current - incomeRef.current;
			expenseRef.current = expenseRef.current - expenseRef.current;
			debtRef.current = debtRef.current - debtRef.current;
			savingsRef.current = savingsRef.current - savingsRef.current;
			leftoverRef.current = leftoverRef.current - leftoverRef.current;
			fetch(`http://localhost:4000/api/budget/${localStorage._id}/getBudgets`)
				.then(response => response.json())
				.then(json => {
					json.forEach(item => {
						if (item.type === 'income') setIncome((incomeRef.current += parseInt(item.value)));
						if (item.type === 'expense') setExpenses((expenseRef.current += parseInt(item.value)));
						if (item.type === 'debt') setDebt((debtRef.current += parseInt(item.value)));
						if (item.type === 'savings') setSavings((savingsRef.current += parseInt(item.value)));
						setLeftover((leftoverRef.current = incomeRef.current - expenseRef.current));
					});
					setAllBudgetItems([]);
					setAllBudgetItems(json);
				});
		}
		localStorage.removeItem('newBudget');
	});

	function compare(a, b) {
		if (a.date < b.date) return -1;
		if (a.date > b.date) return 1;
		return 0;
	}

	allBudgetItems.sort(compare);

	const handleUpdateAfterDelete = () => {
		window.location.reload();
	};

	const { handleDelete } = useDelete(handleUpdateAfterDelete);

	return (
		<Fragment key='frag-1'>
			<Table key='table'>
				<Thead>
					<Tr>
						<Th className='th'>Total Income</Th>
						<Th className='th'>Total Expenses</Th>
						<Th className='th'>Total Debt</Th>
						<Th className='th'>Total Savings</Th>
						<Th className='th'>Leftover</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td className='td'>
							<span className='income-span'>{income}</span>
						</Td>
						<Td className='td'>
							<span className='expense-span'>{expenses}</span>
						</Td>
						<Td className='td'>
							<span className='debt-span'>{debt}</span>
						</Td>
						<Td className='td'>
							<span className='savings-span'>{savings}</span>
						</Td>
						<Td className='td'>
							<span className='leftover-span'>{leftover}</span>
						</Td>
					</Tr>
				</Tbody>
			</Table>
			<div className='all-budget-items' key='hi'>
				<h6 className='all-budget-items-h6' key='h6'>
					Budget items
				</h6>
				<div className='budget-items-div'>
					<span className='budget-type-span span-title'>Name</span>
					<span className='budget-date-span span-title'>Date</span>
					<span className='budget-value-span span-title'>Amount</span>
					<span className='budget-option-span span-title'>Option</span>
				</div>

				{allBudgetItems.length !== 0
					? allBudgetItems.map(item => {
							// console.log(item, 'is item to all budget');
							return (
								<div key={item._id}>
									<div className='budget-items-div'>
										<span className='budget-type-span'>{item.name}</span>
										<span className='budget-date-span'>{item.date}</span>
										<span
											className={`budget-value-span ${item.type === 'income' ? 'green' : ''} ${
												item.type === 'expense' ? 'red' : ''
											} ""} ${item.type === 'debt' ? 'red' : ''} ""} ${item.type === 'savings' ? 'green' : ''} ""}`}>
											{item.value}
										</span>
										<button onClick={event => handleDelete(event, item)} className='btn btn-danger budget-delete-btn'>
											Delete
										</button>
									</div>
								</div>
							);
					  })
					: null}
			</div>
		</Fragment>
	);
}
