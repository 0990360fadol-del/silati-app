// ==========================================
// سِلّتي | Service Worker
// إدارة التخزين المؤقت وتشغيل التطبيق
// ==========================================

const CACHE_NAME = "silati-cache-v3";

// الملفات الأساسية للتطبيق
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

// ==========================================
// تثبيت الخدمة
// ==========================================

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(async cache => {

                // تخزين كل ملف بصورة مستقلة
                // حتى لا يفشل التثبيت بسبب ملف واحد

                await Promise.all(

                    APP_FILES.map(async file => {

                        try {

                            const response = await fetch(file);

                            if (response.ok) {
                                await cache.put(file, response);
                            }

                        } catch (error) {

                            console.warn(
                                "تعذر تخزين الملف:",
                                file
                            );

                        }

                    })

                );

            })

            .then(() => self.skipWaiting())

    );

});

// ==========================================
// تفعيل الخدمة وتنظيف النسخ القديمة
// ==========================================

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

            .then(keys => {

                return Promise.all(

                    keys.map(key => {

                        // حذف نسخ سِلّتي القديمة فقط

                        if (
                            key.startsWith("silati-cache-") &&
                            key !== CACHE_NAME
                        ) {

                            return caches.delete(key);

                        }

                    })

                );

            })

            .then(() => self.clients.claim())

    );

});

// ==========================================
// التعامل مع طلبات الملفات
// ==========================================

self.addEventListener("fetch", event => {

    const request = event.request;

    const url = new URL(request.url);

    // تجاهل المواقع الخارجية
    if (url.origin !== self.location.origin) {
        return;
    }

    // تجاهل الطلبات غير GET
    if (request.method !== "GET") {
        return;
    }

    // تجاهل مسارات Firebase
    if (
        url.pathname.includes("/__/") ||
        url.pathname.includes("firestore")
    ) {
        return;
    }

    event.respondWith(

        fetch(request)

            .then(response => {

                if (
                    response &&
                    response.ok &&
                    response.type === "basic"
                ) {

                    const copy = response.clone();

                    event.waitUntil(

                        caches.open(CACHE_NAME)

                            .then(cache => {
                                return cache.put(request, copy);
                            })

                    );

                }

                return response;

            })

            .catch(async () => {

                // البحث عن نسخة محفوظة
                const cached = await caches.match(request);

                if (cached) {
                    return cached;
                }

                // عند تعذر تحميل الصفحة
                if (request.mode === "navigate") {

                    const home = await caches.match(
                        "./index.html"
                    );

                    if (home) {
                        return home;
                    }

                }

                // استجابة عند عدم توفر الملف
                return new Response(
                    "لا يوجد اتصال بالإنترنت، حاول مرة أخرى.",
                    {
                        status: 503,
                        statusText: "Offline",
                        headers: {
                            "Content-Type": "text/plain; charset=UTF-8"
                        }
                    }
                );

            })

    );

});

console.log("سِلّتي: خدمة التطبيق جاهزة");
