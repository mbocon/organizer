import { useState } from 'react';
import IncomeForm from '../Forms/IncomeForm';
import ExpenseForm from '../Forms/ExpenseForm';
import DebtForm from '../Forms/DebtForm';
import SavingsForm from '../Forms/SavingsForm';
import Dropdwn from './DropDwn';
import ResponsiveTable from './ResponsiveTable';

export default function Budget() {
	const [displayForm, setDisplayForm] = useState(false);
	const [formType, setFormType] = useState('');

	return (
		<div className='budget'>
			<h3 className='budget-h3'>Username's Budget</h3>
			<div className='budget-input'>
				{displayForm === false ? (
					<Dropdwn setFormType={setFormType} displayForm={displayForm} setDisplayForm={setDisplayForm} />
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
			<ResponsiveTable />
		</div>
	);
}
