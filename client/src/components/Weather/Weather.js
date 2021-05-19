import React, { useState } from 'react';
import './weather.css';

export default function Weather() {
	const [weather, setWeather] = useState();
	const [search, setSearch] = useState([]);

	const handleSubmit = e => {
		e.preventDefault();
		const form = e.target;
		form.reset();
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=be853936af64e10c7ae809463ba68499`,
		)
			.then(response => response.json())
			.then(json => setWeather(json));
	};

	const handleChange = e => {
		setSearch(e.target.value);
	};

	return (
		<div className='weather'>
			<h3>Check the weather</h3>
			<form className='weather-form' onSubmit={event => handleSubmit(event)}>
				<input
					style={{ height: '2.5rem' }}
					type='text'
					name='weather'
					id='weather'
					onChange={handleChange}
					placeholder='Search by location'
					required
				/>
				<button className='btn btn-primary weather-btn' type='submit'>
					Get Weather
				</button>
			</form>
			<main className='weather-main'>
				{weather === undefined ? null : (
					<ul className='weather-display'>
						<li className='location'>Weather For : {weather.name}</li>
						<li className='tempurature'>Tempurature : {Math.round(weather.main.temp)}&deg;F</li>
						<li className='feels-like'>Feels like : {Math.round(weather.main.feels_like)}&deg;F</li>
						<li className='humidity'>Humidity : {Math.round(weather.main.humidity)}%</li>
						<li className='wind'>Wind speed: {Math.round(weather.wind.speed)} mph</li>
						<li className='weather-info'>
							Weather : {weather.weather[0].description.charAt(0).toUpperCase()}
							{weather.weather[0].description.slice(1)}
						</li>
					</ul>
				)}
			</main>
		</div>
	);
}
