let href = window.location.href;

let API_URL;

if(href.includes('localhost')) {
	API_URL = 'http://localhost:4000';
} else {
	API_URL = 'https://organizer-server-api.herokuapp.com';
}

const useDelete = () => {
	const handleDelete = (event, props, handleUpdateAfterDelete) => {
		if (event) {
			event.preventDefault();

			fetch(`${API_URL}/api/budgets/delete/${props.user}/${props._id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			})
				.then(resp => resp.json())
				.then(data => {
					handleUpdateAfterDelete();
					// localStorage.setItem('deleted', 'true');
				})

				.catch(err => console.error(err, 'is the error'));
		}
	};

	return {
		handleDelete,
	};
};

export default useDelete;
