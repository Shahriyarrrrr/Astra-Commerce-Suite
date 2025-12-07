const logs = []

exports.log = (data)=>{
  const l = {
    id: "A" + Date.now(),
    action: data.action,
    userId: data.userId || null,
    detail: data.detail || "",
    createdAt: Date.now()
  }
  logs.push(l)
  return l
}

exports.all = ()=>logs
