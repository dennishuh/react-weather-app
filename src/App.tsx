import React, { useState } from 'react';

interface WeatherData {
	name: string;
	main: {
		temp: number;
		feels_like: number;
		humidity: number;
	};
	weather: Array<{
		main: string;
	}>;
	wind: {
		speed: number;
	};
}

function App() {
	const [data, setData] = useState<WeatherData | null>(null);
	const [location, setLocation] = useState('');

	const appId = import.meta.env.VITE_WEATHER_API_KEY;

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${appId}`;

	const searchLocation = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const json = await response.json();
			setData(json);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		setLocation('');
	};

	return (
		<div className="app">
			<div className="search">
				<form onSubmit={searchLocation}>
					<input
						value={location}
						onChange={(event) => setLocation(event.target.value)}
						placeholder="Enter Location"
						type="text"
					/>
					<button type="submit">Submit</button>
				</form>
			</div>
			<div className="container">
				<div className="top">
					<div className="location">
						<p>{data?.name}</p>
					</div>
					<div className="temp">
						{data?.main ? <h1>{data?.main.temp.toFixed()}°F</h1> : null}
					</div>
					<div className="description">
						{data?.weather ? <p>{data?.weather[0].main}</p> : null}
					</div>
				</div>

				{data?.name !== undefined && (
					<div className="bottom">
						<div className="feels">
							{data?.main ? (
								<p className="bold">{data?.main.feels_like.toFixed()}°F</p>
							) : null}
							<p>Feels Like</p>
						</div>
						<div className="humidity">
							{data?.main ? (
								<p className="bold">{data?.main.humidity}%</p>
							) : null}
							<p>Humidity</p>
						</div>
						<div className="wind">
							{data?.wind ? (
								<p className="bold">{data?.wind.speed.toFixed()} MPH</p>
							) : null}
							<p>Wind Speed</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
