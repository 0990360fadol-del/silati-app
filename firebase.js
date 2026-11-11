// ==========================================
// مشروع سِلّتي
// إعداد Firebase والمصادقة وقاعدة البيانات
// ==========================================

// استيراد Firebase
import { initializeApp }
from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

// إعدادات مشروع سِلّتي
const firebaseConfig = {
    apiKey: "AIzaSyCYWHHS4GQ0uzRtaLj9PjY5QKKev_IwY6I",
    authDomain: "silati-e8776.firebaseapp.com",
    projectId: "silati-e8776",
    storageBucket: "silati-e8776.firebasestorage.app",
    messagingSenderId: "354123311226",
    appId: "1:354123311226:web:eeaf3ca2adfeb04ac773c3",
    measurementId: "G-KGHZ9M14H3"
};

// تشغيل التطبيق
const app = initializeApp(firebaseConfig);

// تشغيل قاعدة البيانات
const db = getFirestore(app);

// تشغيل المصادقة
const auth = getAuth(app);

// تصدير الخدمات
export {
    app,
    db,
    auth
};

console.log("سِلّتي متصل بخدمات Firebase");
