const els={
  app:document.getElementById("aboutApp"),
  themeBtn:document.getElementById("abTheme"),
  parallax:document.getElementById("abParallax"),
  visionBlocks:document.getElementById("visionBlocks"),
  timelineWrap:document.getElementById("timelineWrap"),
  teamGrid:document.getElementById("teamGrid")
}
let theme=localStorage.getItem("astra_theme")||"light"
els.app.className=`theme-${theme}`
els.themeBtn.addEventListener("click",()=>{theme=theme==="light"?"dark":"light";els.app.className=`theme-${theme}`;localStorage.setItem("astra_theme",theme)})
document.addEventListener("mousemove",e=>{
  const x=(e.clientX/window.innerWidth-.5)*20
  const y=(e.clientY/window.innerHeight-.5)*20
  els.parallax.style.transform=`scale(1.1) translate(${x}px,${y}px)`
})
fetch("/components/vision-block.html").then(r=>r.text()).then(t=>{
  els.visionBlocks.innerHTML=t+t
  const blocks=document.querySelectorAll(".vision-block")
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")})
  },{threshold:.2})
  blocks.forEach(b=>obs.observe(b))
})
const timelineData=[
  {year:"2019",text:"Astra is founded focusing on futuristic consumer tech."},
  {year:"2020",text:"Launch of our first AI-powered wearable products."},
  {year:"2022",text:"Introduced immersive holographic interfaces."},
  {year:"2024",text:"Global expansion with breakthrough sensory devices."}
]
timelineData.forEach((t,i)=>{
  const div=document.createElement("div")
  div.className="timeline-item"+(i%2===0?"":" right")
  div.innerHTML=`<h3>${t.year}</h3><p>${t.text}</p>`
  els.timelineWrap.appendChild(div)
})
const tlItems=document.querySelectorAll(".timeline-item")
const tlObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")})
},{threshold:.2})
tlItems.forEach(i=>tlObs.observe(i))
fetch("/components/team-card.html").then(r=>r.text()).then(html=>{
  const data=[
    {name:"Aiden Clarke",role:"CTO",img:"/assets/images/hero-1.jpg"},
    {name:"Sophia Ray",role:"Design Lead",img:"/assets/images/hero-2.jpg"},
    {name:"Noah Sterling",role:"AI Architect",img:"/assets/images/product-placeholder.png"}
  ]
  data.forEach(d=>{
    const div=document.createElement("div")
    div.innerHTML=html
    const card=div.querySelector(".team-card")
    card.querySelector("img").src=d.img
    card.querySelector(".t-name").textContent=d.name
    card.querySelector(".t-role").textContent=d.role
    els.teamGrid.appendChild(card)
  })
  const cards=document.querySelectorAll(".team-card")
  const cObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")})
  },{threshold:.2})
  cards.forEach(c=>cObs.observe(c))
})
