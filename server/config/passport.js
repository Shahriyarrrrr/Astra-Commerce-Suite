const users=[]
exports.validate=(token)=>{
  if(!token)return null
  const u=users.find(x=>x.token===token)
  return u||null
}
exports.registerUser=(u)=>users.push(u)
