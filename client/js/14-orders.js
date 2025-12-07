const els={
  app:document.getElementById("ordersApp"),
  ordersList:document.getElementById("ordersList"),
  ordersEmpty:document.getElementById("ordersEmpty"),
  drawer:document.getElementById("orderDrawer"),
  drawerContent:document.getElementById("drawerContent"),
  closeDrawer:document.getElementById("closeDrawer"),
  filterStatus:document.getElementById("filterStatus"),
  filterDate:document.getElementById("filterDate"),
  themeBtn:document.getElementById("odTheme")
}
let theme=localStorage.getItem("astra_theme")||"light"
els.app.className=`theme-${theme}`
els.themeBtn.addEventListener("click",()=>{theme=theme==="light"?"dark":"light";els.app.className=`theme-${theme}`;localStorage.setItem("astra_theme",theme)})
els.closeDrawer.addEventListener("click",()=>{els.drawer.style.display="none";els.drawerContent.innerHTML=""})

async function loadOrders(){
  const r=await fetch("/api/orders/list")
  const j=await r.json()
  const list=j.orders||[]
  renderOrders(list)
}

function renderOrders(list){
  const statusFilter=els.filterStatus.value
  const dateFilter=els.filterDate.value
  let filtered=list.slice().reverse()
  if(statusFilter) filtered=filtered.filter(o=>String(o.status||"").toLowerCase()===statusFilter.toLowerCase())
  if(dateFilter) filtered=filtered.filter(o=>new Date(o.createdAt).toISOString().slice(0,10)===dateFilter)
  els.ordersList.innerHTML=""
  if(!filtered.length){els.ordersEmpty.style.display="block";return}
  els.ordersEmpty.style.display="none"
  filtered.forEach(o=>{
    const div=document.createElement("div")
    div.className="order-card"
    div.innerHTML=`<div class="order-meta">
      <div class="order-id">${o.id}</div>
      <div class="order-date">${new Date(o.createdAt).toLocaleString()}</div>
    </div>
    <div style="display:flex;align-items:center;gap:12px">
      <div class="order-amount">$${Number(o.total).toFixed(2)}</div>
      <div class="order-status status-${o.status||'pending'}">${o.status||'pending'}</div>
    </div>`
    div.addEventListener("click",()=>openDrawer(o.id))
    els.ordersList.appendChild(div)
    setTimeout(()=>div.classList.add("show"),60)
  })
}

async function openDrawer(id){
  const r=await fetch(`/api/orders/view/${encodeURIComponent(id)}`)
  const j=await r.json()
  if(!j.ok) return
  const o=j.order
  els.drawer.style.display="block"
  els.drawerContent.innerHTML=`<h2>Order ${o.id}</h2>
    <div class="drawer-meta">
      <div>Payment: ${o.pay}</div>
      <div>Shipping: ${o.ship} — $${(o.shipCost||0).toFixed(2)}</div>
    </div>
    <div class="drawer-items"></div>
    <div style="margin-top:12px" class="drawer-totals">
      <div>Subtotal: $${calcSubtotal(o.cart).toFixed(2)}</div>
      <div>Total: $${Number(o.total).toFixed(2)}</div>
    </div>`
  const itemsWrap=els.drawerContent.querySelector(".drawer-items")
  o.cart.forEach(i=>{
    const di=document.createElement("div")
    di.className="drawer-item"
    di.innerHTML=`<div>${i.title} × ${i.qty}</div><div>${i.currency} ${(i.qty*i.price).toFixed(2)}</div>`
    itemsWrap.appendChild(di)
  })
}

function calcSubtotal(cart){
  return (cart||[]).reduce((s,i)=>s + i.qty * i.price,0)
}

els.filterStatus.addEventListener("change",()=>loadOrders())
els.filterDate.addEventListener("change",()=>loadOrders())

window.addEventListener("load",()=>loadOrders())
