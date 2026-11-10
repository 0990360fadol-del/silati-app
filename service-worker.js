// ==========================================
// سِلّتي | Service Worker
// إدارة التخزين المؤقت وتشغيل التطبيق
// ==========================================

const CACHE_NAME = "silati-cache-v2";

const APP_FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./bottom-nav.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];

// تثبيت الخدمة
self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_FILES))
            .then(() => self.skipWaiting())
    );

});

// تفعيل الخدمة وتنظيف النسخ القديمة
self.addEventListener("activate", event => {

    event.waitUntil(
        caches.keys().then(keys => {

            return Promise.all(
                keys.map(key => {

                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }

                })
            );

        }).then(() => self.clients.claim())
    );

});

// التعامل مع الطلبات
self.addEventListener("fetch", event => {

    const request = event.request;
    const url = new URL(request.url);

    // تجاهل الطلبات غير التابعة للموقع
    if (url.origin !== self.location.origin) {
        return;
    }

    // تجاهل الطلبات التي ليست GET
    if (request.method !== "GET") {
        return;
    }

    // عدم تخزين صفحات Firebase أو بياناتها
    if (
        url.pathname.includes("/__/") ||
        url.pathname.includes("firestore")
    ) {
        return;
    }

    // تحميل الملفات من الشبكة أولاً
    event.respondWith(

        fetch(request)
            .then(response => {

                if (
                    response &&
                    response.status === 200 &&
                    response.type === "basic"
                ) {

                    const copy = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(request, copy);
                        });

                }

                return response;

            })
            .catch(() => {

                return caches.match(request)
                    .then(cached => {

                        if (cached) {
                            return cached;
                        }

                        if (request.mode === "navigate") {
                            return caches.match("./index.html");
                        }

                    });

            })

    );

});

console.log("سِلّتي: خدمة التطبيق جاهزة");
