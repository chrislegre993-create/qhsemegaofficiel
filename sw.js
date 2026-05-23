// QHSE MEGA - Service Worker v2
var CACHE_NAME = 'qhse-mega-v2';
var ASSETS = ['./index.html','./manifest.json','./icon-192.png','./icon-512.png'];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
    return Promise.all(ASSETS.map(function(url) {
      return cache.add(url).catch(function(err){ console.warn('Cache miss:', url); });
    }));
  }));
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k){return k!==CACHE_NAME;}).map(function(k){return caches.delete(k);}));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  var url = e.request.url;
  if (url.includes('supabase.co') || url.includes('anthropic.com')) return;
  if (e.request.method !== 'GET') return;

  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(function(r) {
        var clone = r.clone();
        caches.open(CACHE_NAME).then(function(c){ c.put(e.request, clone); });
        return r;
      }).catch(function() {
        return caches.match('./index.html');
      })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) return cached;
      return fetch(e.request).then(function(r) {
        if (r.status === 200) {
          var clone = r.clone();
          caches.open(CACHE_NAME).then(function(c){ c.put(e.request, clone); });
        }
        return r;
      });
    })
  );
});

self.addEventListener('push', function(e) {
  var data = {};
  if (e.data) { try { data = e.data.json(); } catch(err) { data = {title:'QHSE MEGA', body:e.data.text()}; } }
  var title = data.title || 'QHSE MEGA';
  var options = {
    body: data.body || 'Nouvelle alerte QHSE',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: data.tag || 'qhse-alert',
    renotify: true,
    requireInteraction: data.urgent || false,
    data: { url: data.url || './' },
    actions: [{action:'open',title:'Ouvrir'},{action:'dismiss',title:'Ignorer'}]
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  if (e.action === 'dismiss') return;
  var targetUrl = (e.notification.data && e.notification.data.url) ? e.notification.data.url : './';
  e.waitUntil(
    clients.matchAll({type:'window',includeUncontrolled:true}).then(function(list) {
      for (var i=0; i<list.length; i++) {
        if ('focus' in list[i]) { list[i].focus(); list[i].postMessage({type:'NAVIGATE',url:targetUrl}); return; }
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});

self.addEventListener('sync', function(e) {
  if (e.tag === 'qhse-sync') {
    e.waitUntil(clients.matchAll().then(function(list) {
      list.forEach(function(c){ c.postMessage({type:'SYNC_READY'}); });
    }));
  }
});
