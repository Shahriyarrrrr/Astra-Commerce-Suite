const el = {
  themeBtn: document.getElementById("productTheme"),
  app: document.getElementById("productApp"),
  mainImg: document.getElementById("pMainImg"),
  thumbs: document.getElementById("pThumbs"),
  title: document.getElementById("pTitle"),
  price: document.getElementById("pPrice"),
  rating: document.getElementById("pRating"),
  desc: document.getElementById("pDesc"),
  variants: document.getElementById("pVariants"),
  qtyMinus: document.getElementById("qtyMinus"),
  qtyPlus: document.getElementById("qtyPlus"),
  qtyInput: document.getElementById("qtyInput"),
  addToCart: document.getElementById("addToCart"),
  highlights: document.getElementById("pHighlights"),
  reviews: document.getElementById("reviewList")
}
let theme = localStorage.getItem("astra_theme") || "light"
el.app.className = `theme-${theme}`
el.themeBtn.addEventListener("click",()=>{theme=theme==="light"?"dark":"light";el.app.className=`theme-${theme}`;localStorage.setItem("astra_theme",theme)})

const urlParams = new URLSearchParams(location.search)
const pid = urlParams.get("pid") || ""

async function loadProduct(){
  const r = await fetch(`/api/products?pid=${encodeURIComponent(pid)}`)
  const j = await r.json()
  if(!j.ok) return
  const p = j.product
  el.title.textContent = p.title
  el.price.textContent = `${p.currency} ${p.price.toFixed(2)}`
  el.rating.textContent = `${p.rating} ★`
  el.desc.textContent = p.description
  el.mainImg.src = p.images[0]

  el.thumbs.innerHTML = ""
  p.images.forEach((img,i)=>{
    const t = document.createElement("div")
    t.className = "p-thumb" + (i===0?" active":"")
    t.innerHTML = `<img src="${img}"/>`
    t.addEventListener("click",()=>{
      document.querySelectorAll(".p-thumb").forEach(x=>x.classList.remove("active"))
      t.classList.add("active")
      el.mainImg.src = img
    })
    el.thumbs.appendChild(t)
  })

  el.variants.innerHTML = ""
  p.variants.forEach(v=>{
    const btn = document.createElement("div")
    btn.className = "variant"
    btn.textContent = v
    btn.addEventListener("click",()=>{
      document.querySelectorAll(".variant").forEach(x=>x.classList.remove("active"))
      btn.classList.add("active")
    })
    el.variants.appendChild(btn)
  })
  const first = el.variants.querySelector(".variant")
  if(first) first.classList.add("active")

  el.highlights.innerHTML = ""
  p.highlights.forEach(h=>{
    const li = document.createElement("li")
    li.textContent = h
    el.highlights.appendChild(li)
  })

  el.reviews.innerHTML = ""
  p.reviews.forEach(r=>{
    const div = document.createElement("div")
    div.className = "review-card"
    div.innerHTML = `<strong>${r.author}</strong> — ${r.rating} ★<br>${r.text}`
    el.reviews.appendChild(div)
  })
}

el.qtyMinus.addEventListener("click",()=>{
  let n = Number(el.qtyInput.value)
  if(n>1){ el.qtyInput.value = n-1 }
})
el.qtyPlus.addEventListener("click",()=>{
  el.qtyInput.value = Number(el.qtyInput.value)+1
})

el.addToCart.addEventListener("click",()=>{
  const cart = JSON.parse(localStorage.getItem("astra_cart")||"[]")
  const qty = Number(el.qtyInput.value)
  const existing = cart.find(x=>x.id===pid)
  if(existing) existing.qty += qty
  else cart.push({id:pid,qty})
  localStorage.setItem("astra_cart",JSON.stringify(cart))
  el.addToCart.textContent = "Added"
  setTimeout(()=>{el.addToCart.textContent = "Add to Cart"},1400)
})

loadProduct()
