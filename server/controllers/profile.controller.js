let profiles=[]

exports.update=(req,res)=>{
  const b=req.body||{}
  let u=profiles.find(x=>x.id===b.id)
  if(!u){
    u={id:b.id,name:b.name,email:b.email,bio:b.bio,avatar:b.avatar}
    profiles.push(u)
  } else {
    u.name=b.name
    u.email=b.email
    u.bio=b.bio
    u.avatar=b.avatar
  }
  res.json({ok:true,user:u})
}

exports.info=(req,res)=>{
  const id=req.params.id
  const u=profiles.find(x=>x.id===id)
  if(!u)return res.json({ok:false})
  res.json({ok:true,user:u})
}
