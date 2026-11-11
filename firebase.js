// ==========================================
// مشروع سِلّتي
// إعداد Firebase والمصادقة وقاعدة البيانات والإشعارات
// ==========================================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

import {
    getMessaging,
    getToken,
    onMessage,
    isSupported
}
from "https://www.gstatic.com/firebasejs/13.2.0/firebase-messaging.js";

// ==========================================
// إعدادات مشروع سِلّتي
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyCYWHHS4GQ0uzRtaLj9JjY5QKKev_IwY6I",
    authDomain: "silati-e8776.firebaseapp.com",
    projectId: "silati-e8776",
    storageBucket: "silati-e8776.firebasestorage.app",
    messagingSenderId: "354123311226",
    appId: "1:354123311226:web:eeaf3ca2adfeb04ac773c3",
    measurementId: "G-KGHZ9M14H3"
};

// ==========================================
// مفتاح الإشعارات VAPID
// ==========================================

const VAPID_KEY =
"BJtwqzlY5V_wL6qF4jNQMK9R2sar9i38lVnEQuKX6K6KgAWHQZCOuW3t50snbSUX4Ookny1qncr-eWYiKkHOghE";

// ==========================================
// تهيئة Firebase
// ==========================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

// ==========================================
// تهيئة خدمة الإشعارات
// ==========================================

async function getSilatiMessaging() {

    try {

        const supported = await isSupported();

        if (!supported) {
            console.warn("المتصفح لا يدعم إشعارات سِلّتي");
            return null;
        }

        return getMessaging(app);

    } catch (error) {

        console.error("تعذر تهيئة الإشعارات:", error);

        return null;
    }
}

// ==========================================
// طلب إذن الإشعارات والحصول على الرمز
// ==========================================

async function requestSilatiNotifications() {

    try {

        if (!("Notification" in window)) {
            throw new Error("المتصفح لا يدعم الإشعارات");
        }

        if (!("serviceWorker" in navigator)) {
            throw new Error("المتصفح لا يدعم Service Worker");
        }

        const permission = await Notification.requestPermission();

        if (permission !== "granted") {

            return {
                success: false,
                message: "لم يتم السماح بالإشعارات"
            };
        }

        const registration =
            await navigator.serviceWorker.register(
                "./firebase-messaging-sw.js"
            );

        const messaging = await getSilatiMessaging();

        if (!messaging) {
            throw new Error("خدمة الإشعارات غير متاحة");
        }

        const token = await getToken(messaging, {
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration: registration
        });

        if (!token) {
            throw new Error("لم يتم الحصول على رمز الإشعارات");
        }

        console.log("تم تفعيل إشعارات سِلّتي");

        return {
            success: true,
            token: token,
            message: "تم تفعيل الإشعارات بنجاح"
        };

    } catch (error) {

        console.error("خطأ في تفعيل الإشعارات:", error);

        return {
            success: false,
            message: error.message
        };
    }
}

// ==========================================
// استقبال الإشعارات أثناء فتح التطبيق
// ==========================================

async function listenForSilatiNotifications(callback) {

    const messaging = await getSilatiMessaging();

    if (!messaging) {
        return () => {};
    }

    return onMessage(messaging, (payload) => {

        console.log("إشعار جديد:", payload);

        if (typeof callback === "function") {
            callback(payload);
        }

    });
}

// ==========================================
// تصدير الخدمات
// ==========================================

export {
    app,
    db,
    auth,
    requestSilatiNotifications,
    listenForSilatiNotifications
};

console.log("✅ سِلّتي متصل بخدمات Firebase والإشعارات");
