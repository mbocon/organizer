import React from 'react';
import useTodo from '../CustomHooks/useTodo';

const TodoForm = props => {
	// console.log(props, 'are form props');
	const logInfo = () => {
		console.log(inputs, 'do i need this callback?');
        window.location.reload()
	};

	const { inputs, handleChange, handleSubmit } = useTodo(logInfo);

	return (
		<div className='form'>
			<form className='todo-form' onSubmit={(event)=> handleSubmit(event, props)}>
				<input type='text' name='task' id='task' onChange={handleChange} placeholder='Enter task' required />
				<input type='text' name='date' id='date' onChange={handleChange} placeholder='Deadline' required />
				<button className='btn btn-success budget-submit-btn' type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default TodoForm;
