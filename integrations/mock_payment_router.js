const express = require("express")
const router = express.Router()

router.post("/pay",(req,res)=>{
  const b = req.body || {}
  const id = "pay_" + Math.random().toString(36).slice(2)
  res.json({ok:true,id,amount:b.amount,currency:b.currency})
})

module.exports = router
