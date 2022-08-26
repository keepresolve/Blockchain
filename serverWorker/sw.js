const CACHE_NAME = "service-worker-demo";
const urlsToCache = ["/", "/static/imges.png", "/static/cache.js"];

this.addEventListener("install", event => {
    console.log("install....",event)
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("[Service Worker]", urlsToCache);
            return cache.addAll(urlsToCache);
        })
    );
});

this.addEventListener("activate", event => {
    // 不在白名单的`CACHE_NAME`就清理
    console.log("activate",event)
    const cacheWhitelist = ["servic-worker-demo"];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // 查看一下缓存
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.keys().then(res => {
            console.log("cache", console.log(res))
        }))
    );
});

this.addEventListener("fetch", event => {
    console.log("fetch",event)
    const url = new URL(event.request.url);
    if (url.origin === location.origin && urlsToCache.indexOf(url.pathname) > -1) {
        event.respondWith(
            caches.match(event.request).then(resp => {
                if (resp) {
                    console.log("fetch ", event.request.url, "有缓存，从缓存中取");
                    return resp;
                } else {
                    console.log("fetch ", event.request.url, "没有缓存，网络获取");
                    return fetch(event.request);
                    // // 如果有需要的话我们不需要在事件响应时进行匹配 可以直接将所有发起过的请求缓存
                    // return fetch(event.request).then(response => {
                    //     return caches.open(CACHE_NAME).then(cache => {
                    //         cache.put(event.request, response.clone());
                    //         return response;
                    //     });
                    // });
                }
            })
        );
    }
});

