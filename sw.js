const CACHE_NAME = 'gestioui-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/login.html',
  '/dashboard.html',
  '/assets/css/main.css',
  '/assets/js/core/auth.js',
  '/assets/js/core/router.js',
  '/assets/js/core/data-manager.js',
  '/assets/js/ui/modal.js',
  '/assets/js/ui/datatable.js',
  '/assets/templates/navbar.html',
  '/assets/templates/footer.html',
  '/manifest.json',
  // Ajoutez ici les fichiers critiques que vous souhaitez rendre disponibles hors ligne
];

// Installation du service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Mise en cache des fichiers');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activation du service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Suppression de l’ancien cache:', cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retourne le cache s’il existe, sinon fait une requête réseau
      return response || fetch(event.request);
    })
  );
});