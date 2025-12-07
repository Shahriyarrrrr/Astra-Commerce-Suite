const els = {
  app: document.getElementById("regApp"),
  steps: Array.from(document.querySelectorAll(".step-indicator")),
  panels: Array.from(document.querySelectorAll(".reg-panel")),
  toReg2: document.getElementById("toReg2"),
  backReg1: document.getElementById("backReg1"),
  toReg3: document.getElementById("toReg3"),
  backReg2: document.getElementById("backReg2"),
  sendOtp: document.getElementById("sendOtp"),
  otpInput: document.getElementById("otpInput"),
  otpMsg: document.getElementById("otpMsg"),
  completeReg: document.getElementById("completeReg"),
  rName: document.getElementById("rName"),
  rEmail: document.getElementById("rEmail"),
  rPassword: document.getElementById("rPassword"),
  rConfirm: document.getElementById("rConfirm"),
  pwMatchState: document.getElementById("pwMatchState"),
  pwStrengthState: document.getElementById("pwStrengthState"),
  toast: document.getElementById("regToast"),
  appRoot: document.getElementById("regApp")
}
let theme = localStorage.getItem("astra_theme") || "light"
els.appRoot.className = `theme-${theme}`
let current = 1
function setStep(n){
  current = n
  els.steps.forEach(s => s.classList.toggle("active", Number(s.dataset.step) === n))
  els.panels.forEach(p => p.classList.toggle("active", Number(p.dataset.panel) === n))
}
setStep(1)
els.toReg2.addEventListener("click", e => {
  e.preventDefault()
  if (!els.rName.value.trim() || !els.rEmail.value.trim()) return showToast("Enter name and email")
  setStep(2)
})
els.backReg1.addEventListener("click", e => { e.preventDefault(); setStep(1) })
els.toReg3.addEventListener("click", e => {
  e.preventDefault()
  if (!els.rPassword.value || els.rPassword.value !== els.rConfirm.value) return showToast("Password mismatch")
  setStep(3)
})
els.backReg2.addEventListener("click", e => { e.preventDefault(); setStep(2) })
els.rConfirm.addEventListener("input", () => {
  const m = els.rPassword.value === els.rConfirm.value && els.rPassword.value.length > 0
  els.pwMatchState.textContent = m ? "yes" : "no"
})
els.rPassword.addEventListener("input", () => {
  const v = els.rPassword.value
  let sc = 0
  if (v.length > 6) sc += 30
  if (/[A-Z]/.test(v)) sc += 20
  if (/[0-9]/.test(v)) sc += 20
  if (/[^A-Za-z0-9]/.test(v)) sc += 30
  const pct = Math.min(100, sc)
  els.pwStrengthState.textContent = pct + "%"
})
let otpCode = null
els.sendOtp.addEventListener("click", e => {
  e.preventDefault()
  otpCode = String(Math.floor(100000 + Math.random() * 899999))
  els.otpMsg.textContent = `OTP sent: ${otpCode}`
  setTimeout(() => { if (Math.random() > .1) els.otpMsg.textContent = "OTP delivered" }, 800)
})
els.completeReg.addEventListener("click", async e => {
  e.preventDefault()
  if (!otpCode || els.otpInput.value.trim() !== otpCode) return showToast("Invalid OTP")
  const payload = {
    name: els.rName.value.trim(),
    email: els.rEmail.value.trim(),
    password: els.rPassword.value,
    role: document.querySelector('input[name="rRole"]:checked').value
  }
  showToast("Creating account...")
  const res = await fetch("/api/register", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) })
  const j = await res.json()
  if (j.ok) {
    localStorage.setItem("astra_user", JSON.stringify(j.user))
    location.href = "/pages/01-home.html"
  } else {
    showToast(j.message || "Failed")
  }
})
function showToast(t){
  els.toast.textContent = t
  els.toast.classList.add("show")
  setTimeout(()=>els.toast.classList.remove("show"),1800)
}
