module.exports = (err,req,res,next)=>{
  const status = err && err.status ? err.status : 500
  const message = err && err.message ? err.message : "internal_error"
  res.status(status).json({ok:false,message})
}
