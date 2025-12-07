const els={
  app:document.getElementById("loginApp"),
  themeBtn:document.getElementById("lgTheme"),
  roleBtns:document.querySelectorAll(".role-btn"),
  email:document.getElementById("lgEmail"),
  pass:document.getElementById("lgPassword"),
  pwToggle:document.getElementById("pwToggle"),
  pwMeter:document.getElementById("pwMeter"),
  pwFill:document.querySelector(".pw-fill"),
  submit:document.getElementById("lgSubmit"),
  error:document.getElementById("lgError")
}
let theme=localStorage.getItem("astra_theme")||"light"
els.app.className=`theme-${theme}`
els.themeBtn.addEventListener("click",()=>{theme=theme==="light"?"dark":"light";els.app.className=`theme-${theme}`;localStorage.setItem("astra_theme",theme)})
let role="user"
els.roleBtns.forEach(b=>b.addEventListener("click",()=>{
  els.roleBtns.forEach(x=>x.classList.remove("active"))
  b.classList.add("active")
  role=b.dataset.role
}))
els.pwToggle.addEventListener("click",()=>{
  els.pass.type=els.pass.type==="password"?"text":"password"
  els.pwToggle.style.transform="scale(1.2)"
  setTimeout(()=>els.pwToggle.style.transform="scale(1)",150)
})
els.pass.addEventListener("input",()=>{
  const v=els.pass.value
  const s=strength(v)
  els.pwMeter.style.opacity="1"
  els.pwFill.style.width=s+"%"
  if(s<40)els.pwFill.style.background="#ef4444"
  else if(s<70)els.pwFill.style.background="#eab308"
  else els.pwFill.style.background="#22c55e"
})
function strength(t){
  let sc=0
  if(t.length>5)sc+=20
  if(t.length>8)sc+=20
  if(/[A-Z]/.test(t))sc+=20
  if(/[0-9]/.test(t))sc+=20
  if(/[^A-Za-z0-9]/.test(t))sc+=20
  return sc
}
els.submit.addEventListener("click",async e=>{
  e.preventDefault()
  els.error.textContent=""
  if(!els.email.value.trim()||!els.pass.value.trim()){shake();return}
  const r=await fetch("/api/auth/login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({role,email:els.email.value,password:els.pass.value})})
  const j=await r.json()
  if(!j.ok){els.error.textContent=j.message||"Invalid login";shake();return}
  localStorage.setItem("astra_user",JSON.stringify(j.user))
  location.href="/pages/01-home.html"
})
function shake(){
  els.error.textContent="Invalid credentials"
  els.submit.style.transform="translateX(-6px)"
  setTimeout(()=>els.submit.style.transform="translateX(6px)",100)
  setTimeout(()=>els.submit.style.transform="translateX(0)",200)
}
