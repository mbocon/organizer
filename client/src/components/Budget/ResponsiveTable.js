import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './budget.css';
import useDelete from '../CustomHooks/useDelete';
import EditBudget from './EditBudget';

export default function ResponsiveTable() {
	let [, setState] = useState();
	const [allBudgetItems, setAllBudgetItems] = useState([]);
	const [income, setIncome] = useState(0);
	const [expenses, setExpenses] = useState(0);
	const [debt, setDebt] = useState(0);
	const [savings, setSavings] = useState(0);
	const [leftover, setLeftover] = useState(0);
	const [deleted, setDeleted] = useState(false);
	let [editing, setEditing] = useState(false);
	let [itemToEdit, setItemToEdit] = useState([]);

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

		fetch(`http://localhost:4000/api/budgets/${localStorage._id}/getBudgets`)
			.then(response => response.json())
			.then(json => {
				console.log(json,' is  my json objs', localStorage._id, 'is my localstorage id')
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
	}, []);

	useEffect(() => {
		if (localStorage.newBudget) {
			incomeRef.current = incomeRef.current - incomeRef.current;
			expenseRef.current = expenseRef.current - expenseRef.current;
			debtRef.current = debtRef.current - debtRef.current;
			savingsRef.current = savingsRef.current - savingsRef.current;
			leftoverRef.current = leftoverRef.current - leftoverRef.current;

			fetch(`http://localhost:4000/api/budgets/${localStorage._id}/getBudgets`)
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
	}, [localStorage.newBudget]);

	useEffect(() => {
		if (deleted) {
			incomeRef.current = incomeRef.current - incomeRef.current;
			expenseRef.current = expenseRef.current - expenseRef.current;
			debtRef.current = debtRef.current - debtRef.current;
			savingsRef.current = savingsRef.current - savingsRef.current;
			leftoverRef.current = leftoverRef.current - leftoverRef.current;

			fetch(`http://localhost:4000/api/budgets/${localStorage._id}/getBudgets`)
				.then(response => response.json())
				.then(json => {
					setIncome(0);
					setExpenses(0);
					setDebt(0);
					setSavings(0);
					setLeftover(0);
					json.forEach(item => {
						if (item.type === 'income') {
							setIncome((incomeRef.current += parseInt(item.value)));
						} else if (item.type === 'expense') {
							setExpenses((expenseRef.current += parseInt(item.value)));
						} else if (item.type === 'debt') {
							setDebt((debtRef.current += parseInt(item.value)));
						} else if (item.type === 'savings') {
							setSavings((savingsRef.current += parseInt(item.value)));
						} 
						setLeftover((leftoverRef.current = incomeRef.current - expenseRef.current));
					});
					setAllBudgetItems([]);
					setAllBudgetItems(json);
				});
			setDeleted(false);
			setState({});
		}
	}, [deleted]);

	function compare(a, b) {
		if (a.date < b.date) return -1;
		if (a.date > b.date) return 1;
		return 0;
	}

	allBudgetItems.sort(compare);

	const handleUpdateAfterDelete = () => {
		setDeleted(true);
		setState({});
	};

	const toggleEdit = (e, item) => {
		setItemToEdit(item)
		setEditing(!editing)
	}

	const { handleDelete } = useDelete();
	

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
				<h5 className='all-budget-items-h5' key='h5'>
					Budget items
				</h5>

				{editing === false ? 
				<table key='table' className='budget-table-data'>
					{allBudgetItems.length !== 0 ? (
						<thead className='budget-table-thead'>
							<tr className='budget-table-tr budget-table-tr-1st'>
								<th className='budget-table-td table-bold'>Name/Type</th>
								<th className='budget-table-td table-bold'>Date</th>
								<th className='budget-table-td table-bold'>Amount</th>
								<th className='budget-table-td table-bold'>Options</th>
							</tr>
						</thead>
					) : null}

					<tbody className='budget-table-body'>
						{allBudgetItems.length !== 0
							? allBudgetItems.map((item, idx) => {
									return (
										<tr key={idx} className='budget-table-tr'>
											<td className='budget-table-td'>
												<span className='table-bold'>{item.name} <small>Type:<span className={item.type}>{item.type.replace(/^\w/, c => c.toUpperCase())}</span></small></span>
											</td>
											<td className='budget-table-td'>
												<span>{item.date}</span>
											</td>
											<td className='budget-table-td'>
												<span>{item.value}</span>
											</td>
											<td className='budget-table-td'>
												<button
													style={{ border: 'none', background: 'none', marginRight: '.5rem' }}
													onClick={e => toggleEdit(e, item)}>
													✏️
												</button>
												<button
													style={{ border: 'none', background: 'none'}}
													onClick={event => handleDelete(event, item, handleUpdateAfterDelete)}>
													🗑️
												</button>
											</td>
										</tr>
									);
							  })
							: null}
					</tbody>
				</table> : 
				<EditBudget editing={editing} setEditing={setEditing} itemToEdit={itemToEdit} />
			}
			</div>
		</Fragment>
	);
}
