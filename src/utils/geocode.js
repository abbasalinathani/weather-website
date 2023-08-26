import request from "request";

export const geoCode = (address, callback) => {
	if (!address) {
		return callback('Please provide a location!');
	}
	const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWJiYXNhbGluYXRoYW5pIiwiYSI6ImNsbGx0aDEydDF6aTcza21wY3o3cnBnYmYifQ.p17gP-ZAAA2fuO86PvXctQ&limit=1`;
	request(geoCodeUrl, { json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!');
		} else if (body.features?.length === 0 || !body.features) {
			callback('Unable to find location. Try another search!');
		} else {
			callback(undefined, {
				location: body.features[0].place_name,
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0]
			});
		}
	});
};