// 💡 English Code / ఇంగ్లీష్ కోడ్
const CACHE_NAME = 'aimaster-v8';
// 💡 తెలుగు అనువాదం: యాప్ యొక్క లోకల్ క్యాష్ పేరును 'aimaster-v4' గా డిఫైన్ చేసాము.

// 💡 English Code / ఇంగ్లీష్ కోడ్
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.png',
  '/icon-192.png',
  '/icon-512.png'
];
// 💡 తెలుగు అనువాదం: క్యాష్ స్టోరేజ్ లో భద్రపరచవలసిన యాప్ ఫైల్స్ మరియు ఇమేజ్ మార్గాల జాబితా.

// 💡 English Code / ఇంగ్లీష్ కోడ్
self.addEventListener('install', (event) => {
// 💡 తెలుగు అనువాదం: సర్వీస్ వర్కర్ ఇన్‌స్టాల్ అయ్యేటప్పుడు ట్రిగ్గర్ అయ్యే ఈవెంట్ లిజనర్.

  // 💡 English Code / ఇంగ్లీష్ కోడ్
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // 💡 తెలుగు అనువాదం: యాప్ ఫైల్స్ అన్నింటినీ క్యాష్ లోకి సక్సెస్ ఫుల్‌గా డౌన్‌లోడ్ చేసి దాచే వరకు వెయిట్ చేయిస్తుంది.

  // 💡 English Code / ఇంగ్లీష్ కోడ్
  self.skipWaiting();
  // 💡 తెలుగు అనువాదం: కొత్త సర్వీస్ వర్కర్ వెయిటింగ్ లో ఉండకుండా తక్షణమే యాక్టివేట్ అవ్వడానికి స్కిప్ చేస్తుంది.
});

// 💡 English Code / ఇంగ్లీష్ కోడ్
self.addEventListener('activate', (event) => {
// 💡 తెలుగు అనువాదం: సర్వీస్ వర్కర్ విజయవంతంగా యాక్టివేట్ అయినప్పుడు జరిగే ఈవెంట్.

  // 💡 English Code / ఇంగ్లీష్ కోడ్
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // 💡 తెలుగు అనువాదం: పాత వెర్షన్ క్యాష్‌లన్నింటినీ డిలీట్ చేసి, ప్రస్తుత లేటెస్ట్ వెర్షన్ క్యాష్ ని మాత్రమే ఉంచుతుంది.

  // 💡 English Code / ఇంగ్లీష్ కోడ్
  self.clients.claim();
  // 💡 తెలుగు అనువాదం: ప్రస్తుతం ఓపెన్ లో ఉన్న అన్ని క్లయింట్ పేజీలను ఈ కొత్త సర్వీస్ వర్కర్ కంట్రోల్ లోకి తీసుకుంటుంది.
});

// 💡 English Code / ఇంగ్లీష్ కోడ్
self.addEventListener('fetch', (event) => {
// 💡 తెలుగు అనువాదం: బ్రౌజర్ నుండి వెళ్లే ప్రతి నెట్‌వర్క్ రిక్వెస్ట్‌ను క్యాచ్ చేసే ఫెచ్ ఈవెంట్ లిజనర్.

  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isDocOrScript = event.request.mode === 'navigate' || 
                        url.pathname === '/' || 
                        url.pathname === '/index.html' || 
                        url.pathname.endsWith('.js') || 
                        url.pathname.endsWith('.css');

  if (isDocOrScript) {
    // 💡 English Code: Network-First with Cache Fallback for HTML, JS and CSS to prevent fingerprint lockouts
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            const acceptHeader = event.request.headers.get('accept');
            if (acceptHeader && acceptHeader.includes('text/html')) {
              return caches.match('/');
            }
            return new Response('Network error', { status: 503, statusText: 'Service Unavailable' });
          });
        })
    );
  } else {
    // 💡 English Code: Cache-First for static assets (images, icons)
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
  }
});
