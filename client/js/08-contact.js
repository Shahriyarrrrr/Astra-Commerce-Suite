const els={
  app:document.getElementById("contactApp"),
  themeBtn:document.getElementById("ctTheme"),
  form:document.getElementById("ctForm"),
  name:document.getElementById("ctName"),
  email:document.getElementById("ctEmail"),
  subject:document.getElementById("ctSubject"),
  message:document.getElementById("ctMessage"),
  send:document.getElementById("ctSend"),
  overlay:document.getElementById("ctOverlay"),
  cards:document.getElementById("ctCards"),
  map:document.getElementById("ctMap")
}
let theme=localStorage.getItem("astra_theme")||"light"
els.app.className=`theme-${theme}`
els.themeBtn.addEventListener("click",()=>{theme=theme==="light"?"dark":"light";els.app.className=`theme-${theme}`;localStorage.setItem("astra_theme",theme)})
fetch("/components/contact-card.html").then(r=>r.text()).then(html=>{
  const data=[
    {icon:"📞",title:"Phone",text:"+1 555 245 778"},
    {icon:"✉️",title:"Email",text:"support@astra.com"},
    {icon:"📍",title:"Address",text:"Silicon Valley, CA"}
  ]
  data.forEach(d=>{
    const wrap=document.createElement("div")
    wrap.innerHTML=html
    const card=wrap.querySelector(".contact-card")
    card.querySelector(".contact-card-icon").textContent=d.icon
    const t=card.querySelector(".contact-card-text")
    t.querySelector(".c-title").textContent=d.title
    t.querySelector(".c-info").textContent=d.text
    els.cards.appendChild(card)
  })
  const items=document.querySelectorAll(".contact-card")
  const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add("show")})},{threshold:.2})
  items.forEach(i=>obs.observe(i))
})
els.send.addEventListener("click",e=>{
  e.preventDefault()
  if(!els.name.value.trim()||!els.email.value.trim()||!els.subject.value.trim()||!els.message.value.trim()) return pulseForm()
  els.overlay.classList.add("show")
  setTimeout(()=>{els.overlay.classList.remove("show");clearForm()},1800)
})
function pulseForm(){
  els.form.style.transform="scale(1.03)"
  setTimeout(()=>els.form.style.transform="scale(1)",180)
}
function clearForm(){
  els.name.value=""
  els.email.value=""
  els.subject.value=""
  els.message.value=""
}
