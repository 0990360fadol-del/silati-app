// ==================================
// مشروع سِلّتي
// نظام السلة والطلبات
// ==================================

let cart = [];

// ==================================
// التحقق من التخزين
// ==================================

function storageAvailable() {
    return typeof window !== "undefined" &&
           typeof window.localStorage !== "undefined";
}

// ==================================
// قراءة السلة المحفوظة
// ==================================

if (storageAvailable()) {
    try {
        cart = JSON.parse(
            localStorage.getItem("silatiCart") || "[]"
        );

        if (!Array.isArray(cart)) cart = [];

    } catch (error) {
        cart = [];
    }
}

// ==================================
// إضافة منتج إلى السلة
// ==================================

function addToCart(name, price, quantity = 1, storeId = null, storeName = "") {

    price = Number(price);
    quantity = Math.max(1, parseInt(quantity) || 1);

    if (!name || !Number.isFinite(price) || price <= 0) {
        alert("بيانات المنتج غير صحيحة");
        return;
    }

    let product = cart.find(item =>
        item.name === name &&
        String(item.storeId || "") === String(storeId || "")
    );

    if (product) {
        product.quantity += quantity;
    } else {
        cart.push({
            name,
            price,
            quantity,
            storeId,
            storeName
        });
    }

    saveCart();

    alert("تمت إضافة " + name + " إلى السلة بنجاح 💚");
}

// ==================================
// حفظ السلة
// ==================================

function saveCart() {

    if (!storageAvailable()) return;

    localStorage.setItem(
        "silatiCart",
        JSON.stringify(cart)
    );
}

// ==================================
// إتاحة قراءة السلة للصفحات
// ==================================

function getCartItems() {
    return JSON.parse(JSON.stringify(cart));
}

// ==================================
// تفريغ السلة بعد نجاح الطلب
// ==================================

function clearCartAfterCheckout() {

    cart = [];

    saveCart();

    renderCart();
}

// ==================================
// عرض السلة
// ==================================

function renderCart() {

    let container = document.getElementById("cartItems");
    let totalElement = document.getElementById("total");

    if (!container || !totalElement) return;

    container.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        let message = document.createElement("div");

        message.className = "empty-message";
        message.textContent = "سلتك فارغة حالياً 🛒";

        container.appendChild(message);
    }

    cart.forEach((item, index) => {

        let subtotal =
            Number(item.price) * Number(item.quantity);

        total += subtotal;

        let card = document.createElement("div");
        card.className = "store-card";

        let title = document.createElement("h3");
        title.textContent = item.name;

        let store = document.createElement("p");

        store.textContent = item.storeName
            ? "المتجر: " + item.storeName
            : "";

        let price = document.createElement("p");

        price.textContent =
            "السعر: " +
            Number(item.price).toLocaleString() +
            " جنيه";

        let quantity = document.createElement("p");

        quantity.textContent =
            "الكمية: " + item.quantity;

        let subtotalElement = document.createElement("p");

        subtotalElement.textContent =
            "الإجمالي: " +
            subtotal.toLocaleString() +
            " جنيه";

        let buttons = document.createElement("div");
        buttons.className = "cart-buttons";

        let increase = document.createElement("button");

        increase.textContent = "+";
        increase.className = "increase";

        increase.onclick = () =>
            changeQuantity(index, 1);

        let decrease = document.createElement("button");

        decrease.textContent = "-";
        decrease.className = "decrease";

        decrease.onclick = () =>
            changeQuantity(index, -1);

        let remove = document.createElement("button");

        remove.textContent = "حذف";
        remove.className = "delete";

        remove.onclick = () =>
            removeProduct(index);

        buttons.append(increase, decrease, remove);

        card.append(
            title,
            store,
            price,
            quantity,
            subtotalElement,
            buttons
        );

        container.appendChild(card);
    });

    totalElement.textContent =
        total.toLocaleString() + " جنيه";
}

// ==================================
// تعديل الكمية
// ==================================

function changeQuantity(index, amount) {

    if (!cart[index]) return;

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    renderCart();
}

// ==================================
// حذف منتج
// ==================================

function removeProduct(index) {

    if (index < 0 || index >= cart.length) return;

    cart.splice(index, 1);

    saveCart();
    renderCart();
}

// ==================================
// قراءة بيانات الزبون
// ==================================

function getCustomerData() {

    let name = document.getElementById("customerName");
    let phone = document.getElementById("customerPhone");
    let region = document.getElementById("customerRegion");
    let address = document.getElementById("customerAddress");
    let note = document.getElementById("customerNote");

    if (!name || !phone || !region || !address) {
        return null;
    }

    let customer = {
        name: name.value.trim(),
        phone: phone.value.trim(),
        region: region.value.trim(),
        address: address.value.trim(),
        note: note ? note.value.trim() : ""
    };

    if (
        !customer.name ||
        !customer.phone ||
        !customer.region ||
        !customer.address
    ) {
        alert("يرجى إدخال جميع البيانات المطلوبة.");
        return null;
    }

    if (customer.phone.length < 7) {
        alert("يرجى التأكد من رقم الهاتف.");
        return null;
    }

    return customer;
}

// ==================================
// إنشاء رقم الطلب
// ==================================

function createOrderId() {

    return "ORD-" +
        Date.now() +
        "-" +
        Math.random().toString(36).substring(2, 6);
}

// ==================================
// إتاحة الدوال للصفحات
// ==================================

if (typeof window !== "undefined") {

    window.addToCart = addToCart;

    window.renderCart = renderCart;

    window.changeQuantity = changeQuantity;

    window.removeProduct = removeProduct;

    window.getCartItems = getCartItems;

    window.clearCartAfterCheckout = clearCartAfterCheckout;

    window.getCustomerData = getCustomerData;

    window.createOrderId = createOrderId;

}