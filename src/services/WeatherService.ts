import { fetchWeatherApi } from "openmeteo";

const params = {
	latitude: 52.52,
	longitude: 13.41,
	daily: ["sunrise", "sunset", "temperature_2m_max", "temperature_2m_min", "wind_speed_10m_max", "wind_gusts_10m_max"],
	hourly: ["temperature_2m", "precipitation_probability", "precipitation", "rain", "showers", "snowfall", "weather_code"],
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
	`\nCoordinates: ${latitude}°N ${longitude}°E`,
	`\nElevation: ${elevation}m asl`,
	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
);

const hourly = response.hourly()!;
const daily = response.daily()!;

// Define Int64 variables so they can be processed accordingly
const sunrise = daily.variables(0)!;
const sunset = daily.variables(1)!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
	hourly: {
		time: Array.from(
			{ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
			(_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m: hourly.variables(0)!.valuesArray(),
		precipitation_probability: hourly.variables(1)!.valuesArray(),
		precipitation: hourly.variables(2)!.valuesArray(),
		rain: hourly.variables(3)!.valuesArray(),
		showers: hourly.variables(4)!.valuesArray(),
		snowfall: hourly.variables(5)!.valuesArray(),
		weather_code: hourly.variables(6)!.valuesArray(),
	},
	daily: {
		time: Array.from(
			{ length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, 
			(_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
		),
		// Map Int64 values to according structure
		sunrise: [...Array(sunrise.valuesInt64Length())].map(
			(_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
		),
		// Map Int64 values to according structure
		sunset: [...Array(sunset.valuesInt64Length())].map(
			(_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
		),
		temperature_2m_max: daily.variables(2)!.valuesArray(),
		temperature_2m_min: daily.variables(3)!.valuesArray(),
		wind_speed_10m_max: daily.variables(4)!.valuesArray(),
		wind_gusts_10m_max: daily.variables(5)!.valuesArray(),
	},
};

// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
console.log("\nHourly data:\n", weatherData.hourly)
console.log("\nDaily data:\n", weatherData.daily)
