import request from "request";

export const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=19b58924aa09d57731db215a322dc192&query=${latitude},${longitude}`;
	request(url, { json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!');
		} else if (body.error?.code) {
			callback('Unable to find location!');
		} else {
			callback(undefined, body.current.weather_descriptions[0] + `. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. There is a ${body.current.precip}% of rain. The humidity is ${body.current.humidity}%.`);
		}
	});
}
