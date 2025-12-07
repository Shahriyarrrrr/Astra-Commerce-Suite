const els = {
  app: document.getElementById("ocApp"),
  themeBtn: document.getElementById("ocTheme"),
  orderId: document.getElementById("ocOrderId"),
  eta: document.getElementById("ocEta"),
  pay: document.getElementById("ocPay"),
  ship: document.getElementById("ocShip"),
  items: document.getElementById("ocItems"),
  sub: document.getElementById("ocSub"),
  shipCost: document.getElementById("ocShipCost"),
  total: document.getElementById("ocTotal"),
  invoice: document.getElementById("ocInvoice"),
  toast: document.getElementById("ocToast")
}
let theme = localStorage.getItem("astra_theme") || "light"
els.app.className = `theme-${theme}`
els.themeBtn.addEventListener("click",()=>{
  theme = theme==="light"?"dark":"light"
  els.app.className = `theme-${theme}`
  localStorage.setItem("astra_theme",theme)
})
let data = JSON.parse(localStorage.getItem("astra_order")||"{}")
if(!data.id){
  location.href="/pages/02-catalog.html"
}
els.orderId.textContent = data.id
els.pay.textContent = data.pay
els.ship.textContent = data.ship === "express" ? "Express (1–2 days)" : "Standard (3–5 days)"
const etaDays = data.ship === "express" ? 2 : 5
els.eta.textContent = `${etaDays} Days`
els.items.innerHTML = ""
let subtotal = 0
data.cart.forEach(i=>{
  subtotal += i.qty * i.price
  const div = document.createElement("div")
  div.className="oc-item"
  div.innerHTML = `<span>${i.title} × ${i.qty}</span><span>${i.currency} ${(i.qty*i.price).toFixed(2)}</span>`
  els.items.appendChild(div)
})
els.sub.textContent = `$${subtotal.toFixed(2)}`
els.shipCost.textContent = `$${(data.shipCost||0).toFixed(2)}`
els.total.textContent = `$${data.total.toFixed(2)}`
els.invoice.addEventListener("click",()=>{
  showToast("Downloading Invoice...")
  const a = document.createElement("a")
  const blob = new Blob([JSON.stringify(data)],{type:"application/json"})
  const url = URL.createObjectURL(blob)
  a.href = url
  a.download = `${data.id}-invoice.json`
  a.click()
  setTimeout(()=>URL.revokeObjectURL(url),1200)
})
function showToast(t){
  els.toast.textContent=t
  els.toast.classList.add("show")
  setTimeout(()=>els.toast.classList.remove("show"),2000)
}
