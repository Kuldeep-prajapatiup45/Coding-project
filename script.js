
// all html select
const isiMeAddProduct = document.getElementById("product-grid");
const searchFiltter = document.getElementById("search-input");
const historyBox = document.getElementById("history-box");
const clickBody = document.querySelector("body");
const clearSearchBtn = document.getElementById("clear-search-btn");
let showBox = document.getElementById("product-detail-modal");

const allProductList = [
    // --- GADGETS (6 Items) ---
    {
        image: 'https://darlingretail.com/cdn/shop/files/iPhone_15_Blue_Pure_Back_iPhone_15_Blue_Pure_Front_2up_Screen__WWEN_600x.jpg?v=1695103868',
        name: "iPhone 15 Pro",
        price: 135000,
        category: "Gadgets"
    },
    {
        image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500',
        name: "Cyber Bluetooth Headphone",
        price: 8999,
        category: "Gadgets"
    },
    {
        image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=500',
        name: "Google Pixel 8 Pro",
        price: 93999,
        category: "Gadgets"
    },
    {
        image: 'https://images.unsplash.com/photo-1592286927585-1d4157d88d1d?w=500',
        name: "PlayStation 5 Cyber Console",
        price: 54999,
        category: "Gadgets"
    },
    {
        image: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?w=500',
        name: "Hacker Wireless Earbuds",
        price: 3499,
        category: "Gadgets"
    },
    {
        image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500',
        name: "Neon Bluetooth Speaker",
        price: 4999,
        category: "Gadgets"
    },

    // --- SHOES (4 Items) ---
    {
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        name: "Neon Sports Sneaker",
        price: 4499,
        category: "Shoes"
    },
    {
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500',
        name: "Hacker Green Running Shoes",
        price: 5999,
        category: "Shoes"
    },
    {
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500',
        name: "Cyberpunk Pink High-Tops",
        price: 7999,
        category: "Shoes"
    },
    {
        image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500',
        name: "Dark Matrix Converse",
        price: 3999,
        category: "Shoes"
    },

    // --- LAPTOPS (3 Items) ---
    {
        image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500',
        name: "MacBook Pro Cyber Edition",
        price: 185000,
        category: "Laptops"
    },
    {
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
        name: "ASUS ROG Gaming Beast",
        price: 145000,
        category: "Laptops"
    },
    {
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500',
        name: "ThinkPad Coder Special",
        price: 85000,
        category: "Laptops"
    },

    // --- WATCHES (3 Items) ---
    {
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        name: "Futuristic Smart Watch",
        price: 15499,
        category: "Watches"
    },
    {
        image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=500',
        name: "Classic Stealth Black Watch",
        price: 11999,
        category: "Watches"
    },
    {
        image: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=500',
        name: "Matrix Digital Watch",
        price: 6499,
        category: "Watches"
    },

    // --- CLOTHES (4 Items) ---
    {
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
        name: "Cyber Punk Black Hoodie",
        price: 2999,
        category: "Clothes"
    },
    {
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500',
        name: "Hacker White Cotton Tee",
        price: 1299,
        category: "Clothes"
    },
    {
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
        name: "Matrix Long Leather Coat",
        price: 12499,
        category: "Clothes"
    },
    {
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
        name: "Dark Techwear Cargo Pants",
        price: 3499,
        category: "Clothes"
    }
];

function renderProducts(productsToShow){
allProductList.forEach((item, index) => {
    let card = document.createElement("div");
    card.className = "product-card"
    // अंदर से बाहर वाला div हटा दिया, सिर्फ अंदर का माल रखा
    card.innerHTML = `
        <div class="product-category">${item.category}</div>
        <img class="product-image" src="${item.image}" alt="Product">
        <h3 class="product-name">${item.name}</h3>
        <div class="product-price">₹${item.price}</div>
        <button class="buy-btn">View Details</button>
    `;

    
    isiMeAddProduct.appendChild(card);
    // viwe dettails 
    let viweBtn = card.querySelector(".buy-btn");
    

    viweBtn.addEventListener("click", () => {
        document.getElementById("modal-product-image").src = item.image;
        document.getElementById("modal-product-category").innerHTML = item.category;
        document.getElementById("modal-product-name").innerHTML = item.name;
        document.getElementById("modal-product-price").innerHTML = "₹" + item.price;
        document.querySelector(".product-desc").innerHTML = item.deatails;

        showBox.style.display = "flex";
    });


});
};
renderProducts(allProductList);

const modelClose = document.querySelector(".close-modal-btn");
modelClose.addEventListener("click", () => {
    showBox.style.display = "none"
})


// search filtter lagana ok
// search history 
let searchHistory = JSON.parse(localStorage.getItem("myHistory")) || [];
console.log(searchHistory)
searchFiltter.addEventListener("input", () => {
    let userFiltter = searchFiltter.value.trim().toLowerCase();
    if (searchFiltter.value.length > 0) {
        clearSearchBtn.style.display = "block"


    } else {
        clearSearchBtn.style.display = "none"
    }
    let filterInput = allProductList.filter((item) => {
        let productName = item.name.toLowerCase();
        return productName.includes(userFiltter);
    });
    isiMeAddProduct.innerHTML = "";
    clearSearchBtn.addEventListener("click", () => {
        searchFiltter.value = "";
        searchFiltter.dispatchEvent(new Event("input"));
    })



    filterInput.forEach((item, index) => {
        isiMeAddProduct.innerHTML += `<div class="product-card">
                <div class="product-category">${item.category}</div>
                <img class="product-image" src="${item.image}" alt="Product">
                <h3 class="product-name">${item.name}</h3>
                <div class="product-price">₹${item.price}</div>
                <button class="buy-btn">View Details</button>
            </div>`;
        // history object

        // सर्च इनपुट के लिए 'keydown' इवेंट (सिर्फ Enter दबाने पर सेव होगा)

    });

    searchFiltter.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            let userFiltter = searchFiltter.value.trim().toLowerCase();

            let exists = searchHistory.some(obj => obj.keyword === userFiltter);

            if (userFiltter !== "" && !exists) {
                let historyObj = {
                    keyword: userFiltter,
                    time: new Date().toLocaleTimeString()
                };
                searchHistory.push(historyObj);
                localStorage.setItem("myHistory", JSON.stringify(searchHistory));
            }
        }
    });
});

// search filter history creating 
searchFiltter.addEventListener("focus", () => {
    historyBox.style.display = "block";
    historyBox.innerHTML = "";
    searchHistory.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("history-item");
        div.innerHTML = `<span>${item.keyword}</span>`;
        historyBox.appendChild(div);


        div.addEventListener("click", () => {
            searchFiltter.value = item.keyword;
            searchFiltter.dispatchEvent(new Event("input"));
            historyBox.style.display = "none";
        });
    });
});
clickBody.addEventListener("click", (e) => {
    if (e.target !== searchFiltter) {
        historyBox.style.display = "none";
    }
});
// press enter gayab ho jaye history box
searchFiltter.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        historyBox.style.display = "none";
    }
});




