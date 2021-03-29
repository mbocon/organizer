import React from 'react';
import useForm from '../CustomHooks/useForm';

const IncomeForm = props => {
	// console.log(props, 'are form props');
	const logInfo = () => {
		console.log(inputs, 'do i need this callback?');
	};

	const { inputs, handleChange, handleSubmit, handleCancel } = useForm(logInfo);

	return (
		<div className='form'>
			<form className='income-form' onSubmit={(event)=> handleSubmit(event, props)}>
				<input type='text' name='income' id='income' onChange={handleChange} placeholder='Income source' required />
				<input type='text' name='value' id='value' onChange={handleChange} placeholder='Enter amount' required />
				<input type='text' name='date' id='date' onChange={handleChange} placeholder='Date' required />
				<input type='text' name='type' id='type' onChange={handleChange} value='income' style={{display: 'none'}} />

				<button className='btn btn-success budget-submit-btn' type='submit'>Submit</button>
				<button onClick={event => handleCancel(event, props)} className='btn btn-danger budget-cancel-btn'>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default IncomeForm;
