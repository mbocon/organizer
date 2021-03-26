import React from 'react';
import useForm from '../CustomHooks/useForm';

const IncomeForm = props => {
	console.log(props, 'are form props');
	const logInfo = () => {
		console.log(inputs, 'log info - cb');
	};

	const { inputs, handleChange, handleSubmit, handleCancel } = useForm(logInfo);

	return (
		<div className='form'>
			<form onSubmit={handleSubmit}>
				<input type='text' name='income' id='income' onChange={handleChange} placeholder='Enter income' required />
				<button className='btn btn-success budget-submit-btn' type='submit'>Submit</button>
				<button onClick={event => handleCancel(event, props)} className='btn btn-danger budget-cancel-btn'>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default IncomeForm;