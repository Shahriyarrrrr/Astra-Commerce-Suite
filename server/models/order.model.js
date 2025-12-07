const orders = []
let counter = 1000

exports.create = (d)=>{
  const o = {
    id: "ASTRA-" + (++counter),
    userId: d.userId || null,
    cart: d.cart || [],
    address: d.address || {},
    ship: d.ship,
    shipCost: d.shipCost || 0,
    pay: d.pay,
    promo: d.promo || null,
    total: d.total,
    status: d.status || "pending",
    createdAt: Date.now()
  }
  orders.push(o)
  return o
}

exports.list = ()=>orders

exports.find = (id)=>orders.find(x=>x.id===id)
