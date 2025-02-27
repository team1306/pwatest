const cacheName = "offlineCache-v2";
        
// cached pages - / is the same as index.html, but had a different url
const cacheAssets = [
    '/',
    '/index.html',
    '/index.js',
    '/style.css',
    '/💩/index.html',
    '/💩/style2.css'
];

self.addEventListener('install', e => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        (async () => {
          const cache = await caches.open(cacheName);
          await cache.addAll(cacheAssets);
        })(),
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        (async () => {
            const cachedResponse = await caches.match(e.request);
            if (cachedResponse) {
            return cachedResponse;
            }

            // if reponse isn't cached, use fetch
            return fetch(e.request);
        })()
    );
});
