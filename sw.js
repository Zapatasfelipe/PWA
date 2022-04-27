

const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

//guardar cosas donde nunca se tocaran como bostrap o imagenes
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

const CACHE_DYNAMIC_LIMIT = 50;


function limpiarCache(cacheName,numeroItems){
    caches.open(cacheName)
    .then( cache => {

        return cache.keys()
        .then( keys => {
            if (keys.length > numeroItems){
                cache.delete(keys[0])
                .then(limpiarCache(cacheName, numeroItems));
            }
        });
    });

}

self.addEventListener('install', e => {

    const cacheProm = caches.open('CACHE_STATIC_NAME')
    .then( cache => {

         return cache.addAll([
            '/',
            '/index.html',
            '/pages/page2.html',
            '/css/style.css',
            '/img/main.jpg',
            '/js/app.js',
            '/pages/offline.html'
        ]);

    });

    const cacheInmutable = caches.open('CACHE_INMUTABLE_NAME')
        .then( cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));
            
    e.waitUntil(Promise.all([cacheProm, cacheInmutable]));

});

self.addEventListener('activate', e =>{

     const respuesta = caches.keys().then(keys =>{
        keys.forEach(key =>{
            //static-v4
            if(key !== CACHE_STATIC_NAME && key.includes('static') ){
                return caches.delete(key);
            }
        })
    });

    e.waitUntil(respuesta);

});

self.addEventListener('fetch', e =>{

    const respuesta=caches.match( e.request)
    .then(res =>{

        if(res ) return res;

    //no existe el archivo


        return fetch( e.request).then( newResp => {
                caches.open('CACHE_DYNAMIC_NAME')
                    .then(cache =>{
                        cache.put( e.request, newResp);
                        limpiarCache(CACHE_DYNAMIC_NAME, 50 );
                });
                    
                return newResp.clone();
            })
            .catch(err => {

                if(e.request.headers.get('accept').includes('text/html')){
                    return caches.match('/pages/offline.html');
                }
                

            });
                
    });

    e.respondWith(respuesta);

})