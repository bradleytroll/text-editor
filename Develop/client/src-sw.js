const { offlineFallback, warmStrategyCache } = require('workbox-recipes');


const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
const assetCache = new CacheFirst({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 7 * 24 * 60 * 60,
    }),
  ],
});

offlineFallback({
  pageFallback: '/index.html',
  // networkFallback: {
  //   // TODO: Add a URL to your fallback service worker
  //   url: '/src-sw.js',
//  },
});


registerRoute(
  /\.(?:css|js|png|gif|jpg|jpeg|svg)$/,
  assetCache,
  'GET' 
);
