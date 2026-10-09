// 🌐 AI Master Studio - Universal PWA Auto-Update Engine
// భవిష్యత్తులో మీరు లేదా యూజర్లు ఏ యాప్‌ను ఇన్‌స్టాల్ చేసుకున్నా,
// కొత్త వెర్షన్ వచ్చిన వెంటనే ఆటోమేటిక్‌గా అప్‌డేట్ అయ్యేలా ఈ ఇంజిన్ నిర్మించబడింది.

const CACHE_NAME = 'aims-universal-pwa-v1';

// 1. Installation - Install fresh and immediately activate
self.addEventListener('install', (event) => {
  console.log('⚡ [PWA Engine] New version detected - Installing & Skipping Waiting...');
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

// 3. Network Fetch - Network first for all navigation and API requests with seamless fallback
self.addEventListener('fetch', (event) => {
  // Pass-through without stale locking
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }
});

// 4. Client Communication - Handle manual and automated skip waiting requests
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
