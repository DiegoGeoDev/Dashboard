const CACHE_NAME = 'leaflet-dashboard-v4';
const ASSETS = [
	'./',
	'./index.html',
	'./index.css',
	'./index.js',
	'./marker-men.png',
	'./marker-women.png',
	'./search.geojson',
	'./Leaflet-1.7.1/dist/images/layers-2x.png',
	'./Leaflet-1.7.1/dist/images/layers.png',
	'./Leaflet-1.7.1/dist/images/marker-icon-2x.png',
	'./Leaflet-1.7.1/dist/images/marker-icon.png',
	'./Leaflet-1.7.1/dist/images/marker-shadow.png',
	'./Leaflet-1.7.1/dist/leaflet.css',
	'./Leaflet-1.7.1/dist/leaflet.js',
	'./Chart.js-2.9.4/dist/Chart.min.css',
	'./Chart.js-2.9.4/dist/Chart.min.js',
];

self.addEventListener('install', (installEvent) => {
	installEvent.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			cache.addAll(ASSETS);
		})
	);
});

self.addEventListener('activate', (activateEvent) => {
	activateEvent.waitUntil(
		caches.keys().then((keyList) =>
			Promise.all(
				keyList.map((key) => {
					if (key !== CACHE_NAME) {
						console.log('[ServiceWorker] Removing old cache', key);
						return caches.delete(key);
					}
				})
			)
		)
	);
});

self.addEventListener('fetch', (fetchEvent) => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then((res) => {
			return res || fetch(fetchEvent.request);
		})
	);
});
