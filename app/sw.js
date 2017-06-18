const staticCacheName = 'anime-app-3';

self.addEventListener('install', event => {

});

self.addEventListener('activate', event => {

});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheEntry => {
      return cacheEntry || fetch(event.request)
        .then(response => {
          return caches.open(staticCacheName)
            .then(cache => {
              const { url, method } = event.request;
              if (method !== 'GET') {
                return response;
              }

              if (url.includes('/api') || url.includes('.png') || url.includes('.jpg')) {
                cache.put(event.request, response.clone());
              }
              return response;
            })
        });
    })
  );
});

self.addEventListener('message', event => {
  const { data: { action }} = event;

  switch (action) {
    case 'skip_waiting':
      self.skipWaiting();
      break;
    default:
      break;
  }
});
