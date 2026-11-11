// ==========================================
// سِلّتي | خدمة استقبال الإشعارات
// Firebase Cloud Messaging
// ==========================================

// تحميل مكتبات Firebase
importScripts(
    "https://www.gstatic.com/firebasejs/13.2.0/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/13.2.0/firebase-messaging-compat.js"
);

// إعدادات مشروع سِلّتي
firebase.initializeApp({
    apiKey: "AIzaSyCYWHHS4GQ0uzRtaLj9PjY5QKKev_IwY6I",
    authDomain: "silati-e8776.firebaseapp.com",
    projectId: "silati-e8776",
    storageBucket: "silati-e8776.firebasestorage.app",
    messagingSenderId: "354123311226",
    appId: "1:354123311226:web:eeaf3ca2adfeb04ac773c3",
    measurementId: "G-KGHZ9M14H3"
});

// تهيئة الإشعارات
const messaging = firebase.messaging();

// ==========================================
// استقبال الإشعارات في الخلفية
// ==========================================

messaging.onBackgroundMessage((payload) => {

    console.log(
        "سِلّتي: وصل إشعار جديد",
        payload
    );

    // إذا كان الإشعار يحتوي على notification
    // تتولى Firebase عرضه تلقائياً.

    if (payload.notification) {
        return;
    }

    // الإشعارات التي تحتوي على بيانات فقط
    const title =
        payload.data?.title || "🛒 سِلّتي";

    const options = {
        body:
            payload.data?.body ||
            "لديك تحديث جديد في طلبك",

        icon: "./icon-192.png",

        badge: "./icon-192.png",

        tag: payload.data?.tag || "silati-notification",

        data: {
            url: payload.data?.url || "./my-orders.html"
        },

        vibrate: [200, 100, 200],

        dir: "rtl",

        lang: "ar"
    };

    self.registration.showNotification(
        title,
        options
    );

});

// ==========================================
// عند الضغط على الإشعار
// ==========================================

self.addEventListener("notificationclick", (event) => {

    event.notification.close();

    const targetUrl =
        event.notification.data?.url ||
        "./my-orders.html";

    event.waitUntil(

        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then((clientList) => {

            for (const client of clientList) {

                if ("focus" in client) {

                    client.navigate(targetUrl);

                    return client.focus();
                }
            }

            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }

        })

    );

});

console.log("✅ خدمة إشعارات سِلّتي جاهزة");
