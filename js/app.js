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

const products = [
    { 
        id: 1, 
        name: "سماعات لاسلكية", 
        price: 150, 
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" 
    },
    { 
        id: 2,
        name: "ساعة ذكية مقاومة للماء", 
        price: 299, 
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" 
    },
    { 
        id: 3, 
        name: "نظارات شمسية رياضية", 
        price: 85, 
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500" 
    },
    { 
        id: 4, 
        name: "حقيبة ظهر مقاومة للصدمات", 
        price: 120, 
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500" 
    }
];

let cart = JSON.parse(localStorage.getItem("shopping_cart")) || [];

function displayProducts() {
    const item = document.querySelector(".cards");
    item.innerHTML = ""; 

    products.forEach(product => {
        const productCard = document.createElement("div");

        productCard.className = "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-between border border-gray-100 dark:border-gray-700 hover:shadow-lg transition duration-300";

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded-lg mb-4">
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">${product.name}</h3>
            <p class="text-[#9238FF] font-semibold mb-3">${product.price} شيكل</p>
            
            <div class="mt-auto">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm text-gray-500 dark:text-gray-300">الكمية:</span>
                    <input type="number" id="qty-${product.id}" value="1" min="1" class="w-16 border dark:border-gray-600 rounded-lg px-2 py-1 text-center font-semibold bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-[#9238FF]">
                </div>
                <button onclick="addToCart(${product.id})" class="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 rounded-lg transition">
                إضافة إلى السلة
                </button>
            </div>
        `;
        item.appendChild(productCard);
    });
}

function addToCart(productId) {
    const quantityInput = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity <= 0) {
        alert("الرجاء إدخال كمية صحيحة!");
        return;
    }

    const product = products.find(p => p.id === productId);
    const existingProductIndex = cart.findIndex(item => item.id === productId); //هان عشان نفحص هل المنتج موجود قبل او لا

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += quantity; //المنتج موجود قبل في السلة
    } else {  //المنتج جديد على السلة
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    localStorage.setItem("shopping_cart", JSON.stringify(cart));
    updateCartCount();
    // alert(`تم إضافة ${quantity} من "${product.name}" بنجاح!`);
}

function updateCartCount() {
    const cartCount = document.querySelector(".cart-count");
    let totalItems = 0; 

    cart.forEach((item) => {
        totalItems += item.quantity; 
    });

    // const totalItems = cart.reduce((total, item) => total + item.quantity, 0); //هادي دالة جاهزة
    cartCount.textContent = totalItems;
}

displayProducts();
updateCartCount();