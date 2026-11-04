// 🌐 AI Master Studio - Universal PWA Auto-Update Engine
// భవిష్యత్తులో మీరు లేదా యూజర్లు ఏ యాప్‌ను ఇన్‌స్టాల్ చేసుకున్నా,
// కొత్త వెర్షన్ వచ్చిన వెంటనే ఆటోమేటిక్‌గా అప్‌డేట్ అయ్యేలా ఈ ఇంజిన్ నిర్మించబడింది.

const CACHE_NAME = 'aims-service-worker-hybrid';

// 1. Installation - Install fresh and immediately activate
self.addEventListener('install', (event) => {
  console.log('⚡ [PWA Engine] Installing & Skipping Waiting...');
  self.skipWaiting();
});

// 2. Activation - Delete all obsolete caches and take immediate control of all client tabs
self.addEventListener('activate', (event) => {
  console.log('🚀 [PWA Engine] Activating new version & purging obsolete cache locks...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log(`🧹 [PWA Engine] Purged old cache: ${name}`);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Hybrid Network-First Fetch Engine (హైబ్రిడ్ లైవ్ నెట్‌వర్క్ ఫస్ట్ ఇంజిన్)
// పేజీ రీలోడ్ చేసిన వెంటనే సర్వర్ నుండి సరికొత్త మార్పులను లైవ్‌గా లోడ్ చేస్తుంది
self.addEventListener('fetch', (event) => {
  // Ignore non-GET, internal, chrome-extension, and API endpoints
  if (
    event.request.method !== 'GET' || 
    !event.request.url.startsWith('http') ||
    event.request.url.includes('/api/') ||
    event.request.url.includes('/ping')
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone)).catch(() => {});
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});

// 4. Client Communication - Handle manual and automated skip waiting requests
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

