const users = []

exports.register = (req,res)=>{
  const b = req.body || {}
  if(!b.email || !b.password || !b.name) return res.json({ok:false,message:"missing fields"})
  const exists = users.find(u=>u.email===b.email)
  if(exists) return res.json({ok:false,message:"email exists"})
  const user = {
    id: "U"+Math.floor(Math.random()*999999),
    name: b.name,
    email: b.email,
    role: b.role || "user",
    createdAt: Date.now()
  }
  users.push(user)
  res.json({ok:true,user})
}

exports.list = (req,res)=>{
  res.json({ok:true,users})
}
