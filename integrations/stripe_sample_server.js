const express = require("express")
const app = express()
app.use(express.json())

const stripeKey = "sk_test_12345"

app.post("/stripe/charge",(req,res)=>{
  const b = req.body || {}
  const id = "st_" + Math.random().toString(36).slice(2)
  res.json({ok:true,id,amount:b.amount,currency:b.currency,key:stripeKey})
})

app.listen(5051)
