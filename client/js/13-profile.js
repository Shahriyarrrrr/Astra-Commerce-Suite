const els={
  app:document.getElementById("profileApp"),
  themeBtn:document.getElementById("prTheme"),
  tabs:document.querySelectorAll(".tab-btn"),
  pages:document.querySelectorAll(".tab-page"),
  ovAvatar:document.getElementById("ovAvatar"),
  ovName:document.getElementById("ovName"),
  ovEmail:document.getElementById("ovEmail"),
  ovBio:document.getElementById("ovBio"),
  editAvatar:document.getElementById("editAvatar"),
  fileAvatar:document.getElementById("fileAvatar"),
  editName:document.getElementById("editName"),
  editEmail:document.getElementById("editEmail"),
  editBio:document.getElementById("editBio"),
  saveProfile:document.getElementById("saveProfile"),
  setTheme:document.getElementById("setTheme"),
  setNotify:document.getElementById("setNotify"),
  saveSettings:document.getElementById("saveSettings"),
  toast:document.getElementById("prToast")
}

let theme=localStorage.getItem("astra_theme")||"light"
els.app.className=`theme-${theme}`
els.themeBtn.addEventListener("click",()=>{theme=theme==="light"?"dark":"light";els.app.className=`theme-${theme}`;localStorage.setItem("astra_theme",theme)})

let user=JSON.parse(localStorage.getItem("astra_user")||"{}")
if(!user.id) location.href="/pages/09-login.html"

function loadOverview(){
  els.ovName.textContent=user.name
  els.ovEmail.textContent=user.email
  els.ovBio.textContent=user.bio||"No bio available."
  els.ovAvatar.src=user.avatar||"/assets/images/product-placeholder.png"
}
function loadEdit(){
  els.editName.value=user.name
  els.editEmail.value=user.email
  els.editBio.value=user.bio||""
  els.editAvatar.src=user.avatar||"/assets/images/product-placeholder.png"
}
loadOverview()
loadEdit()

els.tabs.forEach(b=>b.addEventListener("click",()=>{
  els.tabs.forEach(x=>x.classList.remove("active"))
  b.classList.add("active")
  const t=b.dataset.tab
  els.pages.forEach(p=>p.classList.toggle("active",p.id===`tab-${t}`))
}))

els.fileAvatar.addEventListener("change",e=>{
  const f=e.target.files[0]
  if(f){
    const r=new FileReader()
    r.onload=()=>{els.editAvatar.src=r.result}
    r.readAsDataURL(f)
  }
})

els.saveProfile.addEventListener("click",()=>{
  user.name=els.editName.value.trim()
  user.email=els.editEmail.value.trim()
  user.bio=els.editBio.value.trim()
  user.avatar=els.editAvatar.src
  localStorage.setItem("astra_user",JSON.stringify(user))
  loadOverview()
  showToast("Saved")
})

els.setTheme.checked=theme==="dark"
els.setNotify.checked=user.notify||false

els.saveSettings.addEventListener("click",()=>{
  user.notify=els.setNotify.checked
  localStorage.setItem("astra_user",JSON.stringify(user))
  showToast("Updated")
})

function showToast(t){
  els.toast.textContent=t
  els.toast.classList.add("show")
  setTimeout(()=>els.toast.classList.remove("show"),1600)
}
