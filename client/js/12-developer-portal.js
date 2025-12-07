const els={
  app:document.getElementById("devApp"),
  themeBtn:document.getElementById("devTheme"),
  genKey:document.getElementById("genKey"),
  devKey:document.getElementById("devKey"),
  reqMethod:document.getElementById("reqMethod"),
  reqEndpoint:document.getElementById("reqEndpoint"),
  reqBody:document.getElementById("reqBody"),
  sendReq:document.getElementById("sendReq"),
  respBox:document.getElementById("respBox"),
  logFeed:document.getElementById("logFeed"),
  codeView:document.getElementById("codeView"),
  toast:document.getElementById("devToast")
}
let theme=localStorage.getItem("astra_theme")||"light"
els.app.className=`theme-${theme}`
els.themeBtn.addEventListener("click",()=>{theme=theme==="light"?"dark":"light";els.app.className=`theme-${theme}`;localStorage.setItem("astra_theme",theme)})

let log=[]
function pushLog(t){
  log.unshift(t)
  renderLog()
}
function renderLog(){
  els.logFeed.innerHTML=""
  log.slice(0,20).forEach(l=>{
    const d=document.createElement("div")
    d.className="log-item"
    d.textContent=l
    els.logFeed.appendChild(d)
    setTimeout(()=>d.classList.add("show"),20)
  })
}

function generateKey(){
  const k="ak_"+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)
  localStorage.setItem("astra_dev_key",k)
  els.devKey.value=k
  showToast("Generated")
  pushLog("API key generated")
}

els.genKey.addEventListener("click",generateKey)
els.devKey.value=localStorage.getItem("astra_dev_key")||""

els.sendReq.addEventListener("click",async ()=>{
  const method=els.reqMethod.value
  const endpoint=els.reqEndpoint.value
  let body=null
  if(els.reqBody.value.trim()){
    try{body=JSON.parse(els.reqBody.value.trim())}catch(e){els.respBox.textContent="Invalid JSON";return}
  }
  const r=await fetch(endpoint,{method,headers:{"content-type":"application/json"},body:body?JSON.stringify(body):undefined})
  const j=await r.json()
  els.respBox.textContent=JSON.stringify(j,null,2)
  pushLog(`${method} ${endpoint}`)
})

const codeExample=`fetch("/api/demo",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({query:"info"})}).then(r=>r.json()).then(console.log)`
els.codeView.textContent=codeExample

function showToast(t){
  els.toast.textContent=t
  els.toast.classList.add("show")
  setTimeout(()=>els.toast.classList.remove("show"),1600)
}
