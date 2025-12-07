const products = []

exports.create = (d)=>{
  const p = {
    id: "P" + Date.now(),
    title: d.title,
    price: d.price,
    img: d.img,
    category: d.category || "",
    stock: d.stock || 0,
    desc: d.desc || "",
    createdAt: Date.now()
  }
  products.push(p)
  return p
}

exports.list = ()=>products

exports.find = (id)=>products.find(x=>x.id===id)

exports.update = (id,data)=>{
  const p = products.find(x=>x.id===id)
  if(!p) return null
  Object.assign(p,data)
  return p
}

exports.remove = (id)=>{
  const i = products.findIndex(x=>x.id===id)
  if(i>=0) products.splice(i,1)
}
