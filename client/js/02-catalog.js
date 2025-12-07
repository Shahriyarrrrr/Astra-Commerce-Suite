const apiUrl = "/api/products"
const state = { items: [], page: 1, pageSize: 8, loading: false, q: "", sort: "relevance", filters: {} }
const els = {
  grid: document.getElementById("catalogGrid"),
  search: document.getElementById("catalogSearch"),
  sort: document.getElementById("catalogSort"),
  themeBtn: document.getElementById("catalogTheme"),
  leftFilters: document.getElementById("leftFilters"),
  clearFilters: document.getElementById("clearFilters"),
  openFilters: document.getElementById("openFilters"),
  infiniteLoader: document.getElementById("infiniteLoader"),
  minPrice: document.getElementById("minPrice"),
  maxPrice: document.getElementById("maxPrice"),
  filterCategory: document.getElementById("filterCategory"),
  ratingRadios: Array.from(document.querySelectorAll('input[name="rating"]')),
  inStock: document.getElementById("inStock"),
  cardTemplateHolder: document.getElementById("productCardTemplateHolder"),
  productCardPartial: document.getElementById("productCardPartial")
}
const templateHtml = fetch("/components/product-card.html").then(r => r.text())
templateHtml.then(t => { els.cardTemplateHolder.innerHTML = t })
let theme = localStorage.getItem("astra_theme") || "light"
document.getElementById("catalogApp").className = `theme-${theme}`
function setTheme(t){ theme = t; document.getElementById("catalogApp").className = `theme-${t}`; localStorage.setItem("astra_theme", t) }
els.themeBtn.addEventListener("click", () => setTheme(theme === "light" ? "dark" : "light"))
document.getElementById("openFilters").addEventListener("click", () => {
  els.leftFilters.style.display = els.leftFilters.style.display === "none" ? "block" : "none"
})
els.clearFilters.addEventListener("click", () => {
  els.filterCategory.value = ""
  els.minPrice.value = ""
  els.maxPrice.value = ""
  els.inStock.checked = false
  ratingClear()
  applyFilters()
})
function ratingClear(){ ratingRadios.forEach(r => r.checked = false); document.querySelector('input[name="rating"][value="0"]').checked = true }
els.search.addEventListener("input", debounce(e => {
  state.q = e.target.value
  state.page = 1
  loadProducts(true)
}, 300))
els.sort.addEventListener("change", () => { state.sort = els.sort.value; renderGrid(true) })
els.filterCategory.addEventListener("change", applyFilters)
els.minPrice.addEventListener("change", applyFilters)
els.maxPrice.addEventListener("change", applyFilters)
els.inStock.addEventListener("change", applyFilters)
ratingRadios.forEach(r => r.addEventListener("change", applyFilters))
async function loadProducts(reset){
  if (state.loading) return
  state.loading = true
  els.infiniteLoader.style.display = "block"
  try {
    const res = await fetch(`${apiUrl}?q=${encodeURIComponent(state.q)}`)
    const j = await res.json()
    state.items = j.products || []
    if (reset) state.page = 1
    renderGrid(reset)
  } finally {
    state.loading = false
    els.infiniteLoader.style.display = "none"
  }
}
function renderGrid(reset){
  if (reset) els.grid.innerHTML = ""
  const processed = applySortAndFilter(state.items.slice())
  const start = 0
  const end = Math.min(processed.length, state.page * state.pageSize)
  const slice = processed.slice(start, end)
  slice.forEach(p => {
    const card = createCard(p)
    els.grid.appendChild(card)
    requestAnimationFrame(() => card.classList.add("entered"))
  })
  if (end < processed.length) {
    observeScrollToLoad()
  } else {
    stopObserveScroll()
  }
}
function applySortAndFilter(arr){
  const cat = els.filterCategory.value
  const min = Number(els.minPrice.value || 0)
  const max = Number(els.maxPrice.value || Infinity)
  const rating = Number(document.querySelector('input[name="rating"]:checked').value || 0)
  const instock = els.inStock.checked
  let out = arr.filter(p => {
    if (cat && !(p.categories || []).includes(cat)) return false
    if (p.price < min) return false
    if (p.price > max) return false
    if (p.rating < rating) return false
    if (instock && (!p.stock || p.stock <= 0)) return false
    if (state.q && !p.title.toLowerCase().includes(state.q.toLowerCase())) return false
    return true
  })
  if (state.sort === "price-asc") out.sort((a,b)=>a.price-b.price)
  if (state.sort === "price-desc") out.sort((a,b)=>b.price-a.price)
  if (state.sort === "rating") out.sort((a,b)=>b.rating-b.rating)
  return out
}
function applyFilters(){ state.page = 1; renderGrid(true) }
function createCard(p){
  const wrapper = document.createElement("div")
  wrapper.className = "product-card-wrap"
  const tmpl = els.cardTemplateHolder.querySelector(".product-card-template")
  const card = tmpl.cloneNode(true)
  card.querySelector(".pc-img").src = p.images && p.images[0] ? p.images[0] : "/assets/images/product-placeholder.png"
  card.querySelector(".pc-title").textContent = p.title
  card.querySelector(".pc-price").textContent = `${p.currency} ${p.price.toFixed(2)}`
  card.querySelector(".pc-rating").textContent = `${p.rating} ★`
  card.querySelector(".pc-add").addEventListener("click", () => {
    addToCart(p.id)
  })
  card.querySelector(".pc-quick").addEventListener("click", () => openQuick(p))
  wrapper.appendChild(card)
  return wrapper
}
function addToCart(id){
  const cart = JSON.parse(localStorage.getItem("astra_cart") || "[]")
  const exists = cart.find(x=>x.id===id)
  if (exists) exists.qty += 1
  else cart.push({ id, qty: 1 })
  localStorage.setItem("astra_cart", JSON.stringify(cart))
}
let observer = null
function observeScrollToLoad(){
  if (observer) return
  observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        state.page += 1
        renderGrid()
      }
    })
  }, { rootMargin: "200px" })
  observer.observe(els.infiniteLoader)
}
function stopObserveScroll(){
  if (!observer) return
  observer.disconnect()
  observer = null
}
function debounce(fn,t){ let timer; return function(...a){ clearTimeout(timer); timer = setTimeout(()=>fn.apply(this,a), t) }}
function openQuick(p){
  fetch("/components/modal-zoom.html").then(r=>r.text()).then(html=>{
    const div = document.createElement("div")
    div.innerHTML = html
    document.body.appendChild(div)
    const modal = document.querySelector("#quickModal") || document.querySelector(".quick-modal")
    const img = document.querySelector("#quickImg")
    const title = document.querySelector("#quickTitle")
    const price = document.querySelector("#quickPrice")
    const desc = document.querySelector("#quickDesc")
    const close = document.querySelector("#closeQuick")
    const add = document.querySelector("#quickAdd")
    const details = document.querySelector("#quickDetails")
    if (img) img.src = p.images && p.images[0] ? p.images[0] : "/assets/images/product-placeholder.png"
    if (title) title.textContent = p.title
    if (price) price.textContent = `${p.currency} ${p.price.toFixed(2)}`
    if (desc) desc.textContent = p.description || "High quality product with premium features."
    if (details) details.href = `/pages/03-product.html?pid=${encodeURIComponent(p.id)}`
    if (modal) modal.classList.add("show")
    close.addEventListener("click", () => { modal.classList.remove("show"); setTimeout(()=>modal.remove(),360) })
    add.addEventListener("click", () => { addToCart(p.id); modal.classList.remove("show"); setTimeout(()=>modal.remove(),360) })
  })
}
window.addEventListener("load", () => loadProducts(true))
