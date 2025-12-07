const api = { products: "/api/products" }
const dom = {
  themeToggle: document.getElementById("themeToggle"),
  app: document.getElementById("app"),
  searchInput: document.getElementById("searchInput"),
  productGrid: document.getElementById("productGrid"),
  loadMore: document.getElementById("loadMore"),
  loginModal: document.getElementById("loginModal"),
  openLogin: document.getElementById("openLogin"),
  closeLogin: document.getElementById("closeLogin"),
  loginForm: document.getElementById("loginForm"),
  cartWidget: document.getElementById("cartWidget"),
  playAudio: document.getElementById("playAudio"),
  bgAudio: document.getElementById("bgAudio"),
  sortSelect: document.getElementById("sortSelect"),
  searchField: document.getElementById("searchInput")
}
let products = []
let page = 1
let pageSize = 6
let theme = localStorage.getItem("astra_theme") || "light"
dom.app.className = `theme-${theme}`
function setTheme(t){
  theme = t
  dom.app.className = `theme-${t}`
  localStorage.setItem("astra_theme", t)
}
dom.themeToggle.addEventListener("click", () => {
  setTheme(theme === "light" ? "dark" : "light")
})
dom.openLogin.addEventListener("click", () => {
  dom.loginModal.classList.add("show")
})
dom.closeLogin.addEventListener("click", () => {
  dom.loginModal.classList.remove("show")
})
dom.loginForm.addEventListener("submit", async e => {
  e.preventDefault()
  const data = new FormData(dom.loginForm)
  const payload = { email: data.get("email"), password: data.get("password"), role: data.get("role") }
  const res = await fetch("/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) })
  const j = await res.json()
  if (j.ok) {
    dom.loginModal.classList.remove("show")
    dom.openLogin.textContent = `Hi, ${j.user.name}`
    localStorage.setItem("astra_token", j.token)
  } else {
    alert("Login failed")
  }
})
async function fetchProducts(q = ""){
  const u = `${api.products}?q=${encodeURIComponent(q)}`
  const r = await fetch(u)
  const j = await r.json()
  products = j.products || []
  renderProducts()
}
function renderProducts(){
  dom.productGrid.innerHTML = ""
  const sorted = sortProducts(products.slice())
  const slice = sorted.slice(0, page * pageSize)
  slice.forEach(p => {
    const el = document.createElement("div")
    el.className = "product-card"
    el.innerHTML = `<img loading="lazy" src="${p.images[0] || '/assets/images/product-placeholder.png'}" alt="${escapeHtml(p.title)}" />
      <div class="product-meta">
        <div>
          <div class="title">${escapeHtml(p.title)}</div>
          <div class="muted">${p.rating} ★</div>
        </div>
        <div class="price">${p.currency} ${p.price.toFixed(2)}</div>
      </div>
      <div style="display:flex;gap:8px;justify-content:space-between;align-items:center">
        <button class="btn small add-to-cart" data-id="${p.id}">Add</button>
        <button class="btn ghost small" data-id="${p.id}">Details</button>
      </div>`
    dom.productGrid.appendChild(el)
  })
  attachCardEvents()
  animateFeatures()
}
function attachCardEvents(){
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = btn.getAttribute("data-id")
      addToCart(id)
    })
  })
}
function addToCart(id){
  const cart = JSON.parse(localStorage.getItem("astra_cart") || "[]")
  const existing = cart.find(i => i.id === id)
  if (existing) existing.qty += 1
  else cart.push({ id, qty: 1 })
  localStorage.setItem("astra_cart", JSON.stringify(cart))
  updateCartWidget()
}
function updateCartWidget(){
  const cart = JSON.parse(localStorage.getItem("astra_cart") || "[]")
  dom.cartWidget.textContent = cart.reduce((s,i) => s + i.qty, 0) || "0"
}
function animateFeatures(){
  document.querySelectorAll(".feature").forEach((f,i) => {
    const d = f.dataset.delay || i * 80
    setTimeout(() => { f.style.opacity = "1"; f.style.transform = "translateY(0)" }, d)
  })
}
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])) }
dom.loadMore.addEventListener("click", () => {
  page += 1
  renderProducts()
})
dom.searchField.addEventListener("input", debounce(e => {
  page = 1
  fetchProducts(e.target.value)
}, 300))
dom.sortSelect.addEventListener("change", () => renderProducts())
dom.playAudio.addEventListener("click", () => {
  if (dom.bgAudio.paused) { dom.bgAudio.play(); dom.playAudio.textContent = "Pause Ambience" }
  else { dom.bgAudio.pause(); dom.playAudio.textContent = "Play Ambience" }
})
function sortProducts(arr){
  const s = dom.sortSelect.value
  if (s === "price-asc") return arr.sort((a,b) => a.price - b.price)
  if (s === "price-desc") return arr.sort((a,b) => b.price - a.price)
  return arr
}
function debounce(fn, t){ let timer; return function(...args){ clearTimeout(timer); timer = setTimeout(()=>fn.apply(this,args), t) }}
window.addEventListener("load", () => {
  fetchProducts()
  updateCartWidget()
  document.querySelectorAll(".product-card").forEach(el => {}) 
  applyPrefersReducedMotion()
})
function applyPrefersReducedMotion(){
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
  if (mq.matches) document.documentElement.style.setProperty("--transition","150ms linear")
}
