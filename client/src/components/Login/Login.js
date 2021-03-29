import React, { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import './login.css';

let url;
if (process.env.NODE_ENV === 'development') {
	url = 'http://localhost:4000/';
} else {
	url = '/';
}

const Login = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [authError, setAuthError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [authSuccess, setAuthSuccess] = useState(false);
	const [successMsg, setSuccessMsg] = useState('')
	// const [user, setUser] = useState({});

	const handleChange = e => {
		if (e.target.id === 'email') setEmail(e.target.value);
		if (e.target.id === 'password') setPassword(e.target.value);
		console.log(email, password);
	};

	const handleSumbit = e => {
		e.preventDefault();
		fetch(`${url}api/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then(response => response.json())
			.then(response => {
				if (response.loginSuccess === false) {
					setAuthError(true);
					setErrorMsg(response.message);
				} else {
					setAuthSuccess(true)
					setSuccessMsg('Login successful!')
					localStorage.token = response.userId.token;
					localStorage._id = response.userId._id;
					localStorage.user = response.userId.name;
					localStorage.setItem('created', true);
					console.log(response, 'is resp');
					setTimeout(()=>{
						window.location.href = 'http://localhost:3000/home'
					},1000)
				}
				
			})
			.catch(err => console.error(err));
	};

	if (authError) {
		setTimeout(() => {
			setAuthError(false);
		}, 2100);
	}

	return (
		<div className='auth'>
			{authSuccess === true ? <h5 className='auth-h1 auth-success'>{successMsg} <Spinner /></h5> : <h1 className='auth-h1'>Login</h1>}
			{authError === true ? <h3 className='auth-error'>{errorMsg}</h3> : <h3 className='hiden-h3'>-</h3>}
			<form className='auth-form' onSubmit={handleSumbit}>
				<fieldset>
					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							className='form-control'
							id='email'
							aria-describedby='emailHelp'
							placeholder='Enter email'
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input type='password' className='form-control' id='password' placeholder='Enter password' onChange={handleChange} />
					</div>
				</fieldset>
				<button className='btn btn-success'>Submit</button>
			</form>
		</div>
	);
};

export default Login;
