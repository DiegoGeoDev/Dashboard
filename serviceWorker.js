const leafletDashboard = 'leaflet-dashboard';
const assets = [
	'./',
	'./index.html',
	'./index.css',
	'./index.js',
	'./marker-men.png',
	'./marker-women.png',
	'./search.geojson',
];

self.addEventListener('install', (installEvent) => {
	installEvent.waitUntil(
		caches.open(leafletDashboard).then((cache) => {
			cache.addAll(assets);
		})
	);

	self.addEventListener('fetch', (fetchEvent) => {
		fetchEvent.respondWith(
			caches.match(fetchEvent.request).then((res) => {
				return res || fetch(fetchEvent.request);
			})
		);
	});
});
