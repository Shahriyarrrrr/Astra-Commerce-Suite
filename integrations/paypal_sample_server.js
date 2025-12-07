const express = require("express")
const app = express()
app.use(express.json())

app.post("/paypal/pay",(req,res)=>{
  const b = req.body || {}
  const id = "pp_" + Math.random().toString(36).slice(2)
  res.json({ok:true,id,total:b.total})
})

app.listen(5052)
