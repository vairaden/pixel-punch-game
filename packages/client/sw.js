const CACHE_PREFIX = 'pixel-punch';
const CACHE_VERSION = 1;
const CACHE_NAME = `${CACHE_PREFIX}-v${CACHE_VERSION}`;

const URLS = ['/index.html', '/assets'];

this.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(URLS);
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
  );
});

this.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (CACHE_PREFIX.indexOf(cacheName) === 0) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

this.addEventListener('fetch', event => {
  const { url } = event.request;
  // Пропускаем запросы chrome-extension://
  if (
    url.startsWith('chrome-extension') ||
    url.includes('extension') ||
    !(url.indexOf('http') === 0)
  )
    return;

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      const fetchRequest = event.request.clone();
      return fetch(fetchRequest)
        .then(response => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(err => console.error(err));
    })
  );
});
