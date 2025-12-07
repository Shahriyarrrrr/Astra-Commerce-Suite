const promos = []

exports.create = (d)=>{
  const p = {
    id: "PR" + Date.now(),
    code: d.code,
    type: d.type,
    value: d.value,
    active: true,
    createdAt: Date.now()
  }
  promos.push(p)
  return p
}

exports.find = (code)=>{
  return promos.find(x=>x.code===code && x.active)
}

exports.list = ()=>promos
