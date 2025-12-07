const els={
  app:document.getElementById("adminApp"),
  themeBtn:document.getElementById("adminTheme"),
  sidebarItems:document.querySelectorAll(".sb-item"),
  pages:document.querySelectorAll(".page"),
  ordersVal:document.getElementById("mOrders"),
  revenueVal:document.getElementById("mRevenue"),
  usersVal:document.getElementById("mUsers"),
  productTable:document.getElementById("productTable"),
  addProductBtn:document.getElementById("addProductBtn"),
  modal:document.getElementById("productModal"),
  modalTitle:document.getElementById("modalTitle"),
  pTitle:document.getElementById("pTitle"),
  pPrice:document.getElementById("pPrice"),
  pStock:document.getElementById("pStock"),
  pSave:document.getElementById("pSave"),
  pCancel:document.getElementById("pCancel"),
  ordersList:document.getElementById("ordersList"),
  activityFeed:document.getElementById("activityFeed"),
  toast:document.getElementById("adminToast")
}
let theme=localStorage.getItem("astra_theme")||"light"
els.app.className=`theme-${theme}`
els.themeBtn.addEventListener("click",()=>{theme=theme==="light"?"dark":"light";els.app.className=`theme-${theme}`;localStorage.setItem("astra_theme",theme)})

els.sidebarItems.forEach(b=>b.addEventListener("click",()=>{
  els.sidebarItems.forEach(x=>x.classList.remove("active"))
  b.classList.add("active")
  const pg=b.dataset.page
  els.pages.forEach(p=>p.classList.toggle("active",p.id===`page-${pg}`))
}))

async function loadMetrics(){
  const r=await fetch("/api/admin/metrics")
  const j=await r.json()
  els.ordersVal.textContent=j.orders
  els.revenueVal.textContent="$"+j.revenue
  els.usersVal.textContent=j.users
}

async function loadProducts(){
  const r=await fetch("/api/admin/products")
  const j=await r.json()
  els.productTable.innerHTML=""
  j.products.forEach(p=>{
    const tr=document.createElement("tr")
    tr.innerHTML=`
      <td>${p.title}</td>
      <td>$${p.price}</td>
      <td>${p.stock}</td>
      <td class="actions">
        <button data-id="${p.id}" class="edit-btn">Edit</button>
        <button data-id="${p.id}" class="del-btn">Delete</button>
      </td>`
    els.productTable.appendChild(tr)
  })
  document.querySelectorAll(".edit-btn").forEach(b=>b.addEventListener("click",()=>openModal("edit",b.dataset.id)))
  document.querySelectorAll(".del-btn").forEach(b=>b.addEventListener("click",()=>delProduct(b.dataset.id)))
}

async function loadOrders(){
  const r=await fetch("/api/admin/orders")
  const j=await r.json()
  els.ordersList.innerHTML=""
  j.orders.forEach(o=>{
    const d=document.createElement("div")
    d.className="order-box"
    d.innerHTML=`<b>${o.id}</b> — $${o.total} — ${new Date(o.createdAt).toLocaleString()}`
    els.ordersList.appendChild(d)
  })
}

async function loadActivity(){
  const r=await fetch("/api/admin/activity")
  const j=await r.json()
  els.activityFeed.innerHTML=""
  j.activity.forEach(a=>{
    const d=document.createElement("div")
    d.className="activity-item"
    d.textContent=a
    els.activityFeed.appendChild(d)
  })
  const items=document.querySelectorAll(".activity-item")
  const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add("show")})},{threshold:.2})
  items.forEach(i=>obs.observe(i))
}

let editId=null
function openModal(mode,id){
  els.modal.classList.add("show")
  if(mode==="edit"){
    editId=id
    fetch(`/api/admin/product/${id}`).then(r=>r.json()).then(j=>{
      els.modalTitle.textContent="Edit Product"
      els.pTitle.value=j.product.title
      els.pPrice.value=j.product.price
      els.pStock.value=j.product.stock
    })
  } else {
    editId=null
    els.modalTitle.textContent="New Product"
    els.pTitle.value=""
    els.pPrice.value=""
    els.pStock.value=""
  }
}
els.addProductBtn.addEventListener("click",()=>openModal("new"))
els.pCancel.addEventListener("click",()=>els.modal.classList.remove("show"))
els.pSave.addEventListener("click",async ()=>{
  const payload={title:els.pTitle.value,price:Number(els.pPrice.value),stock:Number(els.pStock.value)}
  if(editId){
    await fetch(`/api/admin/product/${editId}`,{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify(payload)})
  } else {
    await fetch(`/api/admin/product`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)})
  }
  els.modal.classList.remove("show")
  showToast("Saved")
  loadProducts()
})

async function delProduct(id){
  await fetch(`/api/admin/product/${id}`,{method:"DELETE"})
  loadProducts()
  showToast("Deleted")
}

function showToast(t){
  els.toast.textContent=t
  els.toast.classList.add("show")
  setTimeout(()=>els.toast.classList.remove("show"),1600)
}

loadMetrics()
loadProducts()
loadOrders()
loadActivity()
