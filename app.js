// ZAKOM ETIKA ELECTRONICS starter storefront.
// Edit WHATSAPP_NUMBER and product prices below before publishing.
const WHATSAPP_NUMBER = "254741223613"; // Replace with your WhatsApp number, country code included, no + sign.
const CURRENCY = "KSh";
const products = [
 {id:1,name:"USB-C Fast Charger",category:"Charging",price:650,icon:"🔌",desc:"Everyday charging adapter. Confirm wattage and compatibility."},
 {id:2,name:"USB Charging Cable",category:"Charging",price:250,icon:"🔗",desc:"Choose the connector type your customer needs."},
 {id:3,name:"Wired Earphones",category:"Audio",price:350,icon:"🎧",desc:"Compact audio accessory for daily use."},
 {id:4,name:"Bluetooth Speaker",category:"Audio",price:1200,icon:"🔊",desc:"Portable speaker. Confirm model and battery details."},
 {id:5,name:"Phone Cover",category:"Phone accessories",price:300,icon:"📱",desc:"Stock varies by phone model. Confirm fit before sale."},
 {id:6,name:"Screen Protector",category:"Phone accessories",price:200,icon:"🛡️",desc:"Ask for the exact phone model."},
 {id:7,name:"Power Bank",category:"Charging",price:1500,icon:"🔋",desc:"Check capacity, brand, and warranty before purchase."},
 {id:8,name:"Smart Watch",category:"Smart devices",price:1800,icon:"⌚",desc:"Features and compatibility vary by model."}
];
let cart = JSON.parse(localStorage.getItem("zeCart") || "[]");
let selectedCategory = "All";
const money = n => `${CURRENCY} ${Number(n).toLocaleString("en-KE")}`;
function renderProducts(){
 const query = document.getElementById("searchInput").value.trim().toLowerCase();
 const shown = products.filter(p => (selectedCategory==="All" || p.category===selectedCategory) && (p.name.toLowerCase().includes(query)||p.category.toLowerCase().includes(query)));
 document.getElementById("productGrid").innerHTML = shown.map(p=>`
 <article class="product-card"><div class="product-visual" aria-hidden="true">${p.icon}</div>
 <div class="product-info"><span class="category">${p.category}</span><h3>${p.name}</h3><p>${p.desc}</p>
 <div class="price-row"><span class="price">${money(p.price)}</span><button class="add-button" onclick="addToCart(${p.id})">+ Add</button></div></div></article>`).join("") || '<p>No products match your search.</p>';
}
function saveCart(){localStorage.setItem("zeCart",JSON.stringify(cart));renderCart();}
function addToCart(id){const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});saveCart();openCart();}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0), total=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);
 document.getElementById("cartCount").textContent=count;document.getElementById("cartTotal").textContent=money(total);
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-item"><div><strong>${p.name}</strong><small>${money(p.price)} each · ${money(p.price*x.qty)}</small></div><div class="qty-controls"><button aria-label="Decrease quantity" onclick="changeQty(${p.id},-1)">−</button><span>${x.qty}</span><button aria-label="Increase quantity" onclick="changeQty(${p.id},1)">+</button></div></div>`}).join(""):'<p class="empty">Your cart is empty. Add a product to get started.</p>';
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("drawerBackdrop").classList.add("show");document.getElementById("cartDrawer").setAttribute("aria-hidden","false");}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("drawerBackdrop").classList.remove("show");document.getElementById("cartDrawer").setAttribute("aria-hidden","true");}
function whatsappLink(message){return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;}
document.getElementById("checkoutButton").addEventListener("click",()=>{
 if(!cart.length){alert("Your cart is empty. Add a product first.");return;}
 const name=document.getElementById("customerName").value.trim()||"Not provided";
 const location=document.getElementById("customerLocation").value.trim()||"To be confirmed";
 const note=document.getElementById("customerNote").value.trim()||"None";
 const lines=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `• ${p.name} x${x.qty} — ${money(p.price*x.qty)}`;}).join("\n");
 const total=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);
 const message=`Hello ZAKOM ETIKA ELECTRONICS, I would like to place an order:\n\n${lines}\n\nEstimated total: ${money(total)}\nName: ${name}\nDelivery/collection: ${location}\nExtra details: ${note}\n\nPlease confirm availability, final price, delivery fee, and official payment instructions.`;
 window.location.href = whatsappLink(message);
});
document.getElementById("contactWhatsApp").addEventListener("click", e => {
    e.preventDefault();
    window.location.href = whatsappLink(
        "Hello ZAKOM ETIKA ELECTRONICS. I would like to ask about your products."
    );
});
document.getElementById("openCart").addEventListener("click",openCart);document.getElementById("closeCart").addEventListener("click",closeCart);document.getElementById("drawerBackdrop").addEventListener("click",closeCart);
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");selectedCategory=btn.dataset.category;renderProducts();}));
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
