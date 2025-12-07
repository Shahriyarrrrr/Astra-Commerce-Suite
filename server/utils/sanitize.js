exports.clean=(t)=>{
  if(!t)return""
  return String(t).replace(/[<>]/g,"")
}
