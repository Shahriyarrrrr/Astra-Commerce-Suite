const orders = require("./orders.controller").orders

exports.get = (req,res)=>{
  const id = req.params.id
  const o = orders.find(x=>x.id===id)
  if(!o) return res.json({ok:false})
  res.json({ok:true,order:o})
}
