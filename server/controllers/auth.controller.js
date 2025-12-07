exports.login=(req,res)=>{
  const b=req.body||{}
  const roles=["user","admin","developer"]
  if(!roles.includes(b.role)) return res.json({ok:false,message:"invalid role"})
  if(!b.email||!b.password) return res.json({ok:false,message:"missing credentials"})
  const user={
    id:"USR-"+Math.floor(Math.random()*99999),
    email:b.email,
    role:b.role,
    name:b.email.split("@")[0],
    token:"tok_"+Math.random().toString(36).slice(2)
  }
  res.json({ok:true,user})
}
