var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = [
  "/",
  // "/styles/main.css",
  // "/js/app.js",
  // "/js/main.js",
  // "sw.js"
];

self.addEventListener("install", function(event) {
  console.log("installs");
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("cache", cache);
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function(e) {
  console.log("service worker has been activated");
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function(event) {
  console.log("event", event);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      return fetch(event.request).then(function(response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        var responseToCache = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});
