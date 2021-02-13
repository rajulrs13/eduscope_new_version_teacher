importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
workbox.skipWaiting();
workbox.clientsClaim();
workbox.precaching.precacheAndRoute([]);
// workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
workbox.googleAnalytics.initialize();
workbox.routing.registerRoute(/https:\/\/fonts\.googleapis\.com/, workbox.strategies.cacheFirst({cacheName: 'google-font'}), 'GET')
workbox.routing.registerRoute(/https:\/\/use\.fontawesome\.com\/releases\/v5\.4\.1\/css\/all\.css/, workbox.strategies.cacheFirst({cacheName: 'font-awesome'}), 'GET')
workbox.routing.registerRoute(/https:\/\/unpkg\.com\/xlsx\/dist\/xlsx\.full\.min\.js/, workbox.strategies.cacheFirst({cacheName: 'script'}), 'GET')
workbox.routing.registerRoute(/https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/axios\/0\.18\.0\/axios\.min\.js/, workbox.strategies.cacheFirst({cacheName: 'script'}), 'GET')