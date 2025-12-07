let products=[]
let productCounter=1

const orders=require("./orders.controller").orders
const users=[]

let activity=[
  "System initialized",
  "Admin logged in",
  "Server running stable"
]

exports.metrics=(req,res)=>{
  const revenue=orders.reduce((s,o)=>s+o.total,0)
  res.json({ok:true,orders:orders.length,revenue,users:users.length})
}

exports.products=(req,res)=>{
  res.json({ok:true,products})
}

exports.getProduct=(req,res)=>{
  const p=products.find(x=>x.id==req.params.id)
  if(!p)return res.json({ok:false})
  res.json({ok:true,product:p})
}

exports.addProduct=(req,res)=>{
  const b=req.body||{}
  const p={id:String(productCounter++),title:b.title,price:b.price,stock:b.stock}
  products.push(p)
  activity.push(`Product added: ${p.title}`)
  res.json({ok:true,product:p})
}

exports.updateProduct=(req,res)=>{
  const id=req.params.id
  const b=req.body||{}
  const p=products.find(x=>x.id==id)
  if(!p)return res.json({ok:false})
  p.title=b.title
  p.price=b.price
  p.stock=b.stock
  activity.push(`Product updated: ${p.title}`)
  res.json({ok:true})
}

exports.deleteProduct=(req,res)=>{
  const id=req.params.id
  products=products.filter(x=>x.id!=id)
  activity.push(`Product deleted: ${id}`)
  res.json({ok:true})
}

exports.orders=(req,res)=>{
  res.json({ok:true,orders})
}

exports.activity=(req,res)=>{
  res.json({ok:true,activity})
}
