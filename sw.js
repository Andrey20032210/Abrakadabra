self.addEventListener('install', function(event){
    console.log('[Service Worker] Intalling Service Worker ...', 
    event);
    event.waitUntil(
        caches.open("static")
            .then(function(cache) {
                console.log("precaching");
                cache.add('/index.html');
                cache.add('/css/bootstrap.css');
                cache.add('/css/style.css');
                cache.add('/images/Logo.png');
                cache.add('/');
            })
    );
});

self.addEventListener('activate', function(event){
    console.log('[Service Worker] Activating Service Worker ...', 
    event);
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    console.log('[Service Worker] Fetching Something ...',event);
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if(response)
                    return response;
                else
                    return fetch(event.request);
            }
        )
    );
});
self.addEventListener('push', event =>{
    const notification = event.data.text();
    self.registration.showNotification(notification, {});
});