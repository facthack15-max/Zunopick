const products = [
  {id:1,name:"Everyday Oversized Tee",category:"Fashion",price:999,emoji:"👕"},
  {id:2,name:"Wireless Headphones",category:"Gadgets",price:1499,emoji:"🎧"},
  {id:3,name:"Minimal Desk Lamp",category:"Home",price:999,emoji:"💡"},
  {id:4,name:"Everyday Tote Bag",category:"Fashion",price:999,emoji:"👜"},
  {id:5,name:"Smart Watch",category:"Gadgets",price:1999,emoji:"⌚"},
  {id:6,name:"Aroma Candle Set",category:"Home",price:599,emoji:"🕯️"},
  {id:7,name:"Skincare Essentials",category:"Beauty",price:999,emoji:"🧴"},

{id:8,name:"Phones",category:"tech and gadgets ",price:14,999,emoji:"📱"},
  {id:9,name:"Sunglasses",category:"Fashion",price:649,emoji:"🕶️"}
];

let cart = JSON.parse(localStorage.getItem("zunopick-cart") || "[]");
let currentCategory = "All";

const productsEl = document.getElementById("products");
const searchEl = document.getElementById("search");

function renderProducts(){
  const q = searchEl.value.toLowerCase().trim();
  const list = products.filter(p =>
    (currentCategory === "All" || p.category === currentCategory) &&
    (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  );
  productsEl.innerHTML = list.length ? list.map(p => `
    <article class="product">
      <div class="product-img">${p.emoji}</div>
      <div class="product-info">
        <small>${p.category}</small>
        <h3>${p.name}</h3>
        <div class="price">₹${p.price.toLocaleString("en-IN")}</div>
        <div class="product-actions">
          <button onclick="addToCart(${p.id})">Add to cart</button>
          <button class="buy" onclick="buyNow(${p.id})">Buy Now</button>
        </div>
      </div>
    </article>`).join("") : "<p>No products found. Try another search.</p>";
}
function addToCart(id){
  const p = products.find(x => x.id === id);
  cart.push(p);
  saveCart();
  openCart();
}
function removeFromCart(i){cart.splice(i,1);saveCart();renderCart()}
function saveCart(){localStorage.setItem("zunopick-cart",JSON.stringify(cart));updateCount();renderCart()}
function updateCount(){document.getElementById("cartCount").textContent=cart.length}
function renderCart(){
  const el=document.getElementById("cartItems");
  el.innerHTML=cart.length ? cart.map((p,i)=>`<div class="cart-item"><div class="emoji">${p.emoji}</div><div><strong>${p.name}</strong><div>₹${p.price.toLocaleString("en-IN")}</div></div><button onclick="removeFromCart(${i})">Remove</button></div>`).join("") : "<p style='padding-top:25px;color:#777'>Your picks are empty.</p>";
  document.getElementById("cartTotal").textContent=cart.reduce((s,p)=>s+p.price,0).toLocaleString("en-IN");
}
function buyNow(id){
  const p=products.find(x=>x.id===id);
  alert(`Demo Buy Now: ${p.name}\n\nReplace this button's action with your Myntra/Flipkart/Shopify affiliate link.`);
}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("overlay").classList.remove("show")}

document.querySelectorAll(".category").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".category").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active"); currentCategory=btn.dataset.category; renderProducts();
  });
});
searchEl.addEventListener("input",renderProducts);
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
document.getElementById("checkoutBtn").onclick=()=>alert("Connect this button to your checkout/payment or affiliate flow.");
renderProducts(); updateCount(); renderCart();
