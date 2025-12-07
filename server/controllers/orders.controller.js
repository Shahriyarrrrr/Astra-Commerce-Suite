const orders = []
let orderCounter = 1000

exports.create = (req,res)=>{
  const b = req.body || {}
  const id = "ASTRA-" + (++orderCounter)
  const total = calcTotal(b)
  const order = {
    id,
    address:b.address||{},
    cart:b.cart||[],
    ship:b.ship,
    shipCost:b.shipCost||0,
    pay:b.pay,
    promo:b.promo||null,
    total,
    createdAt:Date.now()
  }
  orders.push(order)
  res.json({ok:true,order})
}

exports.list = (req,res)=>{
  res.json({ok:true,orders})
}

exports.view = (req,res)=>{
  const id = req.params.id
  const o = orders.find(x=>x.id===id)
  if(!o) return res.json({ok:false})
  res.json({ok:true,order:o})
}

function calcTotal(b){
  let subtotal = 0
  const cart = b.cart||[]
  cart.forEach(i=>subtotal += i.qty*i.price)
  let discount = 0
  if(b.promo){
    if(b.promo.type==="percent") discount = subtotal*(b.promo.value/100)
    else discount = Math.min(b.promo.value, subtotal)
  }
  const total = subtotal - discount + (b.shipCost||0)
  return Math.max(total,0)
}

exports.orders = orders
