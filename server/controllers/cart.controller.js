const carts = {}
const promos = {
  WELCOME10:{ code:"WELCOME10", type:"percent", value:10 },
  FLAT5:{ code:"FLAT5", type:"fixed", value:5 }
}

function getKey(req){
  const t = req.headers.authorization || req.query.token || "guest"
  return t.replace("Bearer ","")
}

exports.getCart = (req,res)=>{
  const key = getKey(req)
  const c = carts[key] || { items: [] }
  res.json({ ok:true, cart:c })
}

exports.syncCart = (req,res)=>{
  const key = getKey(req)
  const payload = req.body || {}
  const incoming = Array.isArray(payload.cart) ? payload.cart : (payload.cart && payload.cart.items) || []
  if(!carts[key]) carts[key] = { items: [] }
  carts[key].items = incoming
  carts[key].updatedAt = Date.now()
  res.json({ ok:true, message:"synced" })
}

exports.applyPromo = (req,res)=>{
  const { code } = req.body || {}
  const ckey = getKey(req)
  const cart = (carts[ckey] && carts[ckey].items) || req.body.cart || []
  if(!code) return res.json({ ok:false, message:"no code" })
  const p = promos[code.toUpperCase()]
  if(!p) return res.json({ ok:false, message:"invalid" })
  return res.json({ ok:true, promo:p })
}

exports.addItem = (req,res)=>{
  const key = getKey(req)
  const item = req.body.item
  if(!item || !item.id) return res.json({ ok:false })
  if(!carts[key]) carts[key] = { items: [] }
  const found = carts[key].items.find(x=>x.id===item.id)
  if(found) found.qty = found.qty + (item.qty || 1)
  else carts[key].items.push(Object.assign({ qty: item.qty || 1 }, item))
  res.json({ ok:true, cart:carts[key] })
}

exports.updateItem = (req,res)=>{
  const key = getKey(req)
  const { id, qty } = req.body || {}
  if(!carts[key]) carts[key] = { items: [] }
  const it = carts[key].items.find(x=>x.id===id)
  if(it) it.qty = Math.max(1, Number(qty) || 1)
  res.json({ ok:true, cart:carts[key] })
}

exports.removeItem = (req,res)=>{
  const key = getKey(req)
  const { id } = req.body || {}
  if(!carts[key]) carts[key] = { items: [] }
  carts[key].items = carts[key].items.filter(x=>x.id!==id)
  res.json({ ok:true, cart:carts[key] })
}
