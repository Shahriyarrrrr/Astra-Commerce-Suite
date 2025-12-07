const users = []

exports.create = (data)=>{
  const u = {
    id: "U" + Date.now(),
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role || "user",
    avatar: data.avatar || "",
    createdAt: Date.now()
  }
  users.push(u)
  return u
}

exports.findByEmail = (email)=>{
  return users.find(x=>x.email===email)
}

exports.findById = (id)=>{
  return users.find(x=>x.id===id)
}

exports.all = ()=>users
