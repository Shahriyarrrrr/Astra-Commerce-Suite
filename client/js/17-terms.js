const els={
  app:document.getElementById("termsApp"),
  themeBtn:document.getElementById("tcTheme"),
  toc:document.getElementById("tocList"),
  sections:Array.from(document.querySelectorAll(".tc-section"))
}

let theme=localStorage.getItem("astra_theme")||"light"
els.app.className=`theme-${theme}`
els.themeBtn.addEventListener("click",()=>{
  theme=theme==="light"?"dark":"light"
  els.app.className=`theme-${theme}`
  localStorage.setItem("astra_theme",theme)
})

function buildToc(){
  els.sections.forEach((sec,i)=>{
    const t=document.createElement("li")
    t.textContent=sec.dataset.title
    t.onclick=()=>sec.scrollIntoView({behavior:"smooth"})
    els.toc.appendChild(t)
  })
}

function revealOnScroll(){
  const obs=new IntersectionObserver(e=>{
    e.forEach(x=>{
      if(x.isIntersecting){
        x.target.classList.add("show")
        const idx=els.sections.indexOf(x.target)
        const all=els.toc.querySelectorAll("li")
        all.forEach(a=>a.classList.remove("active"))
        all[idx].classList.add("active")
      }
    })
  },{threshold:.2})
  els.sections.forEach(s=>obs.observe(s))
}

buildToc()
revealOnScroll()
