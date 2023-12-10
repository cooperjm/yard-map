// const map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 	maxZoom: 19,
// 	attribution:
// 		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// }).addTo(map);

// const marker = L.marker([51.5, -0.09]).addTo(map);

// const circle = L.circle([51.508, -0.11], {
// 	color: 'red',
// 	fillColor: '#f03',
// 	fillOpacity: 0.5,
// 	radius: 500,
// }).addTo(map);

// const polygon = L.polygon([
// 	[51.509, -0.08],
// 	[51.503, -0.06],
// 	[51.51, -0.047],
// ]).addTo(map);

// marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
// circle.bindPopup('I am a circle.');
// polygon.bindPopup('I am a polygon.');

// var popup = L.popup()
// 	.setLatLng([51.513, -0.09])
// 	.setContent('I am a standalone popup.')
// 	.openOn(map);

// var popup = L.popup();

// function onMapClick(e) {
// 	popup
// 		.setLatLng(e.latlng)
// 		.setContent('You clicked the map at ' + e.latlng.toString())
// 		.openOn(map);
// }

// map.on('click', onMapClick);

// // Function to calculate the area of the polygon (in square meters)
// function calculateArea(polygon) {
// 	const latlngs = polygon.getLatLngs()[0];
// 	let area = 0;
// 	let j = latlngs.length - 1;

// 	for (let i = 0; i < latlngs.length; i++) {
// 		const lat1 = latlngs[i].lat;
// 		const lng1 = latlngs[i].lng;
// 		const lat2 = latlngs[j].lat;
// 		const lng2 = latlngs[j].lng;

// 		area += (lng1 + lng2) * (lat2 - lat1);
// 		j = i;
// 	}

// 	return Math.abs(area * 111319.488 * 111319.488) / 2; // Conversion to square meters
// }

// document.addEventListener('DOMContentLoaded', function () {
// 	// Initialize the map
// 	const map = L.map('map').setView([51.505, -0.09], 13);

// 	// Add OpenStreetMap tile layer to the map
// 	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 		attribution: '© OpenStreetMap contributors',
// 	}).addTo(map);

// 	let latlngs = [];
// 	let polygon = null;
// 	let isDrawing = false;

// 	// Function to start or stop drawing
// 	function toggleDrawing() {
// 		isDrawing = !isDrawing;
// 		map.getContainer().style.cursor = isDrawing ? 'crosshair' : '';

// 		if (!isDrawing && polygon) {
// 			polygon.setLatLngs(latlngs); // Reset to original latlngs without the mouse position
// 		}
// 	}

// 	// Click event on the map
// 	map.on('click', function (e) {
// 		if (!isDrawing) return;

// 		latlngs.push([e.latlng.lat, e.latlng.lng]);

// 		if (!polygon) {
// 			polygon = L.polygon(latlngs, { color: 'red' }).addTo(map);
// 		}
// 	});

// 	// Mouse move event on the map
// 	map.on('mousemove', function (e) {
// 		if (!isDrawing || latlngs.length === 0) return;

// 		// Update the polygon with the current mouse position
// 		const currentLatLngs = latlngs.concat([[e.latlng.lat, e.latlng.lng]]);
// 		polygon.setLatLngs(currentLatLngs);
// 	});

// 	// Start Drawing button
// 	const startDrawingButton = L.control({ position: 'topleft' });
// 	startDrawingButton.onAdd = function (map) {
// 		const div = L.DomUtil.create('div');
// 		const btn = L.DomUtil.create('button', '', div);
// 		btn.innerText = 'Start Drawing';
// 		btn.style.backgroundColor = 'white';
// 		btn.style.padding = '5px';

// 		L.DomEvent.on(btn, 'click', function (e) {
// 			L.DomEvent.stopPropagation(e);
// 			toggleDrawing();
// 		});

// 		return div;
// 	};
// 	startDrawingButton.addTo(map);

// 	// Complete Drawing button
// 	const completeButton = L.control({ position: 'topleft' });
// 	completeButton.onAdd = function (map) {
// 		const div = L.DomUtil.create('div');
// 		const btn = L.DomUtil.create('button', '', div);
// 		btn.innerText = 'Complete Drawing';
// 		btn.style.backgroundColor = 'white';
// 		btn.style.padding = '5px';

// 		L.DomEvent.on(btn, 'click', function (e) {
// 			L.DomEvent.stopPropagation(e);
// 			if (polygon) {
// 				console.log(`Area of polygon: ${calculateArea(polygon)} square meters`);
// 				toggleDrawing(); // Stop drawing
// 			}
// 		});

// 		return div;
// 	};
// 	completeButton.addTo(map);
// });

const address = document.getElementById('address');
const button = document.getElementById('find-lawn');

button.addEventListener('click', (e) => {
	geocodeAddress(address.value);
});

const map = L.map('map', { editable: true, zoom: 18, maxZoom: 18 }).setView([
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
