import React, { useState } from 'react';
import useForm from '../CustomHooks/useForm';

const SavingsForm = props => {
	console.log(props, 'are form props');
	const logInfo = () => {
		console.log(inputs, 'log info - cb');
	};

	const { inputs, handleChange, handleSubmit, handleCancel } = useForm(logInfo);
	const [editedSource, setEditedSource] = useState(false);
	const [editedAmount, setEditedAmount] = useState(false);

	const clickedSource = e => {
		setEditedSource(true);
	};

	const clickedAmount = e => {
		setEditedAmount(true);
	};
	
	return (
		<div className='form'>
			<form onSubmit={event => handleSubmit(event, props)}>
				<input
					type='text'
					name='savings'
					id='savings'
					onChange={handleChange}
					onFocus={e => clickedSource(e)}
					placeholder='Source'
					required
				/>
				<input
					type='number'
					name='value'
					id='value'
					onChange={handleChange}
					onFocus={e => clickedAmount(e)}
					disabled={editedSource ? false : true}
					placeholder='Enter amount'
					required
				/>
				<input
					type='date'
					name='date'
					id='date'
					onChange={handleChange}
					disabled={editedAmount ? false : true}
					placeholder='Date'
					required
				/>
				<input type='text' name='type' id='type' onChange={handleChange} value='savings' style={{ display: 'none' }} />

				<button className='btn btn-success budget-submit-btn' type='submit'>
					Submit
				</button>
				<button onClick={event => handleCancel(event, props)} className='btn btn-danger budget-cancel-btn'>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default SavingsForm;
