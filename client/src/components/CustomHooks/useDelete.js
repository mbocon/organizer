// import React from 'react';

const useDelete = (callback) => {
    // console.log(callback, 'is callback')
	const handleDelete = (event, props) => {
		if (event) {
			// console.log(event, 'is the event');
			// console.log('delete');
			// console.log(props.user, 'are props user ');
			// console.log(props._id, 'is prop id');

			event.preventDefault();
		
			fetch(`http://localhost:4000/api/budget/delete/${props.user}/${props._id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			})
				.then(resp => resp.json())
				.then(data => {
					console.log(data, 'from budget DELETE resp');
					// localStorage.setItem('newDelete', 'true');
					// form.reset();
					// setDisplayForm(!displayForm);
                  
				})
				.catch(err => console.error(err, 'is the error'));
		}
        callback();
	};
    
	return {
		handleDelete,
	};
};

export default useDelete;
