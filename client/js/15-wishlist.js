const els={
  app:document.getElementById("wishApp"),
  themeBtn:document.getElementById("wsTheme"),
  grid:document.getElementById("wishGrid"),
  empty:document.getElementById("wsEmpty"),
  modal:document.getElementById("wsModal"),
  close:document.getElementById("wsClose"),
  img:document.getElementById("wsImg"),
  title:document.getElementById("wsTitle"),
  price:document.getElementById("wsPrice"),
  remove:document.getElementById("wsRemove")
}

let theme=localStorage.getItem("astra_theme")||"light"
els.app.className=`theme-${theme}`
els.themeBtn.addEventListener("click",()=>{theme=theme==="light"?"dark":"light";els.app.className=`theme-${theme}`;localStorage.setItem("astra_theme",theme)})

let wishlist=JSON.parse(localStorage.getItem("astra_wishlist")||"[]")

function render(){
  els.grid.innerHTML=""
  if(!wishlist.length){els.empty.style.display="block";return}
  els.empty.style.display="none"
  wishlist.forEach((p,i)=>{
    const card=document.createElement("div")
    card.className="ws-card"
    card.innerHTML=`<img src="${p.img}"/><h3>${p.title}</h3><p>$${p.price}</p>`
    card.addEventListener("click",()=>openModal(i))
    els.grid.appendChild(card)
    setTimeout(()=>card.classList.add("show"),30)
  })
}

function openModal(idx){
  const p=wishlist[idx]
  els.modal.style.display="flex"
  els.img.src=p.img
  els.title.textContent=p.title
  els.price.textContent="$"+p.price
  els.remove.onclick=()=>{wishlist.splice(idx,1);localStorage.setItem("astra_wishlist",JSON.stringify(wishlist));els.modal.style.display="none";render()}
}

els.close.addEventListener("click",()=>els.modal.style.display="none")
window.addEventListener("load",render)
