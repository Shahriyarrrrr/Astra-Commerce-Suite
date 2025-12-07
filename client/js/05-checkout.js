const els = {
  app: document.getElementById("checkoutApp"),
  themeBtn: document.getElementById("coTheme"),
  steps: document.querySelectorAll(".step"),
  panels: document.querySelectorAll(".step-panel"),
  toast: document.getElementById("coToast"),
  toStep2: document.getElementById("toStep2"),
  toStep3: document.getElementById("toStep3"),
  toStep4: document.getElementById("toStep4"),
  back1: document.getElementById("back1"),
  back2: document.getElementById("back2"),
  back3: document.getElementById("back3"),
  placeOrder: document.getElementById("placeOrder"),
  reviewCart: document.getElementById("reviewCart"),
  rvSubtotal: document.getElementById("rvSubtotal"),
  rvShipping: document.getElementById("rvShipping"),
  rvTotal: document.getElementById("rvTotal"),
  inputs:{
    name:document.getElementById("name"),
    email:document.getElementById("email"),
    phone:document.getElementById("phone"),
    line1:document.getElementById("line1"),
    line2:document.getElementById("line2"),
    city:document.getElementById("city"),
    zip:document.getElementById("zip"),
    country:document.getElementById("country")
  }
}
let theme = localStorage.getItem("astra_theme") || "light"
els.app.className=`theme-${theme}`
els.themeBtn.addEventListener("click",()=>{theme=theme==="light"?"dark":"light";els.app.className=`theme-${theme}`;localStorage.setItem("astra_theme",theme)})
let checkout = JSON.parse(localStorage.getItem("astra_checkout")||"{}")
let cart = checkout.cart||[]
let promo = checkout.promo||null
let address={}
let ship="standard"
let shipCost=5
let pay="card"
function switchStep(n){
  els.steps.forEach(s=>s.classList.remove("active"))
  els.panels.forEach(p=>p.classList.remove("active"))
  els.steps[n-1].classList.add("active")
  els.panels[n-1].classList.add("active")
}
els.toStep2.addEventListener("click",()=>{
  address={}
  for(const k in els.inputs){ if(!els.inputs[k].value.trim()) return showToast("Fill all fields"); address[k]=els.inputs[k].value.trim() }
  switchStep(2)
})
els.back1.addEventListener("click",()=>switchStep(1))
document.querySelectorAll('input[name="ship"]').forEach(r=>r.addEventListener("change",()=>{
  ship=r.value
  shipCost = ship==="standard"?5:12
}))
els.toStep3.addEventListener("click",()=>switchStep(3))
els.back2.addEventListener("click",()=>switchStep(2))
document.querySelectorAll('input[name="pay"]').forEach(r=>r.addEventListener("change",()=>{pay=r.value}))
els.toStep4.addEventListener("click",()=>{
  renderReview()
  switchStep(4)
})
els.back3.addEventListener("click",()=>switchStep(3))
function renderReview(){
  els.reviewCart.innerHTML=""
  let subtotal=0
  cart.forEach(i=>{
    subtotal+=i.qty*i.price
    const div=document.createElement("div")
    div.className="review-item"
    div.innerHTML=`<span>${i.title} × ${i.qty}</span><span>${i.currency} ${(i.qty*i.price).toFixed(2)}</span>`
    els.reviewCart.appendChild(div)
  })
  let discount=promo?(promo.type==="percent"?subtotal*(promo.value/100):Math.min(promo.value,subtotal)):0
  let total=subtotal - discount + shipCost
  els.rvSubtotal.textContent=`$${subtotal.toFixed(2)}`
  els.rvShipping.textContent=`$${shipCost.toFixed(2)}`
  els.rvTotal.textContent=`$${total.toFixed(2)}`
}
els.placeOrder.addEventListener("click",async ()=>{
  showToast("Processing Order...")
  const payload={
    address,ship,shipCost,pay,cart,promo
  }
  const r=await fetch("/api/orders/create",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)})
  const j=await r.json()
  if(j.ok){
    localStorage.removeItem("astra_cart")
    localStorage.setItem("astra_order",JSON.stringify(j.order))
    location.href="/pages/06-order-confirmation.html"
  } else {
    showToast("Failed")
  }
})
function showToast(t){
  els.toast.textContent=t
  els.toast.classList.add("show")
  setTimeout(()=>els.toast.classList.remove("show"),2000)
}
