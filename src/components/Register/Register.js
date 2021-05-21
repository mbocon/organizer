import React, { useState } from 'react';
import './register.css';

let href = window.location.href;

let API_URL;
let CLIENT_URL;

if (href.includes('localhost')) {
	API_URL = 'http://localhost:4000';
	CLIENT_URL = 'http://localhost:3000';
} else {
	API_URL = 'https://organizer-server-api.herokuapp.com';
	CLIENT_URL = 'https://organizer-client.herokuapp.com';
}

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const handleChange = e => {
		if (e.target.id === 'name') setName(e.target.value);
		if (e.target.id === 'email') setEmail(e.target.value);
		if (e.target.id === 'password') setPassword(e.target.value);
	};

	const handleSumbit = e => {
		e.preventDefault();
		fetch(`${API_URL}/api/users/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			}),
		})
			.then(resp => resp.json())
			.then(data => {
				console.log(data, 'from reg res');
			})
			.then((window.location.href = `${CLIENT_URL}/login`))
			.catch(err => console.error(err, 'is error'));
	};
	return (
		<div className='auth'>
			<h1 className='auth-h1'>Registration</h1>
			<form className='auth-form' onSubmit={handleSumbit}>
				<fieldset>
					<div className='form-group'>
						<label htmlFor='name'>Username</label>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							aria-describedby='nameHelp'
							placeholder='Create username'
							onChange={handleChange}
						/>
						<label htmlFor='email'>Email address</label>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							aria-describedby='emailHelp'
							placeholder='example@email.com'
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							className='form-control'
							id='password'
							placeholder='*******'
							onChange={handleChange}
						/>
					</div>
				</fieldset>
				<button className='btn btn-success'>Register</button>
			</form>
			<div className='login-redirect-div'>
				<p>Alreday have an account?</p>
				<a href='/login'>
					<button className='btn btn-primary'>Login</button>
				</a>
			</div>
		</div>
	);
};

export default Register;
