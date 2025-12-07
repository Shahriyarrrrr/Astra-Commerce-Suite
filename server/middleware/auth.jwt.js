const passportConfig = require("../config/passport")

module.exports = (req,res,next)=>{
  const h = req.headers.authorization || req.query.token || ""
  const token = String(h).replace("Bearer ","").trim()
  if(!token){ req.user = null; return next() }
  const user = passportConfig.validate(token)
  req.user = user || null
  next()
}
