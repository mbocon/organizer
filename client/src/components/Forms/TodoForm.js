import React from 'react';
import useTodo from '../CustomHooks/useTodo';

const TodoForm = (props) => {

	const { handleChange, handleSubmit } = useTodo();

	return (
		<div className='form'>
			<form className='todo-form' onSubmit={(event) => handleSubmit(event, props)}>
				<input type='text' name='task' id='task' onChange={handleChange} placeholder='Task' required />
				<input type='text' name='date' id='date' onChange={handleChange} placeholder='Deadline' required />
				<button className='btn btn-success budget-submit-btn' type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default TodoForm;
