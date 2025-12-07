const endpoints = {
  get: "/api/cart",
  sync: "/api/cart/sync",
  applyPromo: "/api/cart/promo"
}
const els = {
  cartList: document.getElementById("cartList"),
  emptyState: document.getElementById("emptyState"),
  summaryItems: document.getElementById("summaryItems"),
  summarySubtotal: document.getElementById("summarySubtotal"),
  summaryDiscount: document.getElementById("summaryDiscount"),
  summaryTotal: document.getElementById("summaryTotal"),
  promoInput: document.getElementById("promoInput"),
  applyPromo: document.getElementById("applyPromo"),
  promoMessage: document.getElementById("promoMessage"),
  checkoutBtn: document.getElementById("checkoutBtn"),
  saveCart: document.getElementById("saveCart"),
  cartToast: document.getElementById("cartToast"),
  themeBtn: document.getElementById("cartTheme"),
  app: document.getElementById("cartApp")
}
let theme = localStorage.getItem("astra_theme") || "light"
els.app.className = `theme-${theme}`
els.themeBtn.addEventListener("click", ()=>{ theme = theme === "light" ? "dark" : "light"; els.app.className = `theme-${theme}`; localStorage.setItem("astra_theme", theme) })
let cart = JSON.parse(localStorage.getItem("astra_cart") || "[]")
let promo = null
function persist(){ localStorage.setItem("astra_cart", JSON.stringify(cart)); renderCart(); syncCart() }
function renderCart(){
  els.cartList.innerHTML = ""
  if(!cart.length){ els.emptyState.style.display = "block"; els.summaryItems.textContent = "0"; els.summarySubtotal.textContent = "$0.00"; els.summaryDiscount.textContent = "-$0.00"; els.summaryTotal.textContent = "$0.00"; return }
  els.emptyState.style.display = "none"
  cart.forEach(item => {
    const card = document.createElement("div")
    card.className = "cart-item enter"
    const tpl = `<img class="c-item-img" src="${escape(item.image||'/assets/images/product-placeholder.png')}" />
      <div>
        <div class="c-item-title">${escape(item.title)}</div>
        <div class="c-item-meta">${escape(item.variant||'')}</div>
        <div class="c-item-meta">${item.currency} ${Number(item.price).toFixed(2)}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
        <div class="qty-controls">
          <button class="qty-btn dec" data-id="${item.id}">-</button>
          <input class="qty-field" data-id="${item.id}" value="${item.qty}" style="width:46px;text-align:center;border-radius:8px;padding:6px;background:transparent;color:inherit;border:1px solid rgba(255,255,255,0.04)"/>
          <button class="qty-btn inc" data-id="${item.id}">+</button>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="remove-btn" data-id="${item.id}">Remove</button>
          <div class="line-price">${item.currency} ${ (item.price*item.qty).toFixed(2) }</div>
        </div>
      </div>`
    card.innerHTML = tpl
    els.cartList.appendChild(card)
  })
  attachCartEvents()
  updateSummary()
}
function attachCartEvents(){
  document.querySelectorAll(".dec").forEach(btn => btn.addEventListener("click", ()=>{ changeQty(btn.dataset.id, -1) }))
  document.querySelectorAll(".inc").forEach(btn => btn.addEventListener("click", ()=>{ changeQty(btn.dataset.id, 1) }))
  document.querySelectorAll(".qty-field").forEach(inp => inp.addEventListener("change", ()=>{ setQty(inp.dataset.id, Number(inp.value)) }))
  document.querySelectorAll(".remove-btn").forEach(btn => btn.addEventListener("click", ()=>{ removeItem(btn.dataset.id) }))
}
function changeQty(id, delta){
  const it = cart.find(x=>x.id===id)
  if(!it) return
  it.qty = Math.max(1, it.qty + delta)
  persist()
}
function setQty(id, n){
  const it = cart.find(x=>x.id===id)
  if(!it) return
  it.qty = Math.max(1, Number(n) || 1)
  persist()
}
function removeItem(id){
  cart = cart.filter(x=>x.id!==id)
  persist()
}
function updateSummary(){
  const items = cart.reduce((s,i)=>s+i.qty,0)
  const subtotal = cart.reduce((s,i)=>s + i.qty * Number(i.price),0)
  const discount = promo ? (promo.type === "percent" ? subtotal * (promo.value/100) : Math.min(promo.value, subtotal)) : 0
  const total = Math.max(0, subtotal - discount)
  els.summaryItems.textContent = items
  els.summarySubtotal.textContent = `$${subtotal.toFixed(2)}`
  els.summaryDiscount.textContent = `-$${discount.toFixed(2)}`
  els.summaryTotal.textContent = `$${total.toFixed(2)}`
}
els.applyPromo.addEventListener("click", async ()=>{
  const code = els.promoInput.value.trim()
  if(!code) return
  const res = await fetch(endpoints.applyPromo, { method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({code, cart}) })
  const j = await res.json()
  if(j.ok){ promo = j.promo; els.promoMessage.textContent = `Applied ${j.promo.code}` } else { promo = null; els.promoMessage.textContent = j.message || "Invalid" }
  updateSummary()
})
els.checkoutBtn.addEventListener("click", ()=>{
  localStorage.setItem("astra_checkout", JSON.stringify({ cart, promo }))
  location.href = "/pages/05-checkout.html"
})
els.saveCart.addEventListener("click", async ()=>{
  await syncCart(true)
  showToast("Cart saved")
})
function showToast(txt){
  els.cartToast.textContent = txt
  els.cartToast.classList.add("show")
  setTimeout(()=>els.cartToast.classList.remove("show"),2000)
}
async function syncCart(force){
  try{
    await fetch(endpoints.sync, { method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({ cart, force: !!force }) })
  }catch(e){}
}
function escape(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])) }
function seedCartFromProducts(){
  const store = JSON.parse(localStorage.getItem("astra_products") || "[]")
  if(!cart.length && store.length){
    const pick = store.slice(0,2).map(p=>({ id:p.id, title:p.title, price:p.price, currency:p.currency, qty:1, image:p.images && p.images[0] }))
    cart = pick
    persist()
  }
}
window.addEventListener("load", ()=>{
  seedCartFromProducts()
  renderCart()
})
