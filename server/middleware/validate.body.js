module.exports = (fields)=>{
  return (req,res,next)=>{
    const b = req.body || {}
    for(const f of fields){
      if(b[f] === undefined || b[f] === null || b[f] === "") 
        return res.status(400).json({ok:false,message:"missing_"+f})
    }
    next()
  }
}
