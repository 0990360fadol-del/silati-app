// ==========================================
// سِلّتي | الشريط السفلي الموحد والبوابة الرئيسية
// تصميم مطور
// ==========================================

(function () {

    // منع إنشاء الشريط أكثر من مرة
    if (document.querySelector(".silati-bottom-nav")) {
        return;
    }

    const style = document.createElement("style");

    style.textContent = `

        body {
            padding-bottom: calc(85px + env(safe-area-inset-bottom)) !important;
        }

        /* =========================
           أزرار الفئات الرئيسية
        ========================= */

        .silati-roles-section {
            margin: 5px 15px 22px;
            padding: 18px 14px;
            background: linear-gradient(145deg, #ffffff, #f0f8f3);
            border: 1px solid #e0eee6;
            border-radius: 22px;
            box-shadow: 0 5px 18px rgba(0, 70, 45, .07);
        }

        .silati-roles-title {
            text-align: center;
            margin: 0 0 6px;
            color: #075c43;
            font-size: 18px;
            font-weight: bold;
        }

        .silati-roles-subtitle {
            text-align: center;
            color: #7c8982;
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
            color: white;
            box-shadow: 0 4px 10px rgba(0,0,0,.09);
            transition: transform .2s, box-shadow .2s;
            -webkit-tap-highlight-color: transparent;
        }

        .silati-role-card:active {
            transform: scale(.95);
        }

        .silati-role-card.merchant {
            background: linear-gradient(145deg, #087f5b, #04563d);
        }

        .silati-role-card.customer {
            background: linear-gradient(145deg, #e5a900, #c98200);
        }

        .silati-role-card.delivery {
            background: linear-gradient(145deg, #2876c7, #174b91);
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
            opacity: .9;
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
           الشريط السفلي
        ========================= */

        .silati-bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            min-height: 74px;
            padding: 5px 4px env(safe-area-inset-bottom);
            background: linear-gradient(120deg, #075c43, #087f5b, #064d3a);
            display: flex;
            justify-content: space-around;
            align-items: center;
            box-shadow: 0 -5px 20px rgba(0, 55, 35, .20);
            font-family: Arial, sans-serif;
            border-radius: 17px 17px 0 0;
        }

        .silati-bottom-nav a {
            flex: 1;
            text-decoration: none;
            color: #d5eee3;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;
            font-size: 11px;
            font-weight: bold;
            height: 65px;
            position: relative;
            transition: .2s;
            -webkit-tap-highlight-color: transparent;
        }

        .silati-bottom-nav a .nav-icon {
            font-size: 22px;
            line-height: 1.2;
            transition: transform .2s;
        }

        .silati-bottom-nav a.active {
            color: #ffffff;
        }

        .silati-bottom-nav a.active .nav-icon {
            transform: translateY(-3px) scale(1.12);
        }

        .silati-bottom-nav a.active::before {
            content: "";
            position: absolute;
            top: 0;
            width: 34px;
            height: 3px;
            background: #ffd45a;
            border-radius: 0 0 6px 6px;
        }

        .silati-bottom-nav a.active::after {
            content: "";
            position: absolute;
            bottom: 3px;
            width: 42px;
            height: 42px;
            border-radius: 14px;
            background: #ffffff18;
            z-index: -1;
        }

        .silati-cart-badge {
            position: absolute;
            top: 3px;
            right: calc(50% - 20px);
            background: #ffca28;
            color: #3e3100;
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

    document.head.appendChild(style);


    // تحديد الصفحة الحالية
    const currentPage =
        location.pathname.split("/").pop() || "index.html";


    // إضافة أزرار الفئات في الصفحة الرئيسية فقط
    function addRoleButtons() {

        if (currentPage !== "index.html") {
            return;
        }

        // منع التكرار
        if (document.querySelector(".silati-roles-section")) {
            return;
        }

        const hero = document.querySelector(".hero");

        if (!hero) {
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


    // تحديد النافذة النشطة
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


    // إنشاء الشريط السفلي
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


    // تحديث عداد السلة
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


    // التحديث الأولي
    updateBadge();


    // تحديث عند تغيير البيانات
    window.addEventListener("storage", updateBadge);

    window.addEventListener("pageshow", updateBadge);


    // إتاحة الوظائف لبقية الصفحات
    window.updateSilatiCartBadge = updateBadge;


    // إضافة الأزرار بعد تحميل الصفحة
    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            addRoleButtons
        );

    } else {

        addRoleButtons();

    }


})();
