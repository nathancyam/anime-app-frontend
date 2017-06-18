const staticCacheName = 'anime-app-3';
const contentCacheName = 'anime-app-content-1';

const latestCaches = [ staticCacheName, contentCacheName ];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll([
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

self.addEventListener('fetch', ({ request } = event) => {
  const requestUrl = new URL(request.url);
  const cacheableAPIUrls = [
    '/api/ann/'
  ];

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname.startsWith('/media/images/')) {
      event.respondWith(serveImage(request));
      return;
    }

    if (
      event.request.method === 'GET' &&
      cacheableAPIUrls.filter(url => requestUrl.pathname.startsWith(url)).length !== 0
    ) {
      event.respondWith(serveApi(request));
    }
  }

  event.respondWith(fetch(request));
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
