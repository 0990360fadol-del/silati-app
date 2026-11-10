// ==========================================
// سِلّتي | الشريط السفلي الموحد
// ==========================================

(function () {

    // منع إنشاء الشريط أكثر من مرة
    if (document.querySelector(".silati-bottom-nav")) {
        return;
    }

    // إنشاء التنسيقات
    const style = document.createElement("style");

    style.textContent = `
        body {
            padding-bottom: calc(85px + env(safe-area-inset-bottom)) !important;
        }

        .silati-bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            min-height: 70px;
            padding-bottom: env(safe-area-inset-bottom);
            background: #ffffff;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-top: 1px solid #e5eee9;
            box-shadow: 0 -4px 18px rgba(0,0,0,0.08);
            font-family: Arial, sans-serif;
        }

        .silati-bottom-nav a {
            flex: 1;
            text-decoration: none;
            color: #84918a;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            font-size: 11px;
            font-weight: bold;
            height: 70px;
            position: relative;
            transition: color 0.2s;
            -webkit-tap-highlight-color: transparent;
        }

        .silati-bottom-nav a .nav-icon {
            font-size: 23px;
        }

        .silati-bottom-nav a.active {
            color: #087f5b;
        }

        .silati-bottom-nav a.active::before {
            content: "";
            position: absolute;
            top: 0;
            width: 32px;
            height: 3px;
            background: #087f5b;
            border-radius: 0 0 5px 5px;
        }

        .silati-cart-badge {
            position: absolute;
            top: 7px;
            right: calc(50% - 20px);
            background: #e53935;
            color: white;
            min-width: 17px;
            height: 17px;
            border-radius: 20px;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 4px;
        }
    `;

    document.head.appendChild(style);

    // تحديد الصفحة الحالية
    const currentPage =
        location.pathname.split("/").pop() || "index.html";

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

    // إنشاء الشريط
    const nav = document.createElement("nav");

    nav.className = "silati-bottom-nav";
    nav.setAttribute("aria-label", "التنقل الرئيسي");

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

    // تحديث أولي
    updateBadge();

    // تحديث عند تغيير البيانات من صفحة أخرى
    window.addEventListener("storage", updateBadge);

    // تحديث عند العودة إلى الصفحة
    window.addEventListener("pageshow", updateBadge);

    // إتاحة التحديث لبقية صفحات التطبيق
    window.updateSilatiCartBadge = updateBadge;

})();
