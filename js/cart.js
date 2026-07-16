let theme = localStorage.getItem("theme") || "light";

document.documentElement.classList.add(theme);

const theme_btn = document.querySelector(".theme");
const theme_icon = document.querySelector(".theme-icon");

if (theme === "dark") {
    theme_icon.className = "fa-solid fa-moon";
} else {
    theme_icon.className = "fa-regular fa-sun";
}

theme_btn.onclick = () => {
    document.documentElement.classList.toggle("dark");

    let theme = document.documentElement.classList.contains("dark")? "dark": "light";

    localStorage.setItem("theme", theme); 

    if (theme === "dark") {
        theme_icon.className = "fa-solid fa-moon";
    } else {
        theme_icon.className = "fa-regular fa-sun";
    }
};

let cart = JSON.parse(localStorage.getItem("shopping_cart")) || [];

function displayCartItems() {
    const container = document.querySelector(".cart-items");
    const totalPriceElement = document.querySelector(".total-price");
    
    container.innerHTML = ""; 

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-gray-500 dark:text-gray-400">
                <p class="text-xl mb-4">سلة المشتريات فارغة حالياً</p>
                <a href="index.html" class="text-[#9238FF] hover:underline font-semibold">اضغط هنا لإضافة منتجات للمتجر</a>
            </div>
        `;
        totalPriceElement.textContent = "0";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement("div");
        row.className = "py-5 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-100 dark:border-gray-800 last:border-0 transition duration-300";

        row.innerHTML = `
            <div class="flex items-center gap-5 w-full md:w-auto">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div class="space-y-1">
                    <h3 class="font-bold text-gray-900 dark:text-white text-base md:text-lg">${item.name}</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">السعر الفردي: <span class="font-semibold text-gray-700 dark:text-gray-300">${item.price} شيكل</span></p>
                </div>
            </div>

            <div class="flex items-center justify-between md:justify-end gap-6 md:gap-12 w-full md:w-auto">
                
                <div class="flex flex-col items-center">
                    <span class="text-xs text-gray-400 dark:text-gray-500 mb-2 font-medium">الكمية</span>
                    <span class="flex items-center justify-center font-bold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 w-12 h-9 rounded-lg text-sm">
                        ${item.quantity}
                    </span>
                </div>

                <div class="flex flex-col items-center">
                    <span class="text-xs text-gray-400 dark:text-gray-500 mb-2 font-medium">المجموع</span>
                    <span class="flex items-center justify-center font-extrabold text-[#9238FF] text-base h-9 min-w-[85px]">
                        ${itemTotal} شيكل
                    </span>
                </div>

                <div class="flex flex-col items-center">
                    <span class="text-xs text-transparent mb-2 select-none">إجراء</span>
                    <button onclick="removeItem(${index})" class="flex items-center justify-center text-red-600 hover:text-red-850 hover:bg-red-50 dark:hover:bg-red-950/30 w-10 h-9 rounded-xl transition duration-300" title="حذف العنصر">
                        <i class="fa-regular fa-trash-can text-lg"></i>
                    </button>
                </div>

            </div>
        `;
        container.appendChild(row);
    });

    totalPriceElement.textContent = total;
}

function removeItem(index) {
    cart.splice(index, 1); 
    localStorage.setItem("shopping_cart", JSON.stringify(cart)); 
    displayCartItems(); 
}

function clearCart() {
    if (cart.length === 0) {
        alert("السلة فارغة");
        return; 
    }

    if (confirm("هل أنتِ متأكدة من رغبتكِ في تفريغ السلة بالكامل؟")) {
        cart = [];
        localStorage.removeItem("shopping_cart");
        displayCartItems();
    }

}

function checkout() {
    if (cart.length === 0) {
        alert("سلتك فارغة, يرجى إضافة منتجات أولاً قبل إتمام الشراء.");
        return;
    }

    alert("شكراً لتسوقكم معنا! تم تأكيد طلبكم بنجاح.");
    cart = [];
    localStorage.removeItem("shopping_cart");
    displayCartItems();
}

displayCartItems();