const staticCacheName = 'anime-app-4';
const contentCacheName = 'anime-app-content-1';

const latestCaches = [ staticCacheName, contentCacheName ];
// asdfsfafs
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll([
          '/skeleton',
          '/build/bundle.js',
          '/build/styles.css',
          '//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css',
        ]);
      })
  )
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames.filter(name => name.includes('anime-app') && !latestCaches.includes(name))
          .map(deleteCacheName => caches.delete(deleteCacheName))
      )
    )
  )
});

self.addEventListener('push', event => {
  const json = event.data.json();
  event.waitUntil(self.registration.showNotification(
    json.title,
    { body: json.body, vibrate: [200, 100, 200, 100, 200, 100, 200] }
  ));
});

function serveImage(request) {
  return caches.open(contentCacheName)
    .then(cache => {
      return cache.match(request)
        .then(res => {
          return {res, cache};
        });
    })
    .then(({res, cache}) => {
      return res || fetch(request)
          .then(res => {
            cache.put(request, res.clone());
            return res;
          });
    });
}

function serveApi(request) {
  return caches.open(staticCacheName)
    .then(cache => {
      return cache.match(request)
        .then(res => {
          return {res, cache};
        });
    })
    .then(({res, cache}) => {
      return res || fetch(request)
          .then(res => {
            cache.put(request, res.clone());
            return res;
          });
    });
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const requestUrl = new URL(request.url);
  const cacheableAPIUrls = [
    '/api/ann/',
  ];

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname.startsWith('/media/images/')) {
      return event.respondWith(serveImage(request));
    }

    if (
      event.request.method === 'GET' &&
      cacheableAPIUrls.filter(url => requestUrl.pathname.startsWith(url)).length !== 0
    ) {
      return event.respondWith(serveApi(request));
    }

    if (requestUrl.pathname === '/') {
      return event.respondWith(caches.match('/skeleton'));
    }
  }

  return event.respondWith(
    caches.match(request)
      .then(result => {
        return result || fetch(event.request);
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
