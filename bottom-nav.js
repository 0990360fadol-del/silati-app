// ==========================================
// سِلّتي | الشريط السفلي الموحد والبوابة الرئيسية
// تصميم كحلي ملكي + أخضر زمردي + ذهبي
// ==========================================

(function () {

    // ==========================================
    // إزالة الشريط القديم إن وجد
    // دون إيقاف بقية الكود
    // ==========================================

    const oldNav = document.querySelector(".silati-bottom-nav");

    if (oldNav) {
        oldNav.remove();
    }

    // ==========================================
    // إنشاء أو تحديث التنسيقات
    // ==========================================

    let style = document.getElementById("silati-navigation-style");

    if (!style) {
        style = document.createElement("style");
        style.id = "silati-navigation-style";
        document.head.appendChild(style);
    }

    style.textContent = `

        body {
            padding-bottom: calc(90px + env(safe-area-inset-bottom)) !important;
        }

        /* =========================
           أزرار الفئات الرئيسية
        ========================= */

        .silati-roles-section {
            margin: 5px 15px 22px;
            padding: 18px 14px;
            background: linear-gradient(145deg, #ffffff, #edf7f2);
            border: 1px solid #d7eae0;
            border-radius: 22px;
            box-shadow: 0 5px 18px rgba(0, 70, 45, .08);
        }

        .silati-roles-title {
            text-align: center;
            margin: 0 0 6px;
            color: #064b45;
            font-size: 18px;
            font-weight: bold;
        }

        .silati-roles-subtitle {
            text-align: center;
            color: #71817a;
            font-size: 12px;
            margin: 0 0 17px;
        }

        .silati-roles-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 9px;
        }

        .silati-role-card {
            min-width: 0;
            min-height: 112px;
            padding: 13px 5px;
            border-radius: 16px;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 8px;
            color: white !important;
            box-shadow: 0 4px 12px rgba(0,0,0,.12);
            transition: transform .2s, box-shadow .2s;
            -webkit-tap-highlight-color: transparent;
        }

        .silati-role-card:active {
            transform: scale(.95);
        }

        .silati-role-card.merchant {
            background: linear-gradient(145deg, #00a878, #006747) !important;
        }

        .silati-role-card.customer {
            background: linear-gradient(145deg, #ffc928, #d18b00) !important;
        }

        .silati-role-card.delivery {
            background: linear-gradient(145deg, #398be8, #174b9b) !important;
        }

        .silati-role-icon {
            font-size: 31px;
            line-height: 1.2;
        }

        .silati-role-name {
            font-size: 13px;
            font-weight: bold;
        }

        .silati-role-desc {
            font-size: 10px;
            opacity: .95;
        }

        @media (max-width: 350px) {

            .silati-roles-grid {
                gap: 6px;
            }

            .silati-role-card {
                min-height: 105px;
            }

            .silati-role-name {
                font-size: 11px;
            }

            .silati-role-desc {
                font-size: 9px;
            }

        }

        /* =========================
           الشريط السفلي الجديد
        ========================= */

        body .silati-bottom-nav {
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;

            z-index: 999999 !important;

            min-height: 76px !important;

            padding: 6px 4px env(safe-area-inset-bottom) !important;

            background: linear-gradient(
                115deg,
                #101b3d 0%,
                #123b58 48%,
                #087f68 100%
            ) !important;

            background-color: #123b58 !important;

            display: flex !important;
            justify-content: space-around !important;
            align-items: center !important;

            box-shadow: 0 -5px 22px rgba(8, 25, 55, .28) !important;

            font-family: Arial, sans-serif !important;

            border-radius: 19px 19px 0 0 !important;

            border-top: 2px solid #e5b947 !important;

            box-sizing: border-box !important;
        }

        body .silati-bottom-nav a {
            flex: 1 !important;

            text-decoration: none !important;

            color: #d5e9f0 !important;

            display: flex !important;
            flex-direction: column !important;

            align-items: center !important;
            justify-content: center !important;

            gap: 5px !important;

            font-size: 11px !important;
            font-weight: bold !important;

            height: 65px !important;

            position: relative !important;

            transition: .2s !important;

            -webkit-tap-highlight-color: transparent;
        }

        body .silati-bottom-nav a .nav-icon {
            font-size: 23px !important;
            line-height: 1.2 !important;
            transition: transform .2s !important;
        }

        body .silati-bottom-nav a.active {
            color: #ffffff !important;
        }

        body .silati-bottom-nav a.active .nav-icon {
            transform: translateY(-3px) scale(1.15);
        }

        body .silati-bottom-nav a.active::before {
            content: "";
            position: absolute;
            top: 0;
            width: 34px;
            height: 3px;
            background: #ffd45a;
            border-radius: 0 0 6px 6px;
        }

        body .silati-bottom-nav a.active::after {
            content: "";
            position: absolute;
            bottom: 3px;
            width: 42px;
            height: 42px;
            border-radius: 14px;
            background: rgba(255,255,255,.13);
            z-index: -1;
        }

        .silati-cart-badge {
            position: absolute !important;
            top: 3px !important;
            right: calc(50% - 20px) !important;

            background: #ffd34e !important;
            color: #263044 !important;

            min-width: 18px;
            height: 18px;

            border-radius: 20px;

            font-size: 10px;
            font-weight: bold;

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 0 4px;

            border: 1px solid white;
        }

    `;


    // ==========================================
    // تحديد الصفحة الحالية
    // ==========================================

    const currentPage =
        location.pathname.split("/").pop() || "index.html";


    // ==========================================
    // أزرار التاجر والزبون والمندوب
    // ==========================================

    function addRoleButtons() {

        if (currentPage !== "index.html") {
            return;
        }

        if (document.querySelector(".silati-roles-section")) {
            return;
        }

        const hero = document.querySelector(".hero");

        if (!hero) {
            console.warn("سِلّتي: لم يتم العثور على قسم hero");
            return;
        }

        const section = document.createElement("section");

        section.className = "silati-roles-section";

        section.innerHTML = `

            <h2 class="silati-roles-title">
                مرحباً بك في سِلّتي 💚
            </h2>

            <p class="silati-roles-subtitle">
                اختر صفتك وابدأ رحلتك معنا
            </p>

            <div class="silati-roles-grid">

                <a href="merchant.html"
                   class="silati-role-card merchant">

                    <span class="silati-role-icon">🏪</span>

                    <span class="silati-role-name">
                        أنا تاجر
                    </span>

                    <span class="silati-role-desc">
                        إدارة متجري
                    </span>

                </a>

                <a href="stores.html"
                   class="silati-role-card customer">

                    <span class="silati-role-icon">🛒</span>

                    <span class="silati-role-name">
                        أنا زبون
                    </span>

                    <span class="silati-role-desc">
                        تسوق واطلب
                    </span>

                </a>

                <a href="delivery.html"
                   class="silati-role-card delivery">

                    <span class="silati-role-icon">🛵</span>

                    <span class="silati-role-name">
                        أنا مندوب
                    </span>

                    <span class="silati-role-desc">
                        توصيل الطلبات
                    </span>

                </a>

            </div>

        `;

        hero.insertAdjacentElement("afterend", section);

    }


    // ==========================================
    // تحديد الصفحة النشطة
    // ==========================================

    function getActivePage() {

        if (
            currentPage === "store.html" ||
            currentPage === "stores.html"
        ) {
            return "stores";
        }

        if (currentPage === "cart.html") {
            return "cart";
        }

        if (currentPage === "my-orders.html") {
            return "orders";
        }

        if (
            currentPage === "login.html" ||
            currentPage === "merchant.html" ||
            currentPage === "delivery.html"
        ) {
            return "account";
        }

        return "home";

    }


    const active = getActivePage();


    // ==========================================
    // إنشاء الشريط السفلي
    // ==========================================

    const nav = document.createElement("nav");

    nav.className = "silati-bottom-nav";

    nav.setAttribute(
        "aria-label",
        "التنقل الرئيسي"
    );

    nav.innerHTML = `

        <a href="index.html"
           class="${active === "home" ? "active" : ""}">

            <span class="nav-icon">🏠</span>
            <span>الرئيسية</span>

        </a>

        <a href="stores.html"
           class="${active === "stores" ? "active" : ""}">

            <span class="nav-icon">🏪</span>
            <span>المتاجر</span>

        </a>

        <a href="cart.html"
           class="${active === "cart" ? "active" : ""}">

            <span class="nav-icon">🛒</span>

            <span class="silati-cart-badge"
                  id="silatiNavBadge"
                  style="display:none">
                0
            </span>

            <span>السلة</span>

        </a>

        <a href="my-orders.html"
           class="${active === "orders" ? "active" : ""}">

            <span class="nav-icon">📦</span>
            <span>طلباتي</span>

        </a>

        <a href="login.html"
           class="${active === "account" ? "active" : ""}">

            <span class="nav-icon">👤</span>
            <span>حسابي</span>

        </a>

    `;

    document.body.appendChild(nav);


    // ==========================================
    // تحديث عداد السلة
    // ==========================================

    function updateBadge() {

        try {

            const cart = JSON.parse(
                localStorage.getItem("silatiCart") || "[]"
            );

            const count = Array.isArray(cart)
                ? cart.reduce((sum, item) => {

                    return sum + Math.max(
                        0,
                        Number(item.quantity) || 0
                    );

                }, 0)
                : 0;

            const badge =
                document.getElementById("silatiNavBadge");

            if (badge) {

                badge.textContent =
                    count > 99 ? "99+" : count;

                badge.style.display =
                    count > 0 ? "flex" : "none";

            }

        } catch (error) {

            console.warn(
                "سِلّتي: تعذر قراءة بيانات السلة",
                error
            );

        }

    }


    // ==========================================
    // تشغيل التحديثات
    // ==========================================

    updateBadge();

    window.addEventListener("storage", updateBadge);

    window.addEventListener("pageshow", updateBadge);

    window.updateSilatiCartBadge = updateBadge;


    // ==========================================
    // إضافة الأزرار بعد جاهزية الصفحة
    // ==========================================

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            addRoleButtons
        );

    } else {

        addRoleButtons();

    }

    console.log("سِلّتي: تم تشغيل الشريط السفلي المطوّر بنجاح");

})();
