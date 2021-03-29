import React from 'react';
import useForm from '../CustomHooks/useForm';

const SavingsForm = props => {
	console.log(props, 'are form props');
	const logInfo = () => {
		console.log(inputs, 'log info - cb');
	};

	const { inputs, handleChange, handleSubmit, handleCancel } = useForm(logInfo);

	return (
		<div className='form'>
			<form onSubmit={(event)=> handleSubmit(event, props)}>
				<input type='text' name='savings' id='savings' onChange={handleChange} placeholder='Source' required />
				<input type='text' name='value' id='value' onChange={handleChange} placeholder='Enter amount' required />
				<input type='text' name='date' id='date' onChange={handleChange} placeholder='Date' required />
				<input type='text' name='type' id='type' onChange={handleChange} value='savings' style={{display: 'none'}} />

				<button className='btn btn-success budget-submit-btn' type='submit'>Submit</button>
				<button onClick={event => handleCancel(event, props)} className='btn btn-danger budget-cancel-btn'>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default SavingsForm;
