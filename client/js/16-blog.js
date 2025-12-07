const els={
  app:document.getElementById("blogApp"),
  themeBtn:document.getElementById("blTheme"),
  filter:document.getElementById("blFilter"),
  grid:document.getElementById("blogGrid"),
  empty:document.getElementById("blogEmpty"),
  drawer:document.getElementById("blDrawer"),
  drawerContent:document.getElementById("blContent"),
  drawerClose:document.getElementById("blClose")
}

let theme=localStorage.getItem("astra_theme")||"light"
els.app.className=`theme-${theme}`
els.themeBtn.addEventListener("click",()=>{theme=theme==="light"?"dark":"light";els.app.className=`theme-${theme}`;localStorage.setItem("astra_theme",theme)})

async function loadPosts(){
  const r=await fetch("/api/blog/list")
  const j=await r.json()
  render(j.posts||[])
}

function render(posts){
  const cat=els.filter.value
  let list=posts.slice().reverse()
  if(cat) list=list.filter(p=>p.category===cat)
  els.grid.innerHTML=""
  if(!list.length){els.empty.style.display="block";return}
  els.empty.style.display="none"
  list.forEach(p=>{
    const d=document.createElement("div")
    d.className="bl-card"
    d.innerHTML=`<img src="${p.img}"/><h3>${p.title}</h3><p>${p.category}</p>`
    d.addEventListener("click",()=>openDrawer(p.id))
    els.grid.appendChild(d)
    setTimeout(()=>d.classList.add("show"),30)
  })
}

async function openDrawer(id){
  const r=await fetch(`/api/blog/view/${id}`)
  const j=await r.json()
  if(!j.ok)return
  const p=j.post
  els.drawer.style.display="block"
  els.drawerContent.innerHTML=`<h2>${p.title}</h2>
    <img src="${p.img}"/>
    <p>${p.body}</p>`
}

els.drawerClose.addEventListener("click",()=>els.drawer.style.display="none")
els.filter.addEventListener("change",loadPosts)
window.addEventListener("load",loadPosts)
