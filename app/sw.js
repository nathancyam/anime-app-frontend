const staticCacheName = 'anime-app-7';
const contentCacheName = 'anime-app-content-2';
const buildCacheName = 'anime-app-build-5';

const latestCaches = [ staticCacheName, contentCacheName, buildCacheName ];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(buildCacheName)
      .then(cache => {
        return cache.addAll([
          '/skeleton',
          '/build/vendor.bundle.js',
          '/build/bundle.js',
          '/build/styles.css',
        ])
      })
  );
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

  if (event.request.method === 'POST') {
    return fetch(event.request);
  }

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
      return;
    }

    if (event.request.method !== 'GET' && requestUrl.pathname.startsWith('/anime')) {
      event.respondWith(
        caches.open(staticCacheName)
          .then(cache => {
            return cache.delete(event.request)
              .then(result => ({ cache, result }));
          })
          .then(({ cache }) => {
            return fetch(event.request)
              .then(res => ({ cache, res }));
          })
          .then(({ cache, res }) => {
            cache.put(event.request, res.clone());
            return res;
          })
      );
    }

    if (requestUrl.pathname.startsWith('/build')) {
      event.respondWith(
        caches.open(buildCacheName)
          .then(cache => {
            return cache.match(event.request)
              .then(res => ({ cache, res }));
          })
          .then(({ cache, res }) => {
            return res || fetch(event.request)
                .then(res => {
                  cache.put(event.request, res.clone());
                  return res;
                });
          })
      );
      return;
    }

    if (requestUrl.pathname === '/') {
      event.respondWith(
        caches.match('/skeleton')
          .then(res => {
            const request = new Request(`${event.request.url}skeleton`, {
              headers: event.request.headers,
              method: event.request.method,
              credentials: event.request.credentials,
            });
            return res || fetch(request)
              .then(res => {
                return caches.open(staticCacheName)
                  .then(cache => ({ cache, res }));
              })
              .then(({cache, res}) => {
                cache.put('/skeleton', res.clone());
                return res;
              });
          })
      );
      return;
    }
  }

  return event.respondWith(
    caches.match(request)
      .then(result => {
        return result || fetch(event.request);
      })
  );
});

//fasdfsdfsdfs
self.addEventListener('message', event => {
  console.log(event);
  const { data: { action }} = event;

  switch (action) {
    case 'skip_waiting':
      self.skipWaiting();
      break;
    default:
      break;
  }
});
