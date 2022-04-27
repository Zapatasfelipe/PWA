

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}

// if (window.caches){

//     //crea un cache
//     caches.open('prueba-1');
//     caches.open('prueba-2');

    
//     //verifica si existe o no (true or false)
//     // caches.has('prueba-2').then( console.log);

//     //eliminar caches
//     // caches.delete('prueba-2');

//     caches.open('cache-v1').then(cache => {

//         //agregar solo 1 o asi mismo todos
//         // cache.add('/index.html');

//         //asi es mejor mas limpio
//         cache.addAll([
//             '/index.html',
//             '/css/style.css',
//             '/img/main.jpg'
            
//         ]).then( ()=> {
//             // cache.delete('/img/main.jpg');

//             cache.put('index.html', new Response('hola mundo'));
//         });

//         //mostrar o existe arhcivo del cache 
//         cache.match('/index.html')
//         .then( resp =>{
//             resp.text().then(console.log);
//         });
        

//     });

//     //mostrar todos los caches existentes
//     caches.keys().then( keys =>{
//         console.log(keys);
//     });

// };