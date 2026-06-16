// ── Vedic Panchanga Service Worker ──────────────────────────────────────────
// Strategy:
//   • App shell (index.html, manifest) → Cache First (serve offline instantly)
//   • Google Fonts → Cache First with 30-day expiry
//   • SunCalc CDN → Cache First (library doesn't change)
//   • Everything else → Network First with cache fallback

const CACHE_NAME = 'vedic-panchanga-v2';
const FONT_CACHE = 'vedic-fonts-v1';
const CDN_CACHE  = 'vedic-cdn-v1';

// App shell files cached on install
const SHELL = [
  './index.html',
  './manifest.json',
];

// ── Install: pre-cache app shell ───────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: clean up old caches ─────────────────────────────────────────
self.addEventListener('activate', event => {
  const CURRENT = [CACHE_NAME, FONT_CACHE, CDN_CACHE];
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => !CURRENT.includes(k)).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch ──────────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Google Fonts — cache first, 30 days
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(event.request, FONT_CACHE));
    return;
  }

  // SunCalc CDN (unpkg) — cache first forever (pinned version)
  if (url.hostname === 'unpkg.com') {
    event.respondWith(cacheFirst(event.request, CDN_CACHE));
    return;
  }

  // App shell & local assets — cache first
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('.json') || url.pathname.endsWith('.js')) {
    event.respondWith(cacheFirst(event.request, CACHE_NAME));
    return;
  }

  // All other requests — network first with cache fallback
  event.respondWith(networkFirst(event.request, CACHE_NAME));
});

// ── Strategies ─────────────────────────────────────────────────────────────
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Return offline fallback for HTML requests
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('./index.html');
    }
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}
