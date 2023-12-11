const address = document.getElementById('address');
const button = document.getElementById('find-lawn');

button.addEventListener('click', (e) => {
	geocodeAddress(address.value);
});

const map = L.map('map', { editable: true, zoom: 18, maxZoom: 19 }).setView([
	51.505, -0.09,
]);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 	attribution:
// 		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

L.esri.basemapLayer('ImageryClarity').addTo(map);

const measurePolygonControl = L.control.measurePolygon();
measurePolygonControl.addTo(map);

function geocodeAddress(address) {
	fetch(
		`https://geocode.search.hereapi.com/v1/geocode?apiKey=vKjBBCMyqAk92fGgv9PCOclvE89LF-kaEZY-8mP8uYc&q=${encodeURIComponent(
			address
		)}`
	)
		.then((response) => response.json())
		.then((data) => {
			if (data.items.length > 0) {
				const lat = data.items[0].position.lat;
				const lon = data.items[0].position.lng;

				console.log(lat, lon);

				map.setView([lat, lon], 19);

				// Now you can use these coordinates with Leaflet
				// const map = L.map('map').setView([lat, lon], 13);
				// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				//     maxZoom: 19,
				//     attribution: '© OpenStreetMap contributors'
				// }).addTo(map);

				// L.marker([lat, lon]).addTo(map)
				//     .bindPopup('Your address location')
				//     .openPopup();
			} else {
				console.log('Address not found');
			}
		})
		.catch((error) => console.error('Error:', error));
}
