module.exports = function(roles){
  return (req,res,next)=>{
    const u = req.user
    if(!u) return res.status(401).json({ok:false,message:"unauthorized"})
    const allowed = Array.isArray(roles)?roles:[roles]
    if(allowed.length && !allowed.includes(u.role)) return res.status(403).json({ok:false,message:"forbidden"})
    next()
  }
}
