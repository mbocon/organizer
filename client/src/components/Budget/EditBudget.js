import { useState } from 'react';
import useForm from '../CustomHooks/useForm';

export default function EditBudget({ editing, setEditing, itemToEdit }) {
	const { handleChange, handleUpdate } = useForm();
	const [editedSource, setEditedSource] = useState(false);
	const [editedAmount, setEditedAmount] = useState(false);

	const clickedSource = e => {
		setEditedSource(true);
	};

	const clickedAmount = e => {
		setEditedAmount(true);
	};

	localStorage.setItem('itemId', `${itemToEdit._id}`);
	localStorage.setItem('itemType', `${itemToEdit.type}`);

	return (
		<div className='form edit-form'>
			<h5 className='edit-form-h5'>Editing {itemToEdit.name}</h5>
			<form className='todo-form' onSubmit={event => handleUpdate(event, editing, setEditing)}>
				<input
					type='text'
					name={itemToEdit.name}
					id={itemToEdit.name}
					onChange={handleChange}
					onFocus={e => clickedSource(e)}
					placeholder={itemToEdit.name}
					required
				/>
				<input
					type='date'
					name='date'
					id='date'
					onChange={handleChange}
					onFocus={e => clickedAmount(e)}
					disabled={editedSource ? false : true}
					placeholder={itemToEdit.date}
					required
				/>
				<input
					type='number'
					name='value'
					id='value'
					onChange={handleChange}
					disabled={editedAmount ? false : true}
					placeholder={itemToEdit.value}
					required
				/>
				<button className='btn btn-success budget-submit-btn' type='submit' style={{ marginLeft: '5px' }}>
					Submit
				</button>
				<button className='btn btn-danger budget-submit-btn edit-cancel-btn' onClick={() => setEditing(!editing)}>
					Cancel
				</button>
			</form>
		</div>
	);
}
