const express = require("express")
const path = require("path")
const fs = require("fs")
const router = express.Router()

const safeName = (n)=>{
  if(!n) return ""
  const clean = path.basename(n)
  if(/^[0-9]{2}-[a-z0-9\-]+\.html$/i.test(clean)) return clean
  if(clean === "index.html") return clean
  return ""
}

router.get("/", (req,res)=>{
  const p = path.join(process.cwd(),"client","index.html")
  if(fs.existsSync(p)) return res.sendFile(p)
  res.status(404).send("not found")
})

router.get("/pages/:file", (req,res)=>{
  const f = safeName(req.params.file)
  if(!f) return res.status(400).send("invalid")
  const p = path.join(process.cwd(),"client","pages",f)
  if(fs.existsSync(p)) return res.sendFile(p)
  res.status(404).send("not found")
})

router.get("/components/:file", (req,res)=>{
  const name = path.basename(req.params.file)
  if(!/^[a-z0-9\-\_]+\.html$/i.test(name)) return res.status(400).send("invalid")
  const p = path.join(process.cwd(),"client","components",name)
  if(fs.existsSync(p)) return res.sendFile(p)
  res.status(404).send("not found")
})

router.get("/assets/*", (req,res)=>{
  const rel = req.params[0] || ""
  const safe = rel.split("..").join("")
  const p = path.join(process.cwd(),"client","assets",safe)
  if(fs.existsSync(p) && fs.statSync(p).isFile()) return res.sendFile(p)
  res.status(404).send("not found")
})

module.exports = router
