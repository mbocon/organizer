const useDelete = () => {
	const handleDelete = (event, props, handleUpdateAfterDelete) => {
		if (event) {
			event.preventDefault();

			fetch(`http://localhost:4000/api/budgets/delete/${props.user}/${props._id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			})
				.then(resp => resp.json())
				.then(data => {
					handleUpdateAfterDelete();
				})
				.catch(err => console.error(err, 'is the error'));
		}
	};

	return {
		handleDelete,
	};
};

export default useDelete;
